# ISSUES_AND_GAPS.md

# المشاكل والفجوات والملاحظات

يسجل هذا الملف أي مشكلة، فجوة، ملاحظة، أو اقتراح يظهر أثناء العمل.

## حالات السجل

```text
Open
Planned
In Progress
Resolved
Deferred
Won't Fix
Closed
```

## السجل

| Issue ID | Title | Type | Status | Linked Task | Owner | Resolution / Next Action |
|---|---|---|---|---|---|---|
| ISSUE-0000 | Project control layer needed before implementation | Governance Gap | Closed | TASK-0000 | Tera Agent | Added `project-control/` and traceability protocol. |
| ISSUE-0001 | Preparation files had stale pending-state text | Documentation Sync | Closed | N/A | Tera Agent | Updated `08_TECHNICAL_ARCHITECTURE.md`, `TERA_PROJECT_DECISION.md`, and `GENERATED_AGENTS_MANIFEST.md`. |
| ISSUE-0002 | Sub-agent handback could remain only in chat | Traceability Gap | Closed | TASK-0001 | Tera Agent | Added mandatory handback recording rule: every sub-agent result must be recorded inside `project-control/tasks/[TASK-ID].md` before acceptance or closure. |
| ISSUE-0003 | Secret exposure in local config fallback and follow-up documentation | Security Incident | Resolved | TASK-0003 / TASK-0004 | Project Owner | A real secret was exposed during local config handling and then described unsafely in follow-up records. Cleaned by Project Owner: removed the fallback entirely, redacted documentation to `[REDACTED]`, and tightened Tera system rules so post-execution review also inspects `project-control` files, task records, reports, and incident descriptions for secret leakage. |
