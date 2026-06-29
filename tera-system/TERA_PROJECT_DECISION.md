# TERA_PROJECT_DECISION.md

# قرار تيرا الأولي للمشروع

> **المرحلة:** 2. Project Decision Formation — مرحلة تكوين قرار المشروع الأولي
>
> **الهدف:** تحويل المدخلات التي جمعها تيرا من العميل إلى قرار واضح: هل نفهم المشروع؟ هل نكمل التحضير أم نحتاج معلومات إضافية؟
>
> **القاعدة الحاكمة:** هذا الملف لا يملأ التفاصيل بدل الملفات الأخرى. هو يقرر ماذا سننشئ، ولمن، وبأي ترتيب — لا يكتب المحتوى التنفيذي بدلهم.

---

## 1. Decision Metadata

| البند | القيمة |
|---|---|
| اسم المشروع | `[PROJECT_NAME]` |
| تاريخ القرار | `[DATE]` |
| أعدّه | Tera Agent |
| حالة القرار | Draft / Pending Approval / Approved / Blocked |
| مرجع العرض المعتمد | `[PROPOSAL_REF]` |
| مرجع المقابلة | `[INTERVIEW_REF]` |

---

## 2. Intake Readiness

| البند | الحالة | المصدر | ملاحظات |
|---|---|---|---|
| Application Idea | Complete / Partial / Missing | `project-inputs/01_APPLICATION_IDEA.md` | `...` |
| Technical Context | Complete / Partial / Missing | `project-inputs/02_TECHNICAL_CONTEXT.md` | `...` |
| Technology Profile Candidate | Found / Missing / Unclear | `tera-system/profiles/` | `...` |
| **هل يمكن تكوين قرار أولي؟** | **Yes / Partial / No** | | **`...`** |

### معنى كل حالة

| الحالة | المعنى |
|---|---|
| **Complete** | يمكن تكوين قرار مشروع أولي والمتابعة إلى الإعداد |
| **Partial** | يمكن تكوين قرار جزئي مع أسئلة مفتوحة للعميل |
| **Missing** | لا يجوز المتابعة — يجب الرجوع للعميل قبل أي خطوة |

---

## 3. Project Understanding Summary

*وصف مختصر (3-5 أسطر) لما فهمه تيرا عن المشروع: المشكلة، الحل المقترح، المخرجات المتوقعة.*

```
[PROJECT_UNDERSTANDING_SUMMARY]
```

---

## 4. Project Type Classification

| البند | التصنيف | السبب |
|---|---|---|
| **نوع المشروع** | Web App / SaaS / ERP Module / Mobile App / API Backend / Automation Tool / Admin Panel / Internal System / MVP / Landing Page / Other | `[REASON]` |
| **حجم المشروع** | Tiny / Small MVP / Medium / Large | `[REASON]` |
| **مستوى التعقيد** | Low / Medium / High | `[REASON]` |
| **مستوى التوثيق المطلوب** | Minimal / Standard / Comprehensive | `[REASON]` |

### تعريفات الحجم

| الحجم | المعنى |
|---|---|
| **Tiny** | أداة بسيطة أو شاشة/وظيفة واحدة |
| **Small MVP** | تطبيق صغير بعدة شاشات، أدوار محدودة، قاعدة بيانات بسيطة |
| **Medium** | عدة موديولات، صلاحيات، وبيانات، تكاملات محدودة |
| **Large** | نظام واسع أو ERP أو تكاملات كثيرة |

---

## 5. Initial Scope Direction

*هذا ليس Scope تفصيلي — بل الصورة العامة لتوجيه مرحلة الإعداد.*

### داخل النطاق مبدئياً (In Scope)

- `[IN_SCOPE_1]`
- `[IN_SCOPE_2]`
- `[IN_SCOPE_3]`

### خارج النطاق مبدئياً (Out of Scope)

- `[OUT_SCOPE_1]`
- `[OUT_SCOPE_2]`

### مؤجل حالياً (Deferred)

- `[DEFERRED_1]`
- `[DEFERRED_2]`

---

## 6. Technology Understanding

| المجال | القيمة | المصدر | الحالة |
|---|---|---|---|
| لغة البرمجة | `[LANGUAGE]` | `02_TECHNICAL_CONTEXT.md` | Confirmed / Missing |
| الإطار (Framework) | `[FRAMEWORK]` | `02_TECHNICAL_CONTEXT.md` | Confirmed / Missing |
| قاعدة البيانات | `[DATABASE]` | `02_TECHNICAL_CONTEXT.md` | Confirmed / Missing |
| ORM / Data Access | `[ORM]` | `02_TECHNICAL_CONTEXT.md` | Confirmed / Missing |
| الواجهة الأمامية | `[FRONTEND]` | `02_TECHNICAL_CONTEXT.md` | Confirmed / Missing |
| الاستضافة | `[HOSTING]` | `02_TECHNICAL_CONTEXT.md` | Confirmed / Missing |
| Technology Profile | `[PROFILE_NAME]` | `tera-system/profiles/` | Found / Missing / Needs Creation |

### حالات Technology Profile

| الحالة | الإجراء |
|---|---|
| **Found** | يسجّل كـ Candidate، يُفعّل بعد اعتماد الخطة التنفيذية |
| **Missing** | لا يبدأ التنفيذ — يُنشئ Profile مسودة قبل التخطيط |
| **Unclear** | يسأل المستخدم قبل أي خطوة تنفيذية |

---

## 7. Client Readiness (للعملاء الخارجيين)

*للعملاء الداخليين: Ikhtiyar / N/A*

| البند | الحالة | المصدر | ملاحظات |
|---|---|---|---|
| Client Profile | Complete / Partial / Missing / N/A | `clients/CLIENT-*/CLIENT_PROFILE.md` | `...` |
| Client Contacts | Complete / Partial / Missing / N/A | `clients/CLIENT-*/CONTACTS.md` | `...` |
| Approval Authority | Confirmed / Unknown / N/A | `CONTACTS.md` | `...` |
| Client Approval Package | Complete / Draft / Missing / N/A | `clients/.../client-approval/` | `...` |
| Execution Authorization | Approved / Pending / Blocked / N/A | `10_CLIENT_APPROVAL_RECORD.md` | `...` |

---

## 8. Required Preparation Files

*يُحدد بناءً على تصنيف المشروع وحجمه. المصدر: `tera-system/Tera_Project_Preparation_Files.md`*

### مطلوب (Required)

| الملف | السبب | العميل الفرعي المتوقع |
|---|---|---|
| `01_PROJECT_BRIEF.md` | `[REASON]` | `RequirementsScopeAgent` |
| `02_SCOPE_AND_BOUNDARIES.md` | `[REASON]` | `RequirementsScopeAgent` |
| `03_MODULES_AND_FEATURES.md` | `[REASON]` | `RequirementsScopeAgent` |
| ... | ... | ... |

### اختياري (Optional)

| الملف | شرط التفعيل |
|---|---|
| `...` | `...` |

### مؤجل (Deferred)

| الملف | سبب التأجيل |
|---|---|
| `...` | `...` |

### غير مطلوب (Not Required)

| الملف | السبب |
|---|---|
| `...` | `...` |

---

## 9. Suggested Sub-Agents

| العميل الفرعي | الحاجة | متى؟ | السبب |
|---|---|---|---|
| `RequirementsScopeAgent` | Required / Optional / Not Needed | الإعداد | `[REASON]` |
| `BusinessWorkflowAgent` | Required / Optional / Not Needed | الإعداد | `[REASON]` |
| `DataDesignAgent` | Required / Optional / Not Needed | الإعداد | `[REASON]` |
| `UIUXStructureAgent` | Required / Optional / Not Needed | الإعداد | `[REASON]` |
| `SolutionArchitectureAgent` | Required / Optional / Not Needed | الإعداد | `[REASON]` |
| `SecurityAgent` | Required / Optional / Not Needed | حسب الحساسية | `[REASON]` |
| `IntegrationAgent` | Required / Optional / Not Needed | حسب التكاملات | `[REASON]` |
| `DevOpsDeploymentAgent` | Required / Optional / Not Needed | حسب الحاجة | `[REASON]` |

---

## 10. Initial Risks / Gaps

| الفجوة / الخطر | الخطورة | الإجراء |
|---|---|---|
| `[GAP_1]` | Low / Medium / High | Ask user / Defer / Document |
| `[GAP_2]` | Low / Medium / High | Ask user / Defer / Document |
| `[GAP_3]` | Low / Medium / High | Ask user / Defer / Document |

---

## 11. Model Tier & Token Policy

### Model Tier Plan

| المرحلة / نوع العمل | المستوى الموصى به | المستوى الأدنى المقبول | موافقة مسبقة؟ | السبب |
|---|---|---|---|---|
| Discovery / Intake | Medium | Light | No | جمع وفهم أولي |
| Scope / Requirements | Medium | Medium | No | يحتاج اتساقاً |
| Technical Architecture | Strong | Medium | Yes if high risk | قرارات معمارية |
| UI Structure | Medium | Light | No | نطاق محدود |
| Data Model | Strong | Medium | Yes if complex | يؤثر على العلاقات |
| Implementation Task | Medium | Medium | Depends | توازن بين الدقة والتكلفة |
| Security-Sensitive Task | Strong | Strong | Yes | لا يسمح بمستوى ضعيف |
| Simple Formatting / Docs | Light | Light | No | لا يحتاج استدلالاً عميقاً |
| Broad Review | Strong | Medium | Yes if broad | يحتاج ربطاً واسعاً |

### Token & Context Policy

| البند | القرار |
|---|---|
| مستوى حساسية التوكنز | Low / Medium / High / Critical |
| نوع السياق الافتراضي | Task Context / Summary Context / Full Context |
| هل يلزم `PROJECT_STATE.md`؟ | Yes / No |
| هل توجد مهام تحتاج موافقة تكلفة؟ | Yes / No |
| وضع التشغيل الافتراضي | Plan Mode |
| هل يسمح بـ Build Mode الآن؟ | No / Yes (مع سبب) |

---

## 12. Tera Decision

```
Decision: [PROCEED / ASK_MORE / CREATE_PROFILE / STOP]

Proceed to Project Preparation:
  - المدخلات كافية والتصنيف واضح.
  - Technology Profile candidate موجود.
  - التالي: إنشاء 00_PROJECT_INPUTS.md ثم بدء ملفات الإعداد المطلوبة.

أو:

Ask More Intake Questions:
  - المدخلات غير كافية في [المجال].
  - لا يمكن تحديد Technology Profile بأمان.
  - التالي: سؤال المستخدم في [نقاط محددة].

أو:

Create Missing Technology Profile:
  - الفكرة واضحة لكن لا يوجد Technology Profile مناسب.
  - التالي: إنشاء Profile مسودة قبل التخطيط التنفيذي.

أو:

Stop / Waiting for User:
  - السبب: ...
  - التالي: ...
```

---

## 13. Post-Decision Protocol

عند اعتماد القرار:

1. يُنشئ Tera `00_PROJECT_INPUTS.md` في `project-preparation/` (إن لم يوجد).
2. يُسجل قرار المشروع في `project-control/PROJECT_STATE.md`.
3. يُسجل حدث في `project-control/PROJECT_ACTIVITY_LOG.md`.
4. يُنشئ أول `TASK-ID` لتفويض `RequirementsScopeAgent` لإنتاج ملفات النطاق الأساسية:

```text
Task ID: TERA-REQ-001
Requested Agent: RequirementsScopeAgent
Stage: Scope Confirmation
Objective: إنتاج ملفات النطاق الأساسية (01, 02, 04 عند الحاجة)
Reference Files:
  - project-preparation/00_PROJECT_INPUTS.md
  - project-preparation/TERA_PROJECT_DECISION.md
  - project-preparation/PROJECT_RULES.md (إن وجد)
Allowed Write Targets:
  - project-preparation/01_PROJECT_BRIEF.md
  - project-preparation/02_SCOPE_AND_BOUNDARIES.md
  - project-preparation/04_USERS_ROLES_PERMISSIONS.md (عند الحاجة)
Constraints:
  - الالتزام بنطاق القرار الأولي
  - لا إضافة ميزات أو شاشات أو عوامل خارج المرحلة المعتمدة
  - لا بدء تخطيط تنفيذي
Return Status: Done / Blocked / Needs Clarification / Rework Needed
```

5. بعد تسليم النتيجة، يراجع Tera ويقرر: قبول / رفض / إعادة / طلب قرار من صاحب المشروع.
6. لا يُنتقل إلى `03_MODULES_AND_FEATURES.md` أو `09_IMPLEMENTATION_PLAN.md` إلا بعد قبول مخرجات النطاق الأساسية.
7. للمشاريع الخارجية: لا يُنتقل إلى التنفيذ البرمجي إلا بعد اكتمال حزمة اعتماد العميل.
