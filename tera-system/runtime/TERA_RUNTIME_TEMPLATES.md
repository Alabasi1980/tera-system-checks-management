# Tera Runtime Templates

These templates are official runtime support material for Tera Agent.
Use them when the compact runtime file requests a formal output format.

Authority rule:
If this file conflicts with `.opencode/agents/tera.md`, the active runtime file wins until the conflict is reviewed and corrected.

---

## 1. Tera Decision

```text
Tera Decision:
System files: tera-system is read-only during project execution.
Project output path: project-preparation/
Generated agents path: generated-agents/opencode/
Files to create: ...
Files not needed now: ...
Sub-agents to generate: ...
Sub-agents not needed now: ...
Reason: ...
Next step: ...
```

---

## 2. Delegation Context Format

For every delegated task, specify:

```text
Task ID:
Requested Agent:
Stage:
Objective:
Context Type:
Reference Files:
Required Sections:
Allowed Write Targets:
Forbidden Files / Actions:
Token Budget: Low / Medium / High / Critical
Model Tier Recommendation: Light / Medium / Strong
Minimum Acceptable Model Tier: Light / Medium / Strong
Current Model Assessment: sufficient / acceptable with safeguards / stronger recommended / stronger required / split first
Cost Note: no user approval needed / user approval recommended / user approval required
Reason:
Expected Output Limit:
Acceptance Criteria:
Return Status Required:
```

---

## 3. Model Capability Assessment

```text
Model Capability Assessment
Current Model: [name or "current runtime model"]
Task Complexity: [Low/Medium/High/Critical]
Risk Level: [Low/Medium/High/Critical]
Required Reasoning: [Low/Medium/High/Critical]
Context Size: [Low/Medium/High/Critical]
Verification Difficulty: [Low/Medium/High/Critical]
Historical Fit: [Good/Mixed/Weak/Unknown]
Recommended Model Tier: [Light/Medium/Strong]
Minimum Acceptable Model Tier: [Light/Medium/Strong]
Cost-Saving Option: [use weaker model / split task / reduce context / shorten output / not recommended]
User-Facing Recommendation Required: [Yes/No]
Decision: [sufficient / acceptable with safeguards / stronger recommended / stronger required / split]
Reason: [short reason]
Required Safeguards: [list]
User Approval Needed: Yes / No
Notes: [short notes]
```

Rules:
- Never claim a model is guaranteed or 100% capable.
- Use the weakest sufficient model that preserves safety, traceability, and quality.
- Ask the user about stronger models only when the risk, cost, or verification difficulty justifies it.

---

## 4. Tera Self-Diagnosis Record

For major delegation, phase transition, new agent activation, or risky decision, record briefly:

```text
Tera Self-Diagnosis: PASS / UNCLEAR / BLOCKED
Reason:
Action:
```

---

## 5. Emergency Report

```text
Emergency Report
Level:
Incident:
Affected files/areas:
Likely cause:
Current containment status:
Recommended action:
User approval required: Yes / No
```

---

## 6. Contradiction Detected Notice

```text
Tera Decision Needed: Contradiction Detected

Source A:
Source B:
Conflict:
Risk if A is followed:
Risk if B is followed:

Please choose:
A. [summary]
B. [summary]

Until resolved, I will hold the affected task.
```

---

## 7. Task Prioritization Record

For non-obvious task selection decisions, record briefly:

```text
Selected next task:
Reason:
Skipped ready tasks:
```

---

## 8. Domain Research Brief

Use this before any source-grounded domain research. No open-ended domain research is allowed without this brief.

```text
Domain Research Brief

Topic:
Domain:
Project context:
Research objective:
Allowed sources:
Forbidden sources:
Reference systems:
Depth: Low / Medium / High
Output limit:
Required focus:
Excluded topics:
Return format:
```

---

## 9. Domain Research Report

```text
Domain Research Report

Topic:
Domain:
Sources used:
Source tier:
Key findings:
Common workflows:
Common fields:
Common business rules:
Common roles:
Integration points:
Risks / caveats:
Conflicting findings:
Source confidence:
```

---

## 10. Domain Intelligence Report

```text
Domain Intelligence Report

Topic:
Domain:
Project size:
Reference style:
Sources used:

Core concept:
Business purpose:
Workflow:
Recommended fields:
Business rules:
Validation rules:
Roles and permissions:
Statuses:
Integration points:
Reports / outputs:
Risks if ignored:

MVP recommendation:
Include now:
Recommended:
Defer:
Out of Scope:
Needs User Decision:

Anti-bloat notes:
Tera decision recommendation:
```

---

## 11. Application Discovery Notes

Use this while collecting and normalizing a new application idea.

```text
Application Discovery Notes

Session date:
User raw idea summary:
Normalized application idea:
Problem / need:
Target users:
Main capabilities mentioned:
User preferences:
Technical notes:
Potential domain areas:
MVP candidates:
Later candidates:
Out-of-scope candidates:
Assumptions:
Open questions:
Information documented in:
```

---

## 12. Application Understanding Summary

Use before leaving discovery or moving to project preparation.

```text
Application Understanding Summary

Application name:
Core idea:
Problem solved:
Target users:
Primary goals:
Main workflows:

--- Classified Scope (per MVP_DEFINITION_PROTOCOL) ---
Core MVP (Phase 1A): [features essential for primary workflow]
Extended MVP (Phase 1B): [important additions, non-blocking]
Phase 2: [depends on Core MVP stability]
Phase 3: [advanced capabilities, lower urgency]
Later / Enterprise: [deferred complex features]
Out of scope: [explicitly excluded]

User preferences:
Technical context:
Domain assumptions:
Open questions:
Documented files:
Tera readiness: Ready / Partially Ready / Not Ready
User confirmation needed: Yes / No
Feature classification status: Completed / Pending
```

---

## 13. Discovery User Confirmation Request

```text
Discovery Confirmation Request

This is my current understanding of the application:

[summary]

Please confirm one option:
1. Approved as the basis for project preparation.
2. Mostly correct, with these corrections: ...
3. Not correct; continue discovery.

Until confirmed, I will not move to project preparation or implementation.
```

---

## 14. Research-Based Improvements Review

Use after Domain Intelligence or external research changes, improves, or challenges the initial understanding.

```text
Research-Based Improvements Review

Research / domain source:
What changed or improved:
Suggested additions:
Suggested simplifications:
Suggested deferrals:
Suggested exclusions:
Risks if ignored:
Needs user decision:
Tera recommendation:
User decision:
```

---

## 15. Phased Application Roadmap

Use before execution planning.

```text
Phased Application Roadmap

Phase 1 / MVP:
  Core (Phase 1A):
  - ...
  Extended (Phase 1B):
  - ...

Phase 2:
- ...

Phase 3:
- ...

Later / Enterprise:
- ...

Out of scope:
- ...

Needs user decision:
- ...

Approval status: Pending / Approved / Needs Revision
```

---

## 16. Final Discovery Approval Summary

```text
Final Discovery Approval Summary

Application understanding: Approved / Needs Revision
Project inputs documented: Yes / No
Domain Intelligence applied: Yes / No / Not Needed
Research-based changes reviewed with user: Yes / No / Not Needed
Phased roadmap approved: Yes / No
Remaining open questions:
Approved next mode: Project Preparation / Continue Discovery / Blocked
```

---

## 17. Project Readiness Summary

Use after discovery, optional Domain Intelligence, and phased roadmap drafting, before moving into project preparation or execution planning.

```text
Project Readiness Summary

Application understanding:
Confirmed by user: Yes / No
Feature classification completed: Yes / No
Project inputs documented: Yes / No
Materially important chat-only information remaining: Yes / No
Domain Intelligence status: Completed / Not Needed / Deferred
Research-based improvements reviewed: Yes / No / Not Needed
Approved MVP scope (Core + Extended):
Approved later phases:
Out-of-scope items:
Open questions:
Risks:
Next step:
User approval required: Yes / No
```

---

## 18. Client Question Set

Use when Majed needs questions to forward to the client.

```text
Client Question Set

Purpose:
Questions to send to the client:
1. ...
2. ...
3. ...

Why these questions matter:
Expected next step after answers:
```

---

## 19. Client Profile Template

```text
# Client Profile

Client name:
Client type: Individual / Company / Organization / Unknown
Business domain:
Default client-facing language: Arabic
Technical familiarity: Low / Medium / High / Unknown
Decision style:
Communication notes:
Project sensitivity: Low / Medium / High / Critical
Preferred approval method:
General notes:
```

---

## 20. Client Contacts Template

```text
# Client Contacts

| Name | Role | Decision Authority | Phone | Email | Preferred Channel | Approval Authority | Notes |
|---|---|---|---|---|---|---|---|
|  |  | Decision maker / Reviewer / Technical / Finance / Other |  |  |  | Yes / No / Unknown |  |
```

---

## 21. Client Approval Package Checklist

```text
Client Approval Package Checklist

Client:
Application:
Package path:

Required files:
- 01_CLIENT_PROJECT_BRIEF.md: Present / Missing / Not applicable with reason
- 02_CLIENT_PROPOSAL.md: Present / Missing / Not applicable with reason
- 03_SCOPE_OF_WORK.md: Present / Missing / Not applicable with reason
- 04_FEATURE_SCOPE_MATRIX.md: Present / Missing / Not applicable with reason
- 05_USER_FLOWS.md: Present / Missing / Not applicable with reason
- 06_SCREEN_MAP.md: Present / Missing / Not applicable with reason
- 07_DESIGN_DIRECTION.md: Present / Missing / Not applicable with reason
- 08_PROTOTYPE_PLAN.md: Present / Missing / Not applicable with reason
- 09_ACCEPTANCE_CRITERIA.md: Present / Missing / Not applicable with reason
- 10_CLIENT_APPROVAL_RECORD.md: Present / Missing
- 11_CHANGE_CONTROL.md: Present / Missing

Approval gates:
- Idea Approval: Approved / Pending / Needs Revision
- Scope Approval: Approved / Pending / Needs Revision
- Flow Approval: Approved / Pending / Needs Revision
- Screen Approval: Approved / Pending / Needs Revision
- Design Direction Approval: Approved / Pending / Needs Revision
- Prototype Approval: Approved / Pending / Not Applicable / Needs Revision
- Execution Authorization: Approved / Pending / Blocked

Build Mode allowed: Yes / No
Reason:
```

---

## 22. Client Approval Record

```text
# Client Approval Record

Client:
Application:
Approval date:
Approving contact:
Approval authority: Confirmed / Unknown / User-confirmed

Approved documents:
- ...

Approval gates:
| Gate | Status | Notes |
|---|---|---|
| Idea Approval |  |  |
| Scope Approval |  |  |
| Flow Approval |  |  |
| Screen Approval |  |  |
| Design Direction Approval |  |  |
| Prototype Approval |  |  |
| Execution Authorization |  |  |

Pending decisions:
Rejected or deferred items:
Execution authorization status: Approved / Pending / Blocked
```

---

## 23. Client Change Request Record

```text
Change Request

Change ID:
Date:
Requester:
Request summary:
Affected approved file or gate:
Classification: Clarification / Minor Adjustment / Enhancement / New Scope / Phase 2 / Rejected
Scope impact:
Design impact:
Technical impact:
Time/cost impact if known:
Decision: Approve / Defer / Reject / Needs Client Decision
Approval authority:
Related task or issue:
```

---

## 24. Client Decision Needed

```text
Client Decision Needed

Decision topic:
Why it matters:
Options:
1. ...
2. ...
3. ...

Tera recommendation:
Impact if delayed:
Can implementation continue without this decision? Yes / No
```

---

## 25. Client Approval File Outlines

Use these outlines when creating files under `clients/.../client-approval/`. Client-facing content is Arabic by default.

### 25.1 `01_CLIENT_PROJECT_BRIEF.md`

```text
# ملخص فكرة المشروع

اسم العميل:
اسم التطبيق:
وصف مختصر للمشروع:
المشكلة التي يحلها:
المستخدمون المستهدفون:
الأهداف الرئيسية:
القيمة المتوقعة للعميل:
حدود النسخة الأولى:
ملاحظات أو قرارات معلقة:
حالة الاعتماد:
```

### 25.2 `02_CLIENT_PROPOSAL.md`

```text
# عرض مشروع

مقدمة:
فهمنا لاحتياج العميل:
نطاق العمل المقترح:
المخرجات المتوقعة:
مراحل العمل:
ما هو خارج النطاق:
الافتراضات:
المتطلبات من العميل:
آلية الاعتماد والتغييرات:
حالة الاعتماد:
```

### 25.3 `03_SCOPE_OF_WORK.md`

```text
# نطاق العمل

داخل النطاق:
- ...

خارج النطاق:
- ...

مؤجل لمرحلة لاحقة:
- ...

قيود مهمة:
افتراضات:
قرارات معلقة:
حالة الاعتماد:
```

### 25.4 `04_FEATURE_SCOPE_MATRIX.md`

```text
# مصفوفة نطاق الميزات

| الميزة | التصنيف | الأولوية | الملاحظات |
|---|---|---|---|
|  | داخل النطاق / مؤجل / خارج النطاق / يحتاج قرار | عالية / متوسطة / منخفضة |  |

حالة الاعتماد:
```

### 25.5 `05_USER_FLOWS.md`

```text
# مسارات الاستخدام

## المسار الأول: [الاسم]

المستخدم:
الهدف:
الخطوات:
1. ...

الحالات البديلة:
النتيجة المتوقعة:

حالة الاعتماد:
```

### 25.6 `06_SCREEN_MAP.md`

```text
# خريطة الشاشات

| الشاشة | الغرض | المستخدمون | ملاحظات |
|---|---|---|---|
|  |  |  |  |

شاشات غير مطلوبة في النسخة الأولى:
حالة الاعتماد:
```

### 25.7 `07_DESIGN_DIRECTION.md`

```text
# التوجه البصري

اللغة والأسلوب العام:
الألوان أو الهوية:
مراجع تعجب العميل:
مراجع لا تعجب العميل:
انطباع التصميم المطلوب: رسمي / حديث / بسيط / فاخر / شبابي / آخر
قيود التصميم:
ما لا يجب استخدامه:
حالة الاعتماد:
```

### 25.8 `08_PROTOTYPE_PLAN.md`

```text
# خطة البروتوتايب

هل البروتوتايب مطلوب؟ نعم / لا
سبب القرار:
الشاشات أو التدفقات التي يجب تمثيلها:
مستوى التفصيل: منخفض / متوسط / عالي
الأداة المقترحة إن وجدت:
معايير قبول البروتوتايب:
حالة الاعتماد:
```

### 25.9 `09_ACCEPTANCE_CRITERIA.md`

```text
# معايير القبول

| الميزة أو الشاشة | معيار القبول | طريقة التحقق | الحالة |
|---|---|---|---|
|  |  |  | مقبول / يحتاج تعديل / معلق |

معايير قبول عامة:
معايير لا تعتبر ضمن التسليم الحالي:
حالة الاعتماد:
```

### 25.10 `11_CHANGE_CONTROL.md`

```text
# سجل طلبات التغيير

| Change ID | التاريخ | مقدم الطلب | الملخص | التصنيف | القرار | حالة الاعتماد |
|---|---|---|---|---|---|---|
| CHG-001 |  |  |  | Clarification / Minor Adjustment / Enhancement / New Scope / Phase 2 / Rejected |  |  |

ملاحظات عامة:
```

---

## 26. Client-Facing Application Proposal

This is not a text template but an **HTML document**. The proposal is generated as a self-contained HTML page with embedded CSS for professional presentation, RTL support, and print optimization.

Reference file: `tera-workshop/APPLICATION_PROPOSAL_TEMPLATE.html`

After the Client Discovery + Smart Interview process completes, Tera populates the template with:
- Application name, date, client name
- Problem and solution description
- Users, roles, and permissions
- Core MVP features and out-of-scope items
- Requirements by domain (functional, technical, data, design, security, ops)
- Assumptions table with status
- Proposed roadmap phases
- Approval section

The generated proposal is saved to:
- `clients/.../client-approval/` (external clients)
- `project-inputs/` (internal projects)

See `TERA_RUNTIME_PROTOCOLS.md` Section 18, Phase 7 for the protocol.

---

## 27. Project Preparation Plan (Phase 3 Output)

This template is used for the formal output of Phase 3 (Project Preparation Planning).
The generated file is saved to `project-control/PREPARATION_PLAN.md`.

```markdown
# PREPARATION_PLAN.md

## 1. Preparation Decision

Decision: Proceed / Blocked / Needs More Intake

> Reference: `project-preparation/TERA_PROJECT_DECISION.md`

## 2. Required Preparation Files

| File | Required | Reason | Owner Agent | Order |
|---|---|---|---|---|
| `01_PROJECT_BRIEF.md` | Yes | Core understanding | RequirementsScopeAgent | 1 |
| `02_SCOPE_AND_BOUNDARIES.md` | Yes | Scope discipline | RequirementsScopeAgent | 2 |
| `03_MODULES_AND_FEATURES.md` | Conditional | Medium+ projects | RequirementsScopeAgent | 3 |
| ... | ... | ... | ... | ... |

### Classification Key

| Label | Meaning |
|---|---|
| **Required** | Must be created now |
| **Conditional** | Create only if the trigger condition is met |
| **Deferred** | Postponed to a later phase |
| **Not Required** | Not needed for this project |

## 3. Deferred Files

| File | Reason | Trigger for Activation |
|---|---|---|
| `14_INTEGRATIONS_...` | No external services yet | When integration is confirmed |
| `22_DEPLOYMENT_...` | Deployment not imminent | Before first deployment |
| ... | ... | ... |

## 4. Not Required Files

| File | Reason |
|---|---|
| `23_BACKUP_AND_RECOVERY.md` | Internal prototype, no production data |
| `34_COMPLIANCE_...` | No regulatory requirements |
| ... | ... |

## 5. Suggested Sub-Agents

| Agent | Needed Now | Reason |
|---|---|---|
| `RequirementsScopeAgent` | Yes | Core scope files (01, 02, 03, 04) |
| `BusinessWorkflowAgent` | Conditional | Only if workflows are complex |
| `DataDesignAgent` | Conditional | Only if data model is non-trivial |
| `UIUXStructureAgent` | Conditional | Only if screens need structured definition |
| `SolutionArchitectureAgent` | Conditional | Only if architecture decisions are risky |
| ... | ... | ... |

## 6. Preparation Sequence

```
Batch A (no dependencies):
  01_PROJECT_BRIEF.md (RequirementsScopeAgent)
  08_TECHNICAL_ARCHITECTURE.md (SolutionArchitectureAgent or Tera)

Batch B (depends on Batch A):
  02_SCOPE_AND_BOUNDARIES.md (RequirementsScopeAgent)
  04_USERS_ROLES_PERMISSIONS.md (RequirementsScopeAgent)

Batch C (depends on Batch B):
  05_BUSINESS_WORKFLOWS.md (BusinessWorkflowAgent)
  07_SCREENS_AND_UI_STRUCTURE.md (UIUXStructureAgent)

Batch D (depends on Batch C):
  06_DATA_MODEL_PREPARATION.md (DataDesignAgent)
  09_IMPLEMENTATION_PLAN.md (Tera)
```

## 7. User Approval Points

| Point | What Needs Approval | Before Moving To |
|---|---|---|
| P1 | This plan (Preparation Decision) | Phase 4: Sub-Agent Generation & Preparation Delegation |
| P2 | Scope and boundaries (02) | File creation for downstream files |
| P3 | Technical architecture (08) | Implementation planning |
| P4 | Implementation plan (09) | Phase 5: Execution Planning |

> **Rule:** No file creation happens in Phase 3. No agent generation happens before this plan is approved.

## 8. Approval Status

- [ ] Plan submitted
- [ ] Plan approved → Proceed to Phase 4
- [ ] Plan rejected → Revise and resubmit
- [ ] Plan blocked → Reason: ...
```

---

## 28. Agent Delegation Plan (Phase 4 Output)

This template is used for the formal output of Phase 4 (Sub-Agent Generation & Preparation Delegation).
The generated file is saved to `project-control/AGENT_DELEGATION_PLAN.md`.

```markdown
# AGENT_DELEGATION_PLAN.md

## 1. Delegation Decision

Decision: Proceed / Needs User Approval / Blocked

> Reference: `project-control/PREPARATION_PLAN.md`

## 2. Agents Needed Now

| Agent | Reason | Status | Assigned Files |
|---|---|---|---|
| `RequirementsScopeAgent` | Core scope files (01, 02, 03, 04) | Generate / Use Existing / Specialize | `01_PROJECT_BRIEF.md`, `02_SCOPE_...`, ... |
| `BusinessWorkflowAgent` | Business workflows (05) | Generate / Use Existing / Specialize | `05_BUSINESS_WORKFLOWS.md` |
| ... | ... | ... | ... |

### Agent Status Key

| Status | Meaning |
|---|---|
| **Generate** | Agent does not exist — create from `AGENT_GENERATION_TEMPLATE.md` |
| **Use Existing** | Agent exists and is suitable — use directly |
| **Specialize** | Agent exists but is too generic — narrow sources/targets/constraints |

## 3. Agents Not Needed Now

| Agent | Reason | Defer Until |
|---|---|---|
| `SecurityAgent` | No sensitive data yet | Phase 5 or when auth is implemented |
| `DevOpsDeploymentAgent` | No deployment imminent | Before first deployment |
| ... | ... | ... |

## 4. Agent Generation Actions

| Agent | Action | Output File | Token Budget | Context Rules |
|---|---|---|---|---|
| `RequirementsScopeAgent` | Generate | `generated-agents/opencode/RequirementsScopeAgent.md` | Medium | Task Context |
| `BusinessWorkflowAgent` | Specialize (exists) | Update existing file | Medium | Task Context |
| ... | ... | ... | ... | ... |

## 5. Delegation Map

| Preparation File | Assigned Agent | Allowed Sources | Allowed Write Targets |
|---|---|---|---|
| `01_PROJECT_BRIEF.md` | RequirementsScopeAgent | `00_PROJECT_INPUTS.md`, `01_APPLICATION_IDEA.md` | `project-preparation/01_PROJECT_BRIEF.md` |
| `02_SCOPE_AND_BOUNDARIES.md` | RequirementsScopeAgent | `01_PROJECT_BRIEF.md` | `project-preparation/02_SCOPE_...` |
| `05_BUSINESS_WORKFLOWS.md` | BusinessWorkflowAgent | `02_SCOPE_...`, `04_USERS_ROLES_...` | `project-preparation/05_BUSINESS_...` |
| ... | ... | ... | ... |

## 6. Activation Plan

| Agent | Activate Now? | Reason |
|---|---|---|
| `RequirementsScopeAgent` | Yes | Batch A: core scope files |
| `SolutionArchitectureAgent` | Yes | Batch A: technical architecture (parallel) |
| `BusinessWorkflowAgent` | No | Deferred until Batch C |

## 7. User Approval Points

| Point | What Needs Approval | Before Moving To |
|---|---|---|
| A1 | Agent Generation Plan (this document) | Generating/activating agents |
| A2 | Activating agents in `.opencode/agents/` | Start of delegation |
| A3 | Scope files (01, 02) from first delegation batch | Remaining preparation files |

> **Rules:**
> - No approved PREPARATION_PLAN.md = No Sub-Agent Generation.
> - No generated/approved agent = No delegated preparation file.
> - No active need = No active sub-agent.

## 8. Approval Status

- [ ] Plan submitted
- [ ] Plan approved → Proceed to agent generation
- [ ] Plan rejected → Revise and resubmit
- [ ] Plan blocked → Reason: ...
```

---

## 29. Project Master Plan (Phase 5 — Output)

This template is used for the first formal output of Phase 5 (Execution Planning).
The generated file is saved to `project-control/PROJECT_MASTER_PLAN.md`.

```markdown
# PROJECT_MASTER_PLAN.md

## 1. Plan Metadata

| Item | Value |
|---|---|
| Project | [NAME] |
| Version | 1.0 |
| Status | Draft / Approved / Active |
| Reference | `project-preparation/09_IMPLEMENTATION_PLAN.md` |

## 2. Execution Phases

| Phase | Name | Objective | Depends On | Status |
|---|---|---|---|---|
| 1 | [e.g. Technical Foundation] | [e.g. Scaffold project, init ORM, verify startup] | — | Planned |
| 2 | [e.g. Database Schema] | [e.g. Define models, create migration, seed] | Phase 1 | Planned |
| 3 | [e.g. Core Feature] | [e.g. Main workflow implementation] | Phase 1, 2 | Planned |
| ... | ... | ... | ... | ... |

## 3. Transition Conditions

| From | To | Condition |
|---|---|---|
| Phase 1 | Phase 2 | Project starts, dev env works, ORM connects to DB |
| Phase 2 | Phase 3 | Schema applied, seed data verified |
| ... | ... | ... |

## 4. Design Source Decisions

| Phase / Batch | Design Source | Decided? |
|---|---|---|
| All UI phases | [Tera-Decided / User-Provided / Brand / External / No UI Yet] | Yes / No |
| Phase 3 (UI) | [source] | Yes / No |

> **Rule:** No UI phase/batch without a Design Source Decision.

## 5. Deferred Items

| Item | Reason | Phase |
|---|---|---|
| ... | ... | ... |

## 6. Approval

- [ ] Submitted
- [ ] Approved → Ready for Detailed Planning
- [ ] Needs revision
```

---

## 30. Detailed Execution Plan (Phase 5 — Output)

This template breaks each phase into traceable execution items.
The generated file is saved to `project-control/PROJECT_DETAILED_EXECUTION_PLAN.md`.

```markdown
# PROJECT_DETAILED_EXECUTION_PLAN.md

## 1. Source Reference

- Master Plan: `project-control/PROJECT_MASTER_PLAN.md`
- Implementation Plan: `project-preparation/09_IMPLEMENTATION_PLAN.md`

## 2. Phase Breakdown

### Phase [N]: [Phase Name]

| Item ID | Description | Linked TASK-ID | Depends On | Status | Notes |
|---|---|---|---|---|---|
| P1-01 | [e.g. Scaffold Next.js project] | TASK-COD-001 | — | Planned | |
| P1-02 | [e.g. Init Prisma + connect to DB] | TASK-COD-002 | P1-01 | Planned | See profile: nextjs-prisma |
| P2-01 | [e.g. Define User model] | TASK-COD-003 | P1-02 | Planned | |
| P2-02 | [e.g. Create migration + apply] | TASK-COD-004 | P2-01 | Planned | |
| ... | ... | ... | ... | ... | ... |

### Item Status Legend

| Status | Meaning |
|---|---|
| Planned | Defined, not yet assigned |
| In Progress | Assigned to agent, being executed |
| Completed | Executed and accepted |
| Blocked | Cannot proceed without resolution |
| Deferred | Moved to later phase |

## 3. Approval

- [ ] Submitted
- [ ] Approved → Ready for batch planning
- [ ] Needs revision
```

---

## 31. Execution Batch Plan (Phase 5 — Output)

This template defines the current approved batch only — not the full project.
The generated file is saved to `project-control/EXECUTION_BATCH_PLAN.md`.

```markdown
# EXECUTION_BATCH_PLAN.md

## 1. Batch Metadata

| Item | Value |
|---|---|
| Batch | [Number / Name] |
| Phase | [Phase from Master Plan] |
| Status | Draft / Approved / In Progress / Completed |
| Source Plan | `project-control/PROJECT_DETAILED_EXECUTION_PLAN.md` |

## 2. Included Tasks

| TASK-ID | Description | Assigned Agent | Allowed Write Targets | Pre-Execution Gate |
|---|---|---|---|---|
| TASK-COD-001 | [e.g. Scaffold project] | EngineeringAgent | `.` (project root) | PASS |
| TASK-COD-002 | [e.g. Init ORM + DB] | EngineeringAgent | `prisma/schema.prisma`, `.env.example` | PASS |
| ... | ... | ... | ... | ... |

## 3. Not Included (Deferred to Later Batches)

| Item | Reason | Expected Batch |
|---|---|---|
| Schema design | Depends on scaffold completion | Batch 2 |
| UI components | No Design Source Decision yet | Batch 3 |

## 4. Design Source Decision (for this batch)

- [ ] Tera-Decided Design
- [ ] User-Provided Design Source
- [ ] Existing Brand Guidelines
- [ ] External Reference
- [ ] No UI in this batch

## 5. User Approval

- [ ] Batch plan submitted
- [ ] Approved → Begin execution (Phase 6)
- [ ] Rejected → Revise
- [ ] Blocked → Reason: ...

---

> **Rules:**
> - No Implementation without Execution Plan.
> - No UI Task without Design Source Decision.
> - No TASK-ID without Pre-Execution Gate PASS.
> - No batch execution without user approval.
```
