# DECISIONS_LOG.md

# سجل القرارات

يسجل هذا الملف القرارات المهمة التي تؤثر على النطاق، التنفيذ، التصميم، المخاطر، أو طريقة العمل.

## السجل

| Decision ID | Date | Decision | Reason | Impact | Approved By | Linked Task / Issue |
|---|---|---|---|---|---|---|
| DEC-0001 | 2026-06-27 | Use Project Control Layer before implementation. | Execution needs traceability, auditability, task history, and issue tracking. | All future implementation tasks require TASK-ID and review status. | Tera Agent / Project Owner | TASK-0000 |
| DEC-0002 | 2026-06-27 | Sync preparation status before implementation. | Some preparation files still described earlier pending states after implementation and testing files were created. | Project is marked preparation-complete and implementation-pending-approval. | Tera Agent | ISSUE-0001 |
| DEC-0003 | 2026-06-27 | Require sub-agent handbacks to be recorded inside the related task file. | TASK-0001 exposed that an EngineeringAgent handback can remain only in chat unless the protocol explicitly requires recording. | Tasks cannot move to Accepted or Closed until the sub-agent handback is documented in `project-control/tasks/[TASK-ID].md`. | Tera Agent / Project Owner | ISSUE-0002 |
| DEC-0004 | 2026-06-27 | Mandatory secret handling rules across Tera system. | TASK-0003 exposed real password as fallback value in `prisma.config.ts` and in task file content. Core rules were insufficient. | Real secrets permitted ONLY in `.env`/`.env.local`/local env vars. Banned from: project-control, project-preparation, generated-agents, tera-system, task files, logs, handbacks, code/config fallbacks. `SECRET_EXPOSURE` rejection code added. Pre-Execution Gate items 10-11 added; Post-Execution Review Gate items 11-13 added. AGENT_GENERATION_TEMPLATE.md handback template now includes `Secrets Handling` field. Handbacks must redact secrets. | Project Owner / Tera Agent | ISSUE-0003 |
