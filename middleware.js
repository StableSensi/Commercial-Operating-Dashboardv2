import { next } from '@vercel/functions';

// ---------------------------------------------------------------------------
// Shared-code access gate — one code for the whole team, single-field login.
//
// FREE: this is our own code running on Vercel's Hobby plan. No paid add-on,
// no user accounts. The code itself is NOT in this file — it lives in the
// SITE_PASSWORD environment variable (Vercel → Project → Settings →
// Environment Variables). Change the code there; no code change needed.
//
// How it works: every page and every direct file URL is checked here, at the
// edge, BEFORE anything is served. Unauthenticated visitors get a branded
// login page with one field. A correct code sets a signed (HMAC) cookie that
// can't be forged; the cookie — never the code — is what's stored in the
// browser.
// ---------------------------------------------------------------------------

export const config = {
  // Run on every path except the favicon, so the browser tab icon still loads.
  matcher: ['/((?!favicon.ico).*)'],
};

const COOKIE = 'cod_session';
const PURPOSE = 'aryze-cod-v1';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Derive an unguessable cookie token from the code (HMAC-SHA256).
async function sessionToken(code) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(code),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(PURPOSE));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function loginPage(showError) {
  const error = showError
    ? '<p class="err">Incorrect code. Please try again.</p>'
    : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aryze — Sales &amp; Marketing</title>
<style>
  :root { --navy:#0f2747; --ink:#1c2b45; --muted:#6b7790; --line:#e3e7ee; --teal:#0b6b73; --bg:#f5f7fa; }
  * { box-sizing:border-box; }
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
         background:var(--bg); color:var(--ink); padding:24px; }
  .card { width:100%; max-width:380px; background:#fff; border:1px solid var(--line);
          border-radius:14px; padding:34px 30px; box-shadow:0 10px 40px rgba(15,39,71,.08); }
  .brand { font-size:20px; font-weight:800; letter-spacing:-.01em; color:var(--navy); }
  .brand small { display:block; font-size:12px; font-weight:600; letter-spacing:.06em;
                 text-transform:uppercase; color:var(--muted); margin-top:4px; }
  h1 { font-size:16px; font-weight:600; margin:24px 0 6px; color:var(--ink); }
  p.sub { margin:0 0 20px; font-size:14px; color:var(--muted); line-height:1.5; }
  label { display:block; font-size:12px; font-weight:600; color:var(--muted); margin-bottom:6px; }
  input { width:100%; padding:12px 14px; font-size:15px; border:1px solid var(--line);
          border-radius:9px; outline:none; transition:border-color .15s; }
  input:focus { border-color:var(--teal); }
  button { width:100%; margin-top:16px; padding:12px 14px; font-size:15px; font-weight:600;
           color:#fff; background:var(--teal); border:0; border-radius:9px; cursor:pointer; }
  button:hover { background:#095a61; }
  .err { margin:14px 0 0; font-size:13px; color:#b4232a; }
  .foot { margin-top:22px; font-size:12px; color:var(--muted); text-align:center; }
</style>
</head>
<body>
  <form class="card" method="POST" action="/__auth">
    <div class="brand">Aryze<small>Sales &amp; Marketing</small></div>
    <h1>Access code</h1>
    <p class="sub">This is an internal Aryze workspace. Enter the team access code to continue.</p>
    <label for="code">Access code</label>
    <input id="code" name="code" type="password" autocomplete="current-password" autofocus required>
    ${error}
    <button type="submit">Enter</button>
    <p class="foot">Confidential · Aryze</p>
  </form>
</body>
</html>`;
}

export default async function middleware(request) {
  const code = process.env.SITE_PASSWORD;
  if (!code) {
    return new Response('Access code is not configured.', { status: 503 });
  }
  const expected = await sessionToken(code);

  // 1. Already authenticated (valid cookie)? Let the request through.
  const cookie = request.headers.get('cookie') || '';
  const authed = cookie.split(';').some((c) => c.trim() === `${COOKIE}=${expected}`);
  if (authed) return next();

  const url = new URL(request.url);

  // 2. Login submission.
  if (request.method === 'POST' && url.pathname === '/__auth') {
    let entered = '';
    try {
      const form = await request.formData();
      entered = (form.get('code') || '').toString();
    } catch (e) {
      entered = '';
    }
    if (entered === code) {
      return new Response(null, {
        status: 303,
        headers: {
          'Set-Cookie': `${COOKIE}=${expected}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`,
          Location: '/',
        },
      });
    }
    return new Response(loginPage(true), {
      status: 401,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }

  // 3. Anyone else: show the login page.
  return new Response(loginPage(false), {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
