# IMPLEMENTATION_AGENT_STRATEGY.md
## CockingApp — استراتيجية العملاء للتنفيذ

| Metadata | |
|----------|-|
| **Phase** | 5.1 — Implementation Agent Strategy Gate |
| **Status** | ✅ Approved v1 — Option B |
| **Required Before** | Phase 6 / Build Mode / Any `TASK-COD-*` delegation |
| **Created By** | Tera Agent |
| **Date** | 2026-06-30 |
| **System Rule** | `TeraAgent.md` Section 5.1 |

---

## 1. Executive Decision

بناءً على القاعدة النظامية الجديدة، لا يجوز الانتقال إلى التنفيذ البرمجي اعتماداً على عميل واحد عام لكل العمل، ولا يجوز تنفيذ Tera للكود مباشرة إلا باستثناء موثق ومحدود جداً.

**القرار المقترح:**

```text
استخدام استراتيجية عملاء متعددة ومحدودة الصلاحية، مع تفعيل تدريجي حسب الدفعات.
```

---

## 2. تصحيح قرار سابق

في `PROJECT_MASTER_PLAN.md` توجد عبارة:

```text
طريقة التنفيذ: مباشر بواسطة Tera (بدون Sub-Agents)
```

هذه العبارة كانت صحيحة وقت كتابتها وفق القواعد السابقة، لكنها الآن **Superseded** بسبب تحديث Section 5.1.

**التصحيح المعتمد في هذه الاستراتيجية:**

```text
Tera يدير، يجهز، يراجع، ويقبل.
العملاء التنفيذيون المتخصصون ينفذون الكود ضمن TASK-COD محدد.
```

---

## 3. السؤال الإلزامي 1 — Agent: من نحتاج الآن؟

### العملاء المطلوبون للدفعات الأولى B1–B3

| Agent | القرار | الدفعات | السبب | الصلاحية |
|-------|--------|---------|-------|----------|
| **FoundationEngineeringAgent** | Required Now | B1 | Scaffold، إعداد مشروع Next.js، Prisma basic، `.env.example` | WRITE_CODE محدود |
| **DataPrismaAgent** | Required Next | B2 | Prisma schema كامل والعلاقات والـ enum | WRITE_CODE محدود بملفات Prisma |
| **FrontendFoundationAgent** | Required Next | B3 | Tailwind، RTL، UI primitives، ألوان Claude | WRITE_CODE محدود بملفات UI/Foundation |
| **ProjectControlAgent** | Optional / Tera handles now | B1–B3 | تحديث السجلات يمكن أن يديره Tera في البداية لتقليل overhead | WRITE_CONTROL إذا فُعّل |

### حالة العميل الذي تم إنشاؤه سابقاً

| Existing Agent | الحالة | القرار |
|----------------|--------|--------|
| `cockingapp-engineering` | Generated + Activated before this strategy | **Do not use until this strategy is approved.** بعد الاعتماد يمكن تضييق دوره ليعمل كـ FoundationEngineeringAgent فقط لـ `TASK-COD-001`، أو استبداله بعميل أكثر تخصصاً. |

---

## 4. السؤال الإلزامي 2 — Agent: من نؤجل؟

| Agent | يؤجل إلى | سبب التأجيل |
|-------|----------|-------------|
| **BackendAPIAgent** | B4–B6 | لا نحتاج API CRUD قبل اكتمال foundation + schema |
| **AdminCrudAgent** | B4–B6 | إدارة التصنيفات والمكونات والوصفات تبدأ بعد schema و UI primitives |
| **FrontendPublicAgent** | B7–B8 | صفحات الجمهور تعتمد على CRUD والبيانات والصور |
| **SecurityAgent** | B9 / TASK-COD-011 | Auth/JWT/Cookies/Middleware تبدأ في TASK-COD-011؛ قبلها لا حاجة أمنية عالية |
| **QAAndAcceptanceAgent** | بعد B3 ثم بعد B6 ثم B10 | مراجعة مستقلة عند نقاط checkpoint، وليس لكل scaffold بسيط |
| **DevOpsDeploymentAgent** | Phase 7 أو عند نشر فعلي | لا نشر أو production الآن |
| **DocumentationHandoverAgent** | Phase 7 | التسليم لاحقاً بعد اكتمال التنفيذ |
| **PerformanceAgent** | عند ظهور مشكلة أداء | المشروع متوسط ولا توجد SLA حالية |

---

## 5. السؤال الإلزامي 3 — Who writes: من ينفذ؟

| TASK-ID | الدفعة | التنفيذ المقترح | ملاحظات |
|---------|-------|----------------|---------|
| TASK-COD-001 | B1 | FoundationEngineeringAgent | Scaffold فقط، لا models، لا migrations، لا UI/Auth/API |
| TASK-COD-002 | B2 | DataPrismaAgent | Prisma schema فقط، لا UI/API |
| TASK-COD-003 | B3 | FrontendFoundationAgent | UI primitives + Tailwind + RTL فقط |
| TASK-COD-004 | B4 | BackendAPIAgent + AdminCrudAgent | Categories CRUD؛ الكاتب الأساسي يحدد في task file |
| TASK-COD-005 | B4 | BackendAPIAgent + AdminCrudAgent | Ingredients CRUD |
| TASK-COD-006 | B5 | AdminCrudAgent | Recipes CRUD / RecipeForm |
| TASK-COD-007 | B6 | BackendAPIAgent + FrontendFoundationAgent | Image upload + gallery |
| TASK-COD-008 | B7 | FrontendPublicAgent | Public home/categories |
| TASK-COD-009 | B8 | FrontendPublicAgent | Recipe detail page |
| TASK-COD-010 | B9 | AdminCrudAgent | Dashboard |
| TASK-COD-011 | B9 | SecurityAgent + BackendAPIAgent | Auth + Middleware |
| TASK-COD-012 | B10 | BackendAPIAgent + FrontendPublicAgent | Search |
| TASK-COD-013 | B11 | BackendAPIAgent + AdminCrudAgent + FrontendPublicAgent | Comments workflow |
| TASK-COD-014 | B12 | BackendAPIAgent | PDF export |
| TASK-COD-015 | B12 | FrontendPublicAgent | Scaler client component |
| TASK-COD-016 | B13 | AdminCrudAgent + FrontendPublicAgent | Time fields + filter |
| TASK-COD-017 | B14 | FrontendPublicAgent | Shopping list LocalStorage |
| TASK-COD-018 | B14 | FrontendPublicAgent | Favorites LocalStorage |

**قاعدة الكاتب الأساسي:** كل `TASK-COD-*` يجب أن يحدد Writer واحداً فقط. إذا احتاجت المهمة أكثر من اختصاص، يجب تقسيمها أو تحديد Agent واحد ككاتب والآخر كمراجع.

---

## 6. السؤال الإلزامي 4 — Who reviews: من يراجع؟

| نوع المهمة | المراجع الأساسي | مراجعة مستقلة مطلوبة؟ | السبب |
|------------|----------------|------------------------|-------|
| Scaffold / Config | Tera | لا غالباً | Tera يراجع الملفات والآثار الجانبية مباشرة |
| Prisma Schema | Tera + DataPrismaAgent self-report غير كافٍ | QA optional | يجب مراجعة schema فعلياً بواسطة Tera |
| UI / Frontend | Tera + QAAndAcceptanceAgent عند الحاجة | نعم في B7/B8 وما بعدها | UI Acceptance Gate مهم |
| Auth / JWT / Middleware | Tera + SecurityAgent | نعم إلزامي | High Security Sensitivity |
| CRUD/API | Tera | QA optional بعد B6 | Data mutations تحتاج review دقيق |
| Project-control records | Tera أو ProjectControlAgent | ProjectControlAgent عند كثافة السجلات | منع تناقض task/status/log |
| Final acceptance | Tera + QAAndAcceptanceAgent | نعم قبل Phase 7 | قبول نهائي |

---

## 7. السؤال الإلزامي 5 — Activation plan: متى يُفعّل كل عميل وبأي صلاحيات؟

| Agent | تفعيل | صلاحية | Allowed Write Targets الافتراضية | ملاحظات |
|-------|-------|---------|----------------------------------|---------|
| FoundationEngineeringAgent | الآن بعد اعتماد هذه الاستراتيجية | WRITE_CODE | `cocking-app/**` ضمن TASK-COD-001 فقط | يمكن استخدام `cockingapp-engineering` الحالي بعد تضييقه أو استبداله |
| DataPrismaAgent | قبل TASK-COD-002 | WRITE_CODE | `cocking-app/prisma/schema.prisma` فقط | لا migrations إلا إذا TASK منفصل |
| FrontendFoundationAgent | قبل TASK-COD-003 | WRITE_CODE | `cocking-app/src/components/ui/**`, `tailwind.config.*`, layout/globals | يلتزم بـ `28_UI_UX_GUIDELINES.md` |
| BackendAPIAgent | قبل B4 | WRITE_CODE | `cocking-app/src/app/api/**`, `cocking-app/src/lib/**` حسب TASK | لا Auth قبل TASK-COD-011 |
| AdminCrudAgent | قبل B4 | WRITE_CODE | `cocking-app/src/app/admin/**`, components/admin حسب TASK | لا يكتب API إذا لم يصرح |
| FrontendPublicAgent | قبل B7 | WRITE_CODE | `cocking-app/src/app/(public paths)/**`, components/public | UI Acceptance Gate |
| SecurityAgent | قبل TASK-COD-011 | READ_ONLY / WRITE_DOCS findings | لا يكتب كود افتراضياً | يراجع Auth/JWT/Middleware |
| QAAndAcceptanceAgent | بعد B3/B6/B10 وبشكل إلزامي قبل Phase 7 | RUN_TESTS | test/report outputs فقط إذا فُوّض | لا يكتب كود تطبيق |
| ProjectControlAgent | عند الحاجة بعد تعدد TASKs | WRITE_CONTROL | `project-control/**` فقط | لا يقبل/يغلق مهام دون قرار Tera |
| DevOpsDeploymentAgent | Phase 7 / deployment | WRITE_CODE أو DEPLOY_WITH_APPROVAL | deployment files only | كل نشر يحتاج موافقة منفصلة |
| DocumentationHandoverAgent | Phase 7 | WRITE_DOCS | `delivery/**`, docs handover | لاحق |

---

## 8. السؤال الإلزامي 6 — Exceptions: هل يوجد استثناء للتنفيذ المباشر؟

| الحالة | القرار |
|--------|--------|
| هل ينفذ Tera كود التطبيق مباشرة؟ | **No** |
| هل توجد استثناءات حالية؟ | **No implementation exception** |
| ما الذي ينفذه Tera مباشرة؟ | ملفات التحكم، task files، logs، الاستراتيجية، Pre/Post Review فقط |
| لماذا؟ | لأن القاعدة الجديدة تمنع Build Mode أو EngineeringAgent دون استراتيجية، وتفصل بين إدارة Tera والتنفيذ البرمجي |

---

## 9. توصية إنشاء/تعديل العملاء

### الإجراء المقترح بعد اعتماد هذه الاستراتيجية

1. **لا نستخدم `cockingapp-engineering` الحالي مباشرة باسمه العام إلا بعد قرار تضييق.**
2. نقرر أحد خيارين:
   - **Option A (أسرع):** تعديل/تضييق `cockingapp-engineering` ليصبح FoundationEngineeringAgent لـ TASK-COD-001 فقط.
   - **Option B (أنظف):** إنشاء Agent جديد باسم `cockingapp-foundation-engineering` وتعطيل/ترك agent القديم غير مستخدم.
3. قبل B2 ننشئ `cockingapp-data-prisma`.
4. قبل B3 ننشئ `cockingapp-frontend-foundation`.
5. لا ننشئ كل العملاء دفعة واحدة؛ ننشئهم عند قرب أول استخدام لهم، لكن ضمن هذه الاستراتيجية المعتمدة.

**توصية Tera:** Option B أنظف وأقل التباساً، لكنه يحتاج إعادة تشغيل OpenCode بعد التفعيل. Option A أسرع لكنه يحمل اسماً عاماً قد يسبب توسعاً لاحقاً.

---

## 10. Current Batch Decision — B1

| Field | Decision |
|-------|----------|
| Batch | B1 |
| TASK-ID | TASK-COD-001 |
| Required Agent | FoundationEngineeringAgent |
| Reviewer | Tera direct physical review |
| SecurityAgent | Not required — no Auth/API/secrets beyond `.env.example` placeholders |
| QAAgent | Not required for B1; optional after B3 |
| ProjectControlAgent | Not required; Tera records task/log/state |
| Build Mode | Remains blocked until this strategy is approved |

---

## 11. Approval

| Role | Status |
|------|--------|
| Prepared by | Tera Agent |
| Reviewed by | Tera Agent ✅ |
| Approved by | Majed ✅ — Option B |

### Approval Options

| Option | Meaning |
|--------|---------|
| **Approve Option A** | Use existing `cockingapp-engineering` after narrowing it to FoundationEngineeringAgent for TASK-COD-001 |
| **Approve Option B (Recommended)** | Create a new `cockingapp-foundation-engineering` agent and do not use the old generic agent |
| **Request Changes** | Modify agent split, timing, or review responsibilities |

---

## 12. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | Initial Implementation Agent Strategy required by updated system rules |
| v1.1 | 2026-06-30 | Tera | User approved Option B: create dedicated `cockingapp-foundation-engineering` and do not use generic `cockingapp-engineering` |
