# Monthly Production Checklist — Commercial Operating Report

**Owner:** Sales (Rae) · **Marketing** supplies the marketing & events block.
**Cadence:** first working days of each month, for the month just closed.
**Target:** a polished report in a few hours.

Follow `Reporting-System-Design.md` (§5 spine) and `Metric-Definitions.md` (the numbers). Manual-first: no build step, no render engine — copy the template and fill it.

---

## Steps

**1. Snapshot the CRM.**
Export the opportunities board. Save the image to `reports/YYYY-MM/crm-snapshot.png`. Read off the counts per stage.

**2. Compute the scorecard** (per `Metric-Definitions.md`).
- Total opportunities (all stages).
- Active = Partnerships + New + Screening + First Meeting + Qualification + Onboarding. Reconcile: active + inactive = total.
- New-stage, Advancing (meeting held or dated next step), Partnerships advanced.
- Each KPI's delta vs the prior month. Delta-only — no RAG until targets exist.

**3. Copy the template.**
`templates/report-template.html` → `reports/YYYY-MM/index.html`.

**4. Fill the content** (Claude drafts from CRM notes + event reports + weekly updates; human approves).
- One-line verdict · executive summary (3 sentences + the 1–3 asks).
- Pipeline: carried / cleaned / created cards + the advancing-deals table.
- Marketing & events: from Marketing's input. **If none arrives, one honest line** — do not block the report.
- Partnerships · up to three findings (never pad) · priorities with owner + date · decision panels.
- Appendix: full pipeline table, new-stage list, snapshot image, sources, any restatement.

**5. QA** (the §11 acceptance criteria).
- Two-minute test: verdict + state + ask on the first screen.
- **Two-weeks-later test (stale-proofing):** read every line as if it is two weeks after publication. No relative time ("next week", "upcoming", "we are about to", "currently"); next steps are dated commitments ("Hold the 2 June call"); the snapshot stamp sits under the cover meta; Priorities carries the standing line that outcomes are reported in the next report. A published report is closed — corrections go in the next report's appendix as restatements, never as edits here.
- Every number maps to a definition and the dated snapshot.
- Aryze (never ARYZE); products not blurred; no forbidden phrases. Run the **brand-review** skill on the narrative.
- Spine in order; thin sections handled with one line; figures aligned; clean print.

**6. Export the PDF.**
Browser print (the print stylesheet handles layout) → `Commercial-Report-YYYY-MM.pdf`. File a copy to `Documents/Reports/`.

**7. Publish.**
- Update the hub's verdict + scorecard + decision surface (`index.html`).
- Add the month's row to the home page (`index.html` → Monthly reports) and feature it as the latest.
- From ~3 months of history, add the hub trend lines.

---

## Definition of done
Every KPI traces to the snapshot · every deal row has a next step · every priority has an owner + date · brand/voice check passed · PDF filed · hub + library updated.

---

## Reusable monthly prompt
The paste-ready prompt that produces the report body is in `Reporting-System-Design.md`, Appendix A.
