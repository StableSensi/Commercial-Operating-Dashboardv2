# Board & Management Reports — Build Plan & Prompt (v2.1)

**Status:** Canonical build prompt · supersedes v1 (the v1 "full system" design is retired — too heavy for the team size)
**Owner:** Sales (Rae)
**Date:** 2026-06-06
**Locked decisions:** Scope = Sales + Marketing · Output = web-first + PDF export · Data = hybrid, **manual-first**

> **v2.1 reframe (2026-06-06).** This is a **repository**, not a live operating dashboard. The product is presented as **Board & Management Reports** (the folder keeps its legacy name `Commercial-Operating-Dashboard/`). Because the data is not live, the **home page shows no scorecard** — current-looking numbers would mislead. Figures live only *inside* each dated report. The home page is a point-in-time archive of the reports, strategies and materials shared with management and the board. References below to "the hub / control tower / library" should be read as **the repository home (`index.html`)**, which now also holds the report archive and board/strategy materials (the separate `library.html` was merged in and removed).

This document is written as a build prompt. It is meant to be handed to Claude (or any builder) and executed to produce the system correctly from scratch. Read §1–§3 before building anything.

---

## 1. Context (read first)

You are building Aryze's **Commercial Operating Dashboard (COD)** — one home for running commercial: a hub, a standardized monthly report, and a library. Aryze is B2B fintech infrastructure with three separate products (Pay by Bank, Stablecoin Factory, Digital Cash). Never blur them.

**What already exists and is good:** `Documents/Reports/May-Sales-Report-2026.html`. Its structure (scorecard → movement → named-deal tables → owner/date priorities, with claim-style headers and an honest "what stalled" card) is the proof-of-concept. We are formalizing it, not replacing the thinking behind it.

**What we learned from the v1 plan (and corrected here):**
- **Right-size the engineering.** A JS render-engine, a JSON-driven template, and a CRM connector are real software that someone has to maintain while also selling. v2 is **manual-first**: one shared stylesheet + a copy-and-fill HTML template. No build step. No render engine. No connector — yet.
- **Data truth beats design.** The hardest, highest-value part is consistent, defined numbers — not charts. (The May report itself had a number inconsistency: "56 up from 42 → 31".) We lock metric definitions *before* polishing layout.
- **Honesty over completeness.** A rigid spine must not manufacture filler in thin months. Empty section → one honest line, not invented content.

**Brand voice (non-negotiable):** dry, operational, literal, C-level. "Aryze" never "ARYZE". No forbidden phrases ("revolutionising", "seamless", "best-in-class", "game-changing", etc.). Every number traces to a source with an "as of" date. We sound like the person accountable for the workflow.

---

## 2. Objective

One sentence: **a reporting system where an executive gets the verdict, the numbers, and the decision in two minutes — a team can reconstruct every figure — and producing a month means filling a template, not rebuilding a page.**

---

## 3. Hard constraints (do not violate)

1. **Manual-first.** Shared CSS + a copy-and-fill HTML report template. No JavaScript render engine, no data-binding framework, no CRM connector in v1–v3. (Automation is Phase 4, only if the manual rhythm proves painful.)
2. **One visual language.** All styling lives in `assets/cod.css`. No report carries its own styles. A brand tweak is one edit.
3. **Define before you draw.** The metric-definitions page (§6) ships in Phase 1, before any second report is produced.
4. **Two-minute exec read.** Cover + summary + scorecard fit the first screen / first PDF page. Everything deeper is one scroll or one click away — never in the way.
5. **Thin-month rule.** If a section has nothing real this month, write one honest line ("No new partnerships advanced in June.") and move on. Never pad.
6. **Delta-only until targets exist.** Scorecard shows value + month-over-month delta. RAG/"vs target" only switches on once monthly targets are set (§13).
7. **One roof.** The system + web reports live under `Dev/Commercial-Operating-Dashboard/`. The monthly **PDF** is filed to `Documents/Reports/` as the business-document record.
8. **No clutter.** Every element passes the "earns its place" test (§7): it changes a decision, or it is a metric we track every month. Otherwise cut it.
9. **The two-weeks-later test (stale-proofing).** Every page must read correctly two weeks after publication without being touched. Dated facts only — never relative time ("next week", "upcoming", "we are about to", "currently"). **No per-deal next-step columns:** the report records what happened; pending to-dos live in the CRM, not in the archive (decision Rae, 8 June 2026 — a column of "hold the call"-items reads as neglect once the dates pass). The only forward-looking block is Priorities: a few month-level commitments with owner + date. Every report carries a snapshot stamp under the cover meta. A published report is closed: corrections happen as restatements in the next report's appendix, never as edits to the published page. This is what lets the archive sit untouched without ever looking dead.

---

## 4. Architecture (lightweight)

Three things, one shared foundation. No more.

- **The Repository home** (`index.html`) — point-in-time archive. Features the latest monthly report (clearly dated), then the report archive, the board/strategy materials, and — separately — the live operational tools. **No live scorecard.**
- **The Monthly Report** (`reports/YYYY-MM/index.html`) — the standardized artifact. Internally three tiers (Executive → Operating detail → Appendix) so one document serves CEO, team, and analyst.
- **Board & strategy materials** — memos, strategies and plans shared upward, listed on the home page alongside the reports (merged in from the former library; definitions/methodology linked under "How these are built").

### Folder structure

```
Dev/Commercial-Operating-Dashboard/
├── index.html                  ← Hub
│                               (no library.html — archive merged into index.html)
├── assets/
│   ├── cod.css                 ← THE design system (tokens + components)
│   └── logo/                   ← Aryze wordmark (from Brand/)
├── templates/
│   └── report-template.html    ← copy this each month
├── reports/
│   └── 2026-05/
│       ├── index.html          ← the month's report (hand-filled from the template)
│       └── crm-snapshot.png    ← archival board capture
├── materials/                  ← management materials, redesigned in the design system
│   ├── analyser/               ← product analyses (ICP·VPC·Product-Description ×3) + audits
│   ├── strategy/               ← plans & programmes (automations, AI workflow, Tech-for-Fin)
│   ├── nightlife/              ← Nightlife commercial package (board memo, report + 5 components)
│   ├── events/                 ← trip reports (NEXT Malta, Stablecon) + marketing plans
│   ├── sales-assets/           ← Pay by Bank + Digital Cash one-pagers (leadership reference)
│   ├── frameworks/             ← methodology reference (qualification, VPC, committee, triggers)
│   ├── corporate/              ← corporate record, link-only (GF-2026, agreements, sponsorships)
│   └── onboarding/             ← onboarding flows (customer documented; employee/partner <NEEDS DATA>)
├── docs/
│   ├── Reporting-System-Design.md       ← this build prompt (canonical)
│   ├── Metric-Definitions.md            ← the data-truth layer (§6)
│   └── Monthly-Production-Checklist.md   ← the runbook (§10)
└── README.md
```

To add a month: copy `templates/report-template.html` → `reports/YYYY-MM/index.html`, fill the content, drop in the CRM snapshot, export the PDF, update the hub pointer + library row. That is the whole workflow.

---

## 5. The standardized monthly report — the spine

Same order every month. The order is the standard. Three tiers, three audiences, one document.

### Tier 1 — Executive (first screen / first PDF page; read in 2 minutes)
1. **Cover** — title, month, owner, "as of" date, confidentiality, and the **one-line verdict** (e.g. "May built the book; June converts it.").
2. **Executive summary** — the verdict + 3 sentences of what happened + the 1–3 decisions/asks for leadership.
3. **Scorecard** — 5 KPI tiles (value + MoM delta) and the stage funnel. This is the report's dashboard.

### Tier 2 — Operating detail (the body; for the team)
4. **Pipeline** — stage funnel detail · month-over-month movement as three cards (*carried & advanced* / *reviewed & cleaned* / *created*) + a one-line net effect · the **advancing deals** table (Account · Product·stage · What moved — no next-step column, per §3.9).
5. **Marketing & events** — events matrix (event · who · what it produced · next step) + 1–2 marketing KPIs + standout cards for the highest-leverage outcomes. *(Requires a monthly Marketing input — see §13. If absent, state it in one line.)*
6. **Partnerships & strategic** — the few relationships that change what Aryze can sell, with status + next step.
7. **What changed — findings** — up to three claim-style observations that should shape next month. Fewer is fine; never pad to three.
8. **Priorities & decisions** — next-month actions, **owner + date on every item**, plus a short decision summary.

### Tier 3 — Appendix (collapsed by default; for the analyst)
9. **Appendix** — full pipeline list (all stages, every named deal) · early/nurture + backlog tables · CRM board snapshot image · link to **Metric-Definitions** · data sources + "as of" timestamps · any restatement of prior-month numbers (§6).

**Presentation grammar (apply to every section):** the header is a *claim*, not a label ("The deal book has volume now" not "Pipeline"); the body proves it. Tables are scannable (no paragraphs in cells). Dense tables belong only in the Appendix.

---

## 6. Metric definitions — the data-truth layer (ship in Phase 1)

This is the part that earns trust, and the part v1 underweighted. `docs/Metric-Definitions.md` locks, in plain language:

- **Opportunity** — what counts as one; which CRM stages are included in the "total".
- **Active (working)** — exactly which stages (e.g. New, Screening, First Meeting, Qualification, Onboarding) vs. excluded (Backlog, Not interested, Strategic long-term).
- **Advancing** — the test (a meeting held or a dated next step).
- **Marketing-sourced** — how a deal is attributed to an event/campaign.
- **Stage names** — the canonical list, fixed, matching the CRM.
- **RAG rule** — the exact thresholds, once targets exist (until then, RAG is off).
- **Restatement rule** — when a prior month's number is corrected, note it in the current Appendix ("April active restated 20 → 22 after CRM cleanup"). The trend series always uses corrected numbers.
- **"As of" discipline** — every figure carries the snapshot date it came from.

Acceptance: every KPI on a report maps to one definition here. If a number can't be defined, it doesn't ship.

---

## 7. Visual & design system (`assets/cod.css`)

**Tokens (reuse the May report's):** Geist 400–800; ink `#001e2b`, slate `#274454`, muted `#52636d`, accent/teal `#007599`, gold `#bfd9ef`, surface `#fff`, bg `#f7f9fa`; RAG green `#1b8a5a` / amber `#9a6a00` / red (reserved) — **RAG colors appear nowhere except status.** Max-width 1100px, 10px radius, soft shadow, generous section padding, tabular figures for aligned numbers.

**Component kit (the only building blocks):** section header (eyebrow + claim) · KPI tile · stage funnel bar · deal/event matrix row · finding card · priority card (owner + date badge) · pill/RAG dot · appendix table.

**Charts — purposeful only:** stage funnel; month-over-month trend lines (once ≥3 months exist — until then show the table, not a 2-point line); a simple "where pipeline came from" bar. Rules: each chart answers one question stated in its title; label data directly; no pie charts >3 slices; a chart only ships if it reads faster than the table it replaces. Use inline SVG or one lightweight library — nothing heavy.

**The "earns its place" test:** before any element ships it must (a) change a decision or (b) be a tracked monthly metric. Vanity tiles, decorative imagery, repeated logos, "nice to know" tables → cut.

---

## 8. Two-tier model — exec vs deep (progressive disclosure)

One artifact, not two documents. The exec layer is physically first and visually dominant; the operating detail is the natural scroll; the appendix is collapsed behind an "Open full analysis ▾" control on web and a clearly separated section in the PDF. Raw data is downloadable from the appendix so analysts go deeper without us reformatting anything.

---

## 9. PDF export

A print stylesheet in `cod.css` (`@media print`) produces the board/archive PDF: A4, sensible page breaks (each Tier-1/Tier-2 section starts cleanly), appendix expanded for print, hub chrome hidden, header/footer with "Aryze · Commercial Report · [Month] · Confidential". Filename `Commercial-Report-YYYY-MM.pdf`, filed to `Documents/Reports/`. Goal: looks typeset, not screenshotted.

---

## 10. Monthly production process (the runbook)

Target: a polished month in a few hours. Owner: Sales (Rae); Marketing supplies the §5.5 block.

1. **Snapshot** the CRM opportunities board (PNG → `reports/YYYY-MM/`) and read off KPI + stage counts.
2. **Copy** the template → `reports/YYYY-MM/index.html`.
3. **Fill** — KPIs/stages from the snapshot; verdict, movement, deals, marketing, partnerships, findings, priorities curated from CRM notes, event reports, and weekly updates (Claude drafts; human approves).
4. **QA** against §11.
5. **Export PDF** → file to `Documents/Reports/`.
6. **Publish** — update the hub's "this month" pointer and the library row.

---

## 11. Acceptance criteria / definition of done

A report ships only if all hold:
- **Two-minute test** — verdict + state + ask from the first screen alone.
- **Two-weeks-later test** — every line reads correctly two weeks after publication (§3.9): dated commitments, no relative time, snapshot stamp present, outcomes pointer in Priorities.
- **Traceability** — every number maps to a §6 definition and a dated source.
- **Brand & voice** — Aryze (never ARYZE); products never blurred; no forbidden phrases; dry/operational/literal. Run the brand-review skill on the narrative.
- **Structure** — the §5 spine, in order, nothing added or dropped; thin sections handled per the §3.5 rule.
- **Visual** — one accent color, RAG only for status, aligned figures, real whitespace, no orphaned headers, clean PDF.
- **Restraint** — nothing fails the "earns its place" test.
- **Honesty** — what stalled stated plainly; no false hope carried as pipeline.

---

## 12. Phased build (right-sized)

- **Phase 1 — Foundation.** `assets/cod.css` (design system + print stylesheet), `templates/report-template.html` (the spine), `docs/Metric-Definitions.md`. Migrate **May 2026** into `reports/2026-05/` as the reference report. *Outcome: one report done right + the kit + the definitions.*
- **Phase 2 — Repository home.** Build `index.html` as the point-in-time archive: featured latest report, report archive, board/strategy materials, and a clearly-separated operational-tools block. **No live scorecard** (numbers stay inside the dated report). Wire navigation. *Outcome: the board/management entry point.*
- **Phase 3 — Cleanup.** Retire the scattered duplicates (the exact-duplicate `Money2020-Dashboard.html`; the two older outreach-dashboard versions); point everything at canonical files; write `Monthly-Production-Checklist.md`. *Outcome: one roof, no rodebutik.*
- **Phase 4 — Automation (defer; only if needed).** CRM connector to auto-fill the KPI snapshot; optional live hub artifact. Decide after 2–3 manual months.

---

## 13. Decisions (locked 2026-06-06)

1. **Report home** — ✅ web system + reports under `Dev/Commercial-Operating-Dashboard/`; monthly **PDF filed to `Documents/Reports/`**.
2. **Marketing input owner** — ✅ **Marketing owns** the §5.5 events/campaigns/leads block and delivers it to a monthly deadline. If it doesn't arrive, the section carries one honest line (§3.5), it does not block the report.
3. **Targets** — ✅ **delta-only** for now (value + MoM). RAG/"vs target" stays off until monthly targets are set.
4. **Cleanup (Phase 3)** — ✅ delete all three: `Sales/Pay by Bank/Prospect-Lists/Money2020-Dashboard.html` (exact dup) + `…/Louise-Operator-Contacts/Outreach-Dashboard.html` + `Louises-Dashboard.html` (older versions). `NEXT-Malta-Overview.html` reviewed separately, not auto-deleted.
5. **Product name (UI)** — ✅ **Board & Management Reports** (the word "dashboard" implied live and was dropped). Folder keeps its legacy name.
6. **Home page = repository, no live scorecard** — ✅ figures live only inside the dated report; the home page is a point-in-time archive, so current-looking numbers can't mislead.
7. **Repository scope** — ✅ monthly reports **+ board/strategy materials** (memos, strategies, plans) gathered in one place for management and the board.
8. **Scope correction (Rae, 2026-06-06)** — ✅ this is a **management archive, not a content hub**. In scope: board memos, commercial reports, market analyses, business cases, GTM strategies, product briefs, trip reports, marketing plans, sales one-pagers (leadership reference), and **onboarding processes** (employee / customer / partner — `<NEEDS DATA>` where undocumented). Out of scope: blog posts, LinkedIn/social posts, press boilerplate and all marketing *content* — that lives in `Marketing/Content/`. The `materials/marketing/` pages were removed accordingly.

---

## Appendix A — The reusable monthly-report prompt

Paste this each month (it produces the report content for the template):

> You are producing Aryze's Commercial Operating monthly report for **[MONTH YEAR]**. Follow `docs/Reporting-System-Design.md` and `docs/Metric-Definitions.md` exactly.
>
> Inputs I'm giving you: the CRM opportunities snapshot (image/export) as of **[DATE]**, the month's CRM notes, event/trip reports, and weekly updates. Marketing block input: **[paste or "none this month"]**.
>
> Produce, in the §5 spine order: (1) a one-line verdict; (2) an executive summary — verdict + 3 sentences of what happened + the 1–3 decisions for leadership; (3) the scorecard — 5 KPIs with value + MoM delta, computed per the definitions, each traceable to the snapshot, plus stage counts; (4) pipeline movement as carried/cleaned/created + the advancing-deals table; (5) marketing & events (or one honest line if no input); (6) partnerships; (7) up to three claim-style findings (don't pad); (8) priorities with an owner + date on every item.
>
> Rules: Aryze brand voice (dry, operational, literal); never blur the three products; no forbidden phrases; every number cited to the snapshot with its "as of" date; if a section is thin, say so in one line rather than inventing content; flag any prior-month number you're restating. Output as the filled report body ready to drop into `templates/report-template.html`. Then run the brand-review skill on the narrative before I review.

---

*Canonical design reference for the Commercial Operating Dashboard. Right-sized: build the kit and one excellent report first; automate only if the manual rhythm hurts.*
