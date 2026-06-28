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

This initial baseline is anchored to work completed through `TASK-0008`.
Later tasks may refine the status, but this file starts from the first stable multi-agent execution phase.

## Current Sub-Agent Status

| Agent | Status | Usage | Load | Quality | Decision / Notes |
|---|---|---|---|---|---|
| `EngineeringAgent` | Active | High | Medium | Good | نفذ TASK-0001 إلى TASK-0004 ثم TASK-0007 وشارك في TASK-0008. مخرجاته مستقرة بعد ضبط قواعد الأمن و`requireAdmin()`. يبقى عميلًا أساسيًا وخبيرًا حرجًا في Backend/Logic. |
| `FrontendAgent` | Active | Medium | Medium | Good | بدأ استخدامه فعليًا في TASK-0008 بعد فصل الواجهة عن EngineeringAgent. المؤشرات الأولية جيدة، لكن يجب مراقبة الاتساق البصري مع توسع الشاشات لاحقًا. |
| `ProjectControlAgent` | Underused | Low | Low | Not Evaluated | المنظومة اعتمدته، لكن Tera ما زال ينفذ كثيرًا من تحديثات `project-control` يدويًا. القرار: استخدامه أكثر بعد الدفعات الأكبر لتقليل الحمل الإداري على Tera. |
| `ExecutionPreparationAgent` | Idle | None | None | Not Evaluated | مفعّل لكن لم يدخل دورة تنفيذ فعلية بعد. القرار: إبقاؤه جاهزًا للمهام الأكبر أو عندما تصبح Task Packages أكثر كثافة. |
| `QualityReviewCoordinatorAgent` | Conditional | None | None | Not Evaluated | مفعّل حديثًا للتنسيق فقط. لم تبدأ به جلسة مراجعة فعلية بعد. القرار: يستخدم قبل Phase كبيرة أو قبل Release أو عند ظهور debt signals. |
| `SecurityAgent` | Critical Specialist | Low | Low | Good | استُخدم بوضوح في TASK-0005 وأنتج findings مفيدة بدون تضخم. القرار: يبقى مشروطًا، ويستدعى فقط للمهام الحساسة أمنيًا أو للمراجعات المستقلة المطلوبة. |
| `QAAndAcceptanceAgent` | Conditional | None | None | Not Evaluated | موجود لكنه لم يبدأ مراجعة فعلية حتى baseline TASK-0008. القرار: يجب إدخاله قبل اعتماد شاشة الشيكات S02 أو أي Workflow أكثر تعقيدًا. |
| `BusinessWorkflowAgent` | Active | Low | Low | Good | استخدم في TASK-0006 لإنتاج `workflow-rules.md`. استخدامه صحيح ومركّز، ولا يوجد ما يستدعي تعديل دوره الآن. |
| `UIUXStructureAgent` | Active | Low | Low | Good | استخدم في TASK-0006 لإنتاج مواصفات الشاشة قبل التنفيذ. دوره منضبط ومفيد قبل الشاشات المركبة. |
| `DocumentationHandoverAgent` | Idle | None | None | Not Evaluated | خامل طبيعيًا لأن مرحلة التسليم النهائي لم تبدأ. القرار: لا حاجة لتغييره الآن. |
| `ReportingAnalyticsAgent` | Idle | None | None | Not Evaluated | لم يستخدم بعد لأن مرحلة التقارير لم تبدأ. القرار: يبقى جاهزًا فقط. |
| `RequirementsScopeAgent` | Idle | None | None | Not Evaluated | مولد وغير مفعّل لأن النطاق مستقر حاليًا. القرار: لا حاجة لتفعيله إلا إذا عاد النقاش إلى scope changes. |
| `DataDesignAgent` | Idle | None | None | Not Evaluated | مولد وغير مفعّل لأن نموذج البيانات مستقر بعد TASK-0002. القرار: لا يستخدم إلا إذا ظهر redesign حقيقي في البيانات. |

## Current Tera Decisions

- Keep `EngineeringAgent` and `FrontendAgent` as the primary execution pair.
- Increase actual use of `ProjectControlAgent` in larger execution batches.
- Keep `SecurityAgent` as a conditional specialist, not a default reviewer.
- Keep `QAAndAcceptanceAgent` ready for the checks screen and workflow-heavy phases.
- Keep idle agents available without forcing activation or unnecessary work.
