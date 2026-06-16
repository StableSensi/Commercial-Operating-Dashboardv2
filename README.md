# Sales & Marketing — department site

The Sales & Marketing department site: what the department produces and shares — reports, strategies, reference and the live tools it has built. Aryze gathers here what management and the board consult: monthly reports, board memos, market analyses, business cases, GTM strategies, product briefs, trip reports, marketing plans, reference one-pagers and onboarding processes. Marketing *content* (blog, social, press) lives in `Marketing/Content/`, never here. Self-contained: plain HTML + one shared stylesheet, no build step.

**The rules live in [`CLAUDE.md`](CLAUDE.md)** — what the site is, the editorial laws, the two report skeletons (events vs monthlies), the canonical-source map and the QA gate. Read it before changing anything.

**Point-in-time, not live.** Every item is dated. The figures live *inside* each dated report (each carries an "as of" date); the home page deliberately shows **no live scorecard**, because the data is not connected to a live feed and current-looking numbers would mislead.

Scope: **Sales + Marketing** across Pay by Bank, Stablecoin Factory and Digital Cash. Output: **web-first + PDF export**. Data: **hybrid, manual-first** (CRM snapshot + curated narrative).

> The folder is named `Commercial-Operating-Dashboard/` for continuity; the site is presented as **Sales & Marketing** (department site). Navigation: Home | Reports | Reference | Tools.

## Open it
Open `index.html` in any browser — the repository home. It features the latest monthly report and links the report archive, board/strategy materials, and (separately) the live operational tools.

## Structure
```
index.html              ← repository home: Home | Reports | Reference | Tools
assets/cod.css          ← THE design system v2 (edit once, all pages update)
templates/
  report-template.html  ← copy this each month (carries the two-weeks-later rule)
reports/
  2026-05/              ← May 2026 (reference report) + crm-snapshot.png
  2026-04/              ← April 2026
  2026-q1/              ← Q1 2026 sales update (page; filed PDF is the record)
materials/             ← the Reference section, one folder per group
  analyser/            ← three product one-pagers: customer · value · product on one page
                          (Danish .md canonical in Documents/Analyser/)
  nightlife/           ← Nightlife market-entry case (index + board memo + report)
  events/              ← trip reports (SBC + pipeline appendix, NEXT Malta, Stablecon) — listed under Reports
  strategy/            ← strategies & plans incl. the NBC Stockholm marketing plan
  frameworks/          ← qualification, buyer-committee, CRM guide
  corporate/           ← the team page (sales-team-structure.html)
  onboarding/          ← flows: sales→onboarding, customer PbB, employee (documented) ·
                          partner / Factory / Digital Cash customer (open slots)
docs/
  Reporting-System-Design.md       ← architecture, report spine, build prompt (canonical)
  Metric-Definitions.md            ← what every number means (editable source)
  metric-definitions.html          ← "Definitions & method" page (linked from reports)
  Monthly-Production-Checklist.md   ← the monthly runbook
  qa-check.py                      ← QA gate: links, orphans, tag balance, banned patterns
_archive/
  2026-06-07-cleanup/   ← superseded pages from the consolidation cleanups (see its README)
```

**Stale-proofing (the two-weeks-later test).** Every page must read correctly two weeks after publication: dated facts only, no relative time, a written date on every report. Reports record what happened — no per-deal next-step columns; pending to-dos live in the CRM (decision Rae, 8 June 2026). Published reports are closed; corrections are restatements in the next report's appendix. One-pagers live only at digitalonepager.aryze.io (under Tools); internal copies were retired 8 June 2026.

## Produce a month
Copy `templates/report-template.html` → `reports/YYYY-MM/index.html`, fill it from the CRM snapshot + notes, export the PDF to `Documents/Reports/`, then add the report to the home page. Full steps: `docs/Monthly-Production-Checklist.md`.

## Principles
A board reader gets the verdict in two minutes · every number is dated and traceable · nothing on the home page looks live · every page passes the two-weeks-later test · one visual language · Aryze brand voice throughout.

Canonical rules: `CLAUDE.md`. Design history: `docs/Reporting-System-Design.md`.

## Housekeeping (not board-facing)
Duplicates flagged for archiving (via Finder, per Drive-sync rules): the superseded standalone `Documents/Reports/May-Sales-Report-2026.html` (replaced by the May report here) and the duplicate NBC plan PDF in `Documents/Plans/` (canonical .docx lives in Marketing/Events). The folder `Documents/Reports/SBC-Summit-2025/` is mislabelled — the board PDF inside is dated 30 April 2026; rename to `SBC-Summit-2026` via Finder when convenient (update the links in `materials/events/sbc-summit-2026-report.html` and this repo if renamed).
