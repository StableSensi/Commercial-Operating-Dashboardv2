# Sales & Marketing — the department site

> **Layer-4 project file.** Inherits everything in the master [`StableSensei/CLAUDE.md`](../../CLAUDE.md) — brand voice, forbidden phrases, capability discipline, "Aryze" never "ARYZE", the three products never blurred. This file adds the rules for **this site only**. Read both before touching anything.

---

## 1 · What this is

The **department site for Sales & Marketing** — where Rae (Stablesensei, Director of Sales & Marketing) shares what the department produces with management and the board. Static HTML, no build step, one stylesheet (`assets/cod.css`), English throughout.

It is **not** a live dashboard. Nothing on it updates itself. Every page must still read correctly weeks after it was written.

**The reader** is a busy executive who opens it cold. In two minutes they should see what the department has done; anything they open must make sense without Rae in the room.

**The test every page must pass — "the two-weeks-later test":** read the page as if today is two weeks after its written date. If anything has silently become wrong — a "next week we will…", a meeting that has since happened, a to-do that is since done — the page fails.

**The site must read as if a person wrote it page by page over time** — never as something generated in a batch. No "Updated" language, no cross-references to documents that did not exist on the page's written date, no identical boilerplate that betrays a single editing day.

---

## 2 · The site in one view

Four rooms, one hub. `index.html` is the **only** navigation hub. Direct cards from the front page, big tap targets, minimum steps. No collection pages unless they genuinely earn it (currently only `materials/nightlife/index.html` and `materials/onboarding/index.html`).

```
index.html                      Home — the only hub
│
├── Reports                     dated records of what happened
│   ├── reports/2026-05/        Monthly · written 1 June 2026 (data as of 31 May)
│   ├── reports/2026-04/        Monthly · written early May 2026 (estimate)
│   ├── reports/2026-q1/        Quarterly · written 21 April 2026
│   ├── materials/events/next-malta-trip-report.html        written 8 June 2026
│   ├── materials/events/stablecon-amsterdam-trip-report.html  written 21 May 2026
│   ├── materials/events/sbc-summit-2026-report.html        written 30 April 2026
│   └── materials/events/sbc-pipeline-appendix.html         (appendix to SBC)
│
├── Reference                   what the team and board look things up in
│   ├── materials/analyser/     3 product one-pagers (customer · value · product)
│   ├── materials/strategy/     sales-strategy, 2026 objectives, 2 marketing plans
│   ├── materials/nightlife/    market-entry case (overview + memo + report)
│   ├── materials/frameworks/   qualification, buyer committee, CRM guide
│   ├── materials/onboarding/   flows + open slots
│   └── materials/corporate/    the team page
│
├── Tools                       live, clearly separated from the dated reports
│   └── digitalonepager.aryze.io + 4 sibling Dev dashboards
│
├── docs/                       repo documentation (metric definitions page is linked
│                               only from the scorecards; everything else is internal)
└── templates/report-template.html   never linked from the site
```

---

## 3 · The laws (non-negotiable)

1. **Reports record what happened.** No per-deal next-step columns, no "Due"/"By" dates, no action-item tables, no "Open items"/"To be completed" blocks, no recommendations-as-instructions. To-dos live in the CRM, not in reports. A report may record *what was agreed or committed at the time of writing* ("follow-up sent 31 May", "the presentation sat with Aryze at close") — that is a fact, not a to-do.
2. **Each report stands alone in its own time.** Its meta line carries the written date. It never references documents that did not exist on that date, never points "forward" to later reports, and is never silently updated afterwards.
3. **No internal language on rendered pages.** No version numbers, no "source .md" links, no merge/maintenance/mirror notes, no scope-decision callouts, no method explanations on covers, no `<CONFIRM>`/`<NEEDS SOURCE>` markers, no "Snapshot" labels. Internal notes belong in this file, in `docs/`, or in HTML comments — never in visible content.
4. **Verified facts only.** Sources: Rae's mails (Outlook), CRM notes and screenshots, case folders under `Sales/`, WhatsApp/Telegram screenshots Rae provides, and the canonical documents in §5. If a fact cannot be verified, ask Rae or leave it out. Never invent names, dates, numbers or outcomes.
5. **Separations that never blur.** Partners ≠ customers (Visa, BVNK, Mastercard, Ripple are partners; Quantoz, Rabobank are potential customers). The three products never mix. The Pay by Bank ICP is high-risk merchants — iGaming, casino, betting first; nightlife is a separate market-entry case, on purpose.
6. **A section with nothing to record is omitted, never padded.** Thin months get one honest line, not filler.
7. **English on the site, Danish behind it.** Canonical sources in `Documents/` and `Internal/` may be Danish; site pages are English. Danish role terms (salgschef) are fine. Collaboration with Rae runs in Danish.
8. **Motion is sober.** The visual layer (`assets/cod.js` + the v2.3 block in `cod.css`) gives quiet fade-ups on scroll, staggered grids, hover lift and reading rhythm on long pages. It always honours `prefers-reduced-motion`, degrades to static without JS, and is never bouncy or poppy. Every page loads the script with a depth-correct relative path.

---

## 4 · The two report skeletons

Rae's rule: **all event reports share one structure, all monthly reports share another — and the two are different.** Events are narrative documents (`.doc` article, 840 px); monthlies are operational pages (scorecard-led, full width).

### Event report (model: NEXT Malta)

```
doc-head    eyebrow "Trip/Event report · [scope]" · H1 "[Event] — [angle]" · lede (one-sentence outcome)
            meta: [Author, title] · Event [date] · Written [date] · Confidential
KPI strip   one 3-column content table — the trip in three numbers
Executive summary          (unnumbered, 2–3 paragraphs)
1 · On the ground          who we met and what each conversation produced
2 · The pipeline           the asset to work (the 20 / the tiers / implications by product)
3 · What became structure  the durable outcome beyond leads (agent track / dinner / distribution)
4 · Assessment             honest bullets: real assets, honest risks, bottom line
Where it stands            (unnumbered) status at the written date — states, never to-dos
```

### Monthly report (model: May 2026)

```
subnav      Summary · Scorecard · Pipeline · Marketing · [Partnerships] · Findings · Priorities · [Appendix]
cover       eyebrow "Monthly … report" · H1 · one-line verdict
            meta: Owner: Sales · Written [date] · Data as of [last day of month] · Confidential
exec        2–3 paragraphs + one "Decision needed" line. The product split is stated
            explicitly — Pay by Bank, Stablecoin Factory and Digital Cash never read
            as one pool, and the decision line balances the tracks (never one event)
Scorecard   KPI tiles + stage strip (deltas vs prior month where data exists)
Pipeline    movement per product — the three products kept separate, one
            "Advancing" group per product in the deal tables
Marketing   where the pipeline came from (events matrix + standout cards)
Partnerships  only when there is substance
Findings    three observations that should change behaviour
Priorities  the commitments made at the readout, as recorded at writing
Appendix    deal book detail + CRM snapshot of record (collapsible)
```

Quarterly reports (Q1) follow the monthly family visually but are not forced onto the monthly skeleton.

New report = copy `templates/report-template.html`, fill `{{DATE_WRITTEN}}`/`{{SNAPSHOT_DATE}}`, then add one row to the right group on `index.html` (Monthly / Events / Quarterly) with the Written date — and update the hero card if it is the newest monthly.

---

## 5 · Where the truth lives (canonical sources)

Site pages are presentation. Substance changes go to the canonical file first — or at least simultaneously.

| Site page | Canonical source |
|---|---|
| `materials/analyser/*.html` (3 product pages) | `Documents/Analyser/[Product]/ICP.md + VPC.md + Product-Description.md` |
| `materials/strategy/sales-strategy.html` | `Sales/Pay by Bank/Strategy/sales-strategy.md` |
| `materials/onboarding/*` | `Sales/Pay by Bank/Onboarding/onboarding-process.md` |
| `materials/corporate/sales-team-structure.html` | `Internal/sales-team-structure.md` |
| `materials/onboarding/employee.html` | `Internal/HR/Handbook/aryze-personalehaandbog.pdf` |
| `materials/nightlife/*` | `Sales/Pay by Bank/Nightlife-Commercial-Package/` |

### Decisions of record (do not regress)

- The team page reads as **one team with clear positions** — the junior sellers are equal sellers in one shared motion (never "the Pay by Bank one" / "the stablecoin one"), described as owners of the deal flow and the sales lead's right hand in daily deal work — never as assistants.
- The nightlife case is named **"Paint the town red"** (Rae's naming — the green-market wordplay lives in the headline and verdict; body copy stays literal).
- Monthly reports weight **all** the month's events and lead types — never only the freshest trip.
- Names: **Gabriel Franciscovich** (not Frederiksen-Frisko), Mikkel Christensen, Tobias (starts August 2026), Gry. Rabii Ahmad Esteitie signs reports as "Rabii Esteitie, Director, Sales & Marketing".
- NEXT agent track: Louise Beyer Tingager, Victor Olinger, Anthony, A B. **Lisa Akter belongs in the May report** (introducer agreement issued 2 June), not in the NEXT report.
- HR records are deliberately **not** listed on the site.
- Nightlife case pages never link to working folders — the case page carries the story; the memo and report carry the detail.

---

## 6 · Making changes

1. **Before any capability or market claim:** check `Documents/Analyser/[Product]/` and the master CLAUDE.md limits (PIS-only, customer→merchant, UK live / EU late Q2 2026, Aryze never issuer/operator, no consortium-building).
2. **Archive, never delete history:** superseded pages go to `_archive/[date]-[reason]/` with a README line. **Copy → verify → delete; never `mv`** — the tree is Google Drive-synced and tool-moves into fresh `_archive` subfolders can be reconciled away.
3. **QA gate before reporting done:** run `python3 docs/qa-check.py` from the repo root. It checks broken links, orphan pages, HTML tag balance and banned patterns (with the standing exemptions encoded at the top of the script). The bar is **0 broken links, 0 orphans, 0 pattern hits**.
4. **After structural changes:** update the page inventory in §2 of this file and the README.

---

## 7 · Working with Rae

- **Every correction is a pattern.** When Rae flags something (usually screenshot + one Danish line), fix it **sitewide**, not just the screenshotted instance — then say what was swept. He says so explicitly if something is a one-off.
- **Dig before asking.** When new content is needed, his mails (Outlook search), the case folders, and the event/CRM material usually hold the answer. Ask only for facts that exist nowhere.
- **"Rør ikke X"** means X is frozen until Rae releases it. (The May report was frozen this way until 8 June, when Rae released it; it was rebalanced strictly within its own written date — no fact later than 1 June.)
- **Reply in Danish, build in English.** Keep replies short; he reads outcomes, not process.
- When uncertain between two readings of an instruction, pick the one consistent with these laws and say which was picked — don't stall the work.

---

## 8 · Parked / known exceptions

- **`materials/frameworks/lead-pipeline-process.html`** loads 3 screenshots from an external vercel URL — needs a manual browser download into `assets/lead-pipeline/` (sandbox cannot fetch them).
- **April's written date** ("Early May 2026") is an estimate pending Rae's confirmation.
- **Subnav hides below 880 px** — mobile section-jumping is parked by design.

---

**Last updated:** 2026-06-16 — (1) New reusable component library in `assets/cod.css` §18 (at-a-glance, spec strip, box-split, rank bars, flow-map, chips, mini-bars, progressive-disclosure `details.more`, `footer.doc-source`); **Pay by Bank analyser rebuilt** as the visual reference using it (content preserved, ~36% shorter on first screen, rest behind progressive disclosure). Rollout to the other pages pending. (2) **Site-wide voice pass:** seller/CRM/internal-note phrasing removed and Danish translated, so every page reads as a finished English document; the dated reports were light-touched only (frozen records). (3) **Source-doc footers:** `footer.doc-source` links to readable PDFs rendered from the canonical `.md` (Pay by Bank live; other pages pending); the QA `md-link` rule has a scoped exemption for `class="src"` footer links. (4) `.gitignore` hardened. Note: the QA gate passes 0/0/0 from the real tree — any in-sandbox "broken link" report is a mount-path artifact, since the cross-tree `../../../../` links resolve on disk. Open: `materials/sales-assets/` is an empty orphan folder (remove); repo has a staged index but no commits yet (make the baseline commit).

**Last updated:** 2026-06-08 — created after the structure-lock conversation: laws, the two report skeletons, canonical-source map, decisions of record, QA gate.
