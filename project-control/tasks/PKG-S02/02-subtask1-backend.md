---

## 3. Sub-Agents Required

| الوكيل | الدور | السبب |
|---|---|---|
| **EngineeringAgent** | Backend/Logic | Server Actions (actions.ts): CRUD, status transitions, validation, summary queries |
| **FrontendAgent** | UI/Styling | Client page (page.tsx): table, filters, modals, summary bar, print styles |

> **ملاحظة:** EngineeringAgent يعمل أولاً (Backend actions)، ثم FrontendAgent يبني الواجهة بناءً على actions المصدرة. لا حاجة لعملاء إضافيين في هذه المرحلة (BusinessWorkflowAgent و UIUXStructureAgent غير مطلوبين لأن المواصفات معتمدة مسبقًا).

---

## 4. Recommended Task Breakdown

نظرًا لكبر وتعقيد شاشة S02، يُقترح تقسيمها إلى **3 مهام متسلسلة**:

| المهمة | المعرف | المحتوى | الوكيل | الاعتماديات |
|---|---|---|---|---|
| **Sub-Task 1** | TASK-0012 | Backend — checks/actions.ts: Server Actions (CRUD + status + summary + validation) | EngineeringAgent | — |
| **Sub-Task 2** | TASK-0013 | Frontend — checks/page.tsx: UI (table, filters, modals, print) | FrontendAgent | TASK-0012 |
| **Sub-Task 3** | TASK-0014 | Update navigation hub + middleware + revalidate | FrontendAgent + EngineeringAgent | TASK-0013 |

**سبب الفصل:**
- اختبار الـ Server Actions بشكل مستقل قبل الواجهة
- تحديد Allowed Write Targets بوضوح لكل وكيل
- منع التضارب على نفس الملف
- مراجعة الـ Backend أمنيًا قبل بناء الواجهة

---

## 5. Sub-Task 1: Backend — checks/actions.ts (TASK-0012)

### 5.1 Objective

إنشاء pp/checks/actions.ts يحتوي على جميع Server Actions:

| الـ Action | الوظيفة | الصلاحية |
|---|---|---|
| listChecks(filters?) | جلب الشيكات مع الفلاتر والعلاقات | أي مستخدم مسجل |
| getCheckById(id) | جلب تفاصيل شيك واحد | أي مستخدم مسجل |
| getCheckSummary() | إحصائيات الملخص (count, total, due-soon, returned) | أي مستخدم مسجل |
| createCheck(data) | إنشاء شيك جديد - الحالة REGISTERED تلقائيًا | أي مستخدم مسجل |
| updateCheck(id, data) | تعديل شيك غير نهائي | أي مستخدم مسجل |
| changeStatus(id, newStatus, note?) | تغيير حالة الشيك | أي مستخدم مسجل |
| deleteCheck(id) | حذف شيك غير نهائي (Admin فقط!) | Admin فقط |

### 5.2 Allowed Write Targets

| المسار | الإجراء |
|---|---|
| checks-management/app/checks/actions.ts | **إنشاء** — ملف جديد |
| *(للقراءة فقط)* checks-management/app/banks/actions.ts | النمط المرجعي |
| *(للقراءة فقط)* checks-management/lib/auth.ts | requireAdmin() + getSession() |
| *(للقراءة فقط)* checks-management/lib/prisma.ts | PrismaClient pattern |
| *(للقراءة فقط)* checks-management/prisma/schema.prisma | النموذج (read-only) |
| *(للقراءة فقط)* project-control/workflow-rules.md | مصفوفة الانتقالات |
| *(للقراءة فقط)* project-preparation/07_SCREENS_AND_UI_STRUCTURE.md | مواصفات S02 |
| *(للقراءة فقط)* project-preparation/PROJECT_RULES.md | القواعد الإلزامية |
| *(للقراءة فقط)* project-preparation/10_TESTING_AND_ACCEPTANCE.md | اختبارات القبول |

### 5.3 Reference Files (must read)

1. **project-control/workflow-rules.md** — (إلزامي) transition matrix, confirmation texts, final state rules, status_note for RETURNED, auto status_changed_at
2. **project-preparation/07_SCREENS_AND_UI_STRUCTURE.md** — القسم S02: summary, table, filters, validation, special states
3. **checks-management/prisma/schema.prisma** — نموذج Check مع العلاقات
4. **checks-management/app/banks/actions.ts** — النمط المرجعي (actions + validation)
5. **checks-management/lib/auth.ts** — requireAdmin() و getSession()
6. **checks-management/lib/prisma.ts** — تهيئة PrismaClient
7. **project-preparation/PROJECT_RULES.md** — الأقسام 1.1 (عام) و 1.4 (DB)

### 5.4 Key Design Decisions (already made)

| القرار | التفاصيل |
|---|---|
| **صلاحية CRUD** | جميع المستخدمين — فقط delete يستخدم requireAdmin() |
| **requireAdmin()** | فقط في deleteCheck(). الباقي يستخدم getSession() للتحقق من تسجيل الدخول |
| **الحالة الابتدائية** | REGISTERED — تُضبط تلقائيًا عند الإنشاء |
| **status_changed_at** | 
ew Date() عند كل تغيير حالة (يُستبدل، لا يُحفظ تاريخ سابق) |
| **status_note** | إلزامي للانتقال إلى RETURNED، اختياري لباقي الانتقالات |
| **amount** | Decimal من Prisma → number في TypeScript after conversion |
| **التواريخ** | Date فقط (نوع @db.Date) بدون وقت |
| **التحقق من الحالة النهائية** | ممنوع التعديل/الحذف/تغيير الحالة لـ CASHED أو CANCELLED |
