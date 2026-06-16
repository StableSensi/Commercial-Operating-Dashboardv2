# Commercial Operating Dashboard — Metric Definitions

**Status:** Canonical · the single source of truth for what every number means
**Owner:** Sales (Rae) · **Date:** 2026-06-06

Every KPI on a report maps to exactly one definition here. If a number can't be defined here, it doesn't ship. All figures carry the CRM snapshot date they came from ("as of").

---

## 1. The pipeline stages (canonical list)

These names match the CRM board and never change without updating this file. May 2026 counts shown for reference.

| Stage | In "Active"? | May 2026 |
|---|---|---|
| Partnerships | ✅ yes | 4 |
| New | ✅ yes | 13 |
| Screening | ✅ yes | 6 |
| First Meeting | ✅ yes | 5 |
| Qualification | ✅ yes | 4 |
| Onboarding | ✅ yes | 1 |
| Strategic long-term | ❌ no | 6 |
| Backlog | ❌ no | 15 |
| Not interested | ❌ no | 2 |
| **Total opportunities** | — | **56** |

---

## 2. Headline metrics

**Opportunities in CRM (total).** Every opportunity record on the board across all stages, including Backlog, Strategic long-term and Not interested. May: **56**. (April baseline: 31.)

**Active (working).** The sum of the stages where a deal is actively being worked: **Partnerships + New + Screening + First Meeting + Qualification + Onboarding**. Excludes Strategic long-term, Backlog and Not interested. May: **33** (4+13+6+5+4+1). Reconciles: 33 active + 23 inactive = 56 total.

**New-stage opps.** Count in the New stage — for May, the promoted NEXT tier-2 operator leads. May: **13**.

**Advancing.** The subset of active deals with **either a meeting held or a dated next step** in the period. This is the conversion-quality metric, hand-identified each month from CRM notes. May: **9**.

**Partnerships advanced.** Strategic partner relationships that moved materially in the period (a concrete offer or commitment made), not the Partnerships *stage* count. May: **2** (BVNK rails, Visa payout gap).

**Marketing-sourced (when Marketing block is supplied).** An opportunity is attributed to an event or campaign if first contact or re-activation happened through it, recorded in the CRM note. Owned by Marketing.

---

## 3. Rules

**Delta.** Each KPI shows month-over-month change vs the prior month's figure for the same metric (value and %). Direction colour: green up, red down, neutral flat. (We report delta only — see targets below.)

**Targets / RAG.** Off for now. RAG colours (green/amber/red) and "vs target" switch on only once monthly commercial targets are set. Until then, no RAG dots on KPIs.

**Restatement.** If a prior month's number is corrected after a CRM cleanup, state it in the current report's Appendix ("April active restated 20 → 22 after cleanup"). The hub trend series always uses the corrected numbers.

**"As of" discipline.** Every report's scorecard cites the CRM snapshot date the counts were read from. The snapshot image is archived in the report folder.

**Honesty.** Stalled and out-of-region deals are stated plainly and moved to Backlog / Not interested — never carried in Active as false hope.

---

## 4. Source of record

- Counts: the monthly CRM opportunities board export/snapshot (archived as `reports/YYYY-MM/crm-snapshot.png`).
- Named deals, movement, advancing test: the month's CRM notes, event/trip reports, and weekly updates.
- Marketing metrics: supplied by Marketing each month.
