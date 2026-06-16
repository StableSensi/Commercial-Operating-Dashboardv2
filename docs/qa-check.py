#!/usr/bin/env python3
"""QA gate for the Sales & Marketing site.

Run from the repo root:  python3 docs/qa-check.py
Checks: broken links, orphan pages, HTML tag balance, banned patterns.
The bar is 0 / 0 / 0 / 0. Standing exemptions are encoded below with reasons.
"""
import os, re, sys
from html.parser import HTMLParser
from urllib.parse import unquote, urldefrag

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {"_archive", "node_modules", ".git"}

# file (repo-relative, /) -> set of exemption keys, with reasons
EXEMPT = {}  # no standing exemptions — the May report was released and rebalanced 8 June 2026

BANNED = [
    ("allcaps-aryze",    r"ARYZE",                                   "company name must be 'Aryze'"),
    ("snapshot-label",   r"\bSnapshot\b",                            "'Snapshot' labels are banned"),
    ("version-number",   r"\bv\d+\.\d+\b",                           "version numbers are internal"),
    ("md-link",          r'href="[^"]*\.md"',                        "no links to .md source files"),
    ("updated-tell",     r"Updated \d|Last updated|Updated on",      "batch-edit tells"),
    ("internal-marker",  r"<CONFIRM|NEEDS SOURCE|\bTBD\b|To be completed|Open items to confirm", "internal markers"),
    ("next-step-column", r'<th>[^<]*Next step|<div class="cell">Next step', "next-step columns banned in reports"),
    ("due-column",       r"<th>By</th>|<th>Due\b",                   "due-date columns banned in reports"),
    ("hype-word",        r"(?i)seamless|revolutioni[sz]|game-chang|cutting-edge|world-class|next-generation|industry-leading|best[ -]in[ -]class|unlock potential|drive transformation|shape the future|future of money|thrilled to announce|excited to announce", "forbidden brand words"),
]

VOID = {"img","br","hr","meta","link","input","source","wbr","col","area","base","embed","track","param"}
TRACKED = {"div","section","article","table","tr","main","ul","ol","nav","header","footer","a","details","summary","figure"}

class Balance(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.open_c, self.close_c = {}, {}
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag in TRACKED: self.open_c[tag] = self.open_c.get(tag, 0) + 1
        for k, v in attrs:
            if k in ("href", "src") and v: self.links.append(v)
    def handle_endtag(self, tag):
        if tag in TRACKED: self.close_c[tag] = self.close_c.get(tag, 0) + 1

def live_pages():
    out = []
    for dp, dns, fns in os.walk(ROOT):
        dns[:] = [d for d in dns if d not in SKIP_DIRS]
        for f in fns:
            if f.endswith(".html"):
                out.append(os.path.relpath(os.path.join(dp, f), ROOT).replace(os.sep, "/"))
    return sorted(out)

def is_external(u):
    return u.startswith(("http://", "https://", "mailto:", "tel:", "data:"))

def main():
    pages = live_pages()
    problems = {"links": [], "balance": [], "patterns": [], "orphans": []}
    graph = {}

    for rel in pages:
        path = os.path.join(ROOT, rel)
        raw = open(path, encoding="utf-8").read()
        p = Balance(); p.feed(raw)

        # tag balance
        for t in TRACKED:
            o, c = p.open_c.get(t, 0), p.close_c.get(t, 0)
            if o != c:
                problems["balance"].append(f"{rel}: <{t}> open {o} != close {c}")

        # links resolve (templates are scaffolding with {{placeholders}} — skip)
        targets = set()
        if rel.startswith("templates/"):
            graph[rel] = targets
            rendered = re.sub(r"<!--.*?-->", "", raw, flags=re.S)
            continue
        for u in p.links:
            if is_external(u): continue
            u, _ = urldefrag(u)
            if not u: continue  # pure anchor
            tgt = os.path.normpath(os.path.join(os.path.dirname(path), unquote(u)))
            if not os.path.exists(tgt):
                problems["links"].append(f"{rel} -> {u}")
            elif tgt.endswith(".html") and tgt.startswith(ROOT):
                targets.add(os.path.relpath(tgt, ROOT).replace(os.sep, "/"))
        graph[rel] = targets

        # banned patterns on rendered content (comments stripped)
        rendered = re.sub(r"<!--.*?-->", "", raw, flags=re.S)
        ex = EXEMPT.get(rel, set())
        for key, rx, why in BANNED:
            if key in ex: continue
            for m in re.finditer(rx, rendered):
                # scoped allowance: a .md canonical-source link in the doc-source
                # footer carries class="src" — one Original-document link per page.
                if key == "md-link" and 'class="src"' in rendered[max(0, m.start()-90):m.start()]:
                    continue
                line = rendered[:m.start()].count("\n") + 1
                problems["patterns"].append(f"{rel}:{line} [{key}] {m.group(0)[:60]!r} — {why}")

    # orphans: BFS from index.html; templates/ are exempt by definition
    seen, queue = {"index.html"}, ["index.html"]
    while queue:
        for nxt in graph.get(queue.pop(), ()):
            if nxt not in seen:
                seen.add(nxt); queue.append(nxt)
    for rel in pages:
        if rel not in seen and not rel.startswith("templates/"):
            problems["orphans"].append(rel)

    n = sum(len(v) for v in problems.values())
    print(f"pages checked: {len(pages)} (live, excl. _archive)")
    for k in ("links", "orphans", "balance", "patterns"):
        print(f"{k}: {len(problems[k])}")
        for line in problems[k]:
            print("   ", line)
    print("RESULT:", "PASS" if n == 0 else f"FAIL ({n} problems)")
    sys.exit(0 if n == 0 else 1)

if __name__ == "__main__":
    main()
