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
| ISSUE-0003 | Real password leaked into prisma.config.ts fallback value | Security Incident | Resolved | TASK-0003 | Project Owner | TASK-0003 EngineeringAgent wrote real password as fallback in `prisma.config.ts` (`url: process.env.DATABASE_URL || 'postgresql://postgres:Majed%401980@...'`). Cleaned by Project Owner: removed fallback entirely. Tera system rules updated to prevent recurrence: secret checks added to Pre-Execution Gate (items 10-11), Post-Execution Review Gate (items 11-13), AGENT_GENERATION_TEMPLATE.md (Secrets Handling field), TeraSubAgents.md (SECRET_EXPOSURE rejection code, redaction rules). |
