# SUB_AGENT_STATUS.md

## Purpose

This file is a lightweight manager review of sub-agent status inside the current project.

It is not a full historical log.
It does not replace `PROJECT_ACTIVITY_LOG.md` or task files.

Tera owns the final evaluation.
`ProjectControlAgent` may help update this file only when Tera explicitly asks.

## Rating Rules

- Keep the file short and decision-oriented.
- Separate `Status`, `Quality`, and `Decision / Notes`.
- Do not make a strong judgment from one isolated incident unless the issue is clearly structural.

## Allowed Values

- Usage: `None` / `Low` / `Medium` / `High`
- Load: `None` / `Low` / `Medium` / `High`
- Quality: `Not Evaluated` / `Good` / `Needs Watch` / `Needs Update`
- Status: `Active` / `Conditional` / `Idle` / `Underused` / `Overloaded` / `Needs Update` / `Candidate for Merge` / `Candidate for Deactivation` / `Critical Specialist`

## When to Update

- After every 3-5 tasks
- At the end of each phase
- When an agent is added, activated, or deactivated
- When repeated mistakes or clear load pressure appear
- Before a new medium or large project

## Initial Review Baseline

This initial baseline is anchored to work completed through `TASK-0009`.
Later tasks may refine the status, but this file starts from the first stable multi-agent execution phase.

## Current Sub-Agent Status

| Agent | Status | Usage | Load | Quality | Last Used | Current Decision | Notes |
|---|---|---|---|---|---|---|---|
| `EngineeringAgent` | Active | High | Medium | Good | `TASK-0012` | Keep as primary execution specialist | نفذ TASK-0001 إلى TASK-0004 ثم TASK-0007 وشارك في TASK-0008 وأنجز TASK-0011. نفذ Sub-Task 1 من TASK-0012 — 9 Server Actions في `app/checks/actions.ts` (483 سطرًا). Build PASS. |
| `FrontendAgent` | Active | High | Medium | Good | `TASK-0012` | Keep as primary UI execution specialist | استخدم فعليًا في TASK-0008 وTASK-0009 وTASK-0012 (Sub-Tasks 2+3). نفذ `app/checks/page.tsx` (64530 بايت، full Checks UI مع summary bar, filters, table, badges, modals, print, جميع الحالات) وفعّل كارت الشيكات في الصفحة الرئيسية. الأداء جيد. |
| `ProjectControlAgent` | Underused | Low | Low | Good | `TASK-0011` | Increase usage in larger execution batches | استخدم في TASK-0011 لتحديث سجلات `project-control` وإغلاق ISSUE-0006 تحت توجيه Tera. |
| `ExecutionPreparationAgent` | Idle | None | None | Not Evaluated | None | Keep ready for large or multi-agent tasks | مفعّل لكن لم يدخل دورة تنفيذ فعلية بعد. |
| `QualityReviewCoordinatorAgent` | Conditional | Low | Low | Good | `TASK-0010` | Keep for periodic reviews after phases or quality-drift signals | استخدم فعليًا في TASK-0010 وقدم مراجعة مفيدة بدون تعديل ملفات أو تضخيم نطاق. |
| `SecurityAgent` | Critical Specialist | Medium | Low | Good | `TASK-0012` | Keep as conditional security specialist | استُخدم في TASK-0005 (مراجعة Auth) وفي TASK-0012 (مراجعة Checks Server Actions). أنتج findingين مفيدين: ISSUE-0007 (NaN bypass — Medium) وISSUE-0008 (date crash — Low). PASS مع توصيات. |
| `QAAndAcceptanceAgent` | Conditional | Low | Low | Good | `TASK-0012` | Keep for workflow-heavy and UI acceptance | استُخدم فعليًا في مراجعة قبول TASK-0012 (Checks Screen S02). راجع الشاشة والـ Workflow والحالات. PASS مع 3 ملاحظات بسيطة غير مانعة. |
| `BusinessWorkflowAgent` | Active | Low | Low | Good | `TASK-0006` | Keep available for workflow-heavy phases | استخدم في TASK-0006 لإنتاج `workflow-rules.md`. |
| `UIUXStructureAgent` | Active | Low | Low | Good | `TASK-0006` | Keep available before complex screens | استخدم في TASK-0006 لإنتاج مواصفات الشاشة قبل التنفيذ. |
| `DocumentationHandoverAgent` | Idle | None | None | Not Evaluated | None | Keep idle until a real handoff-ready phase appears | خامل طبيعيًا لأن مرحلة التسليم النهائي أو الداخلي لم تبدأ بعد. |
| `ReportingAnalyticsAgent` | Idle | None | None | Not Evaluated | None | Keep ready only | لم يستخدم بعد لأن مرحلة التقارير لم تبدأ. |
| `RequirementsScopeAgent` | Idle | None | None | Not Evaluated | None | Keep inactive unless scope reopens | مولد وغير مفعّل لأن النطاق مستقر حاليًا. |
| `DataDesignAgent` | Idle | None | None | Not Evaluated | None | Keep inactive unless data redesign is needed | مولد وغير مفعّل لأن نموذج البيانات مستقر بعد TASK-0002. |

## Current Tera Decisions

- Keep `EngineeringAgent` and `FrontendAgent` as the primary execution pair.
- Increase actual use of `ProjectControlAgent` in larger execution batches.
- Keep `SecurityAgent` as a conditional specialist, not a default reviewer.
- Keep `QAAndAcceptanceAgent` ready for the checks screen and workflow-heavy phases.
- Keep idle agents available without forcing activation or unnecessary work.
- `ISSUE-0006` fix completed in `TASK-0011`; prepare Checks S02 task package with `ExecutionPreparationAgent` before implementation.
- `TASK-0012` (Checks Screen S02) completed and submitted ✅ awaiting user acceptance.
- `ISSUE-0007` (NaN amount bypass) and `ISSUE-0008` (invalid date crash) registered from SecurityAgent TASK-0012 review — fix planning pending Tera decision.
- `QAAndAcceptanceAgent` successfully used for first time — review PASS with 3 minor notes.
- Keep UI component/style extraction deferred until after S02 or S05 unless duplication causes bugs.
