### 6.9 Acceptance Criteria for Sub-Task 2

| # | المعيار | كيف يُفحص |
|---|---|---|
| 1 | صفحة /checks تعرض جدول الشيكات بجميع الأعمدة | اختبار يدوي |
| 2 | Summary bar يظهر 4 إحصائيات صحيحة | اختبار يدوي |
| 3 | الفلاتر (type, status, bank, party, date range) تصفّي النتائج | اختبار يدوي لكل فلتر |
| 4 | البحث النصي يعمل على رقم الشيك واسم الجهة | اختبار يدوي |
| 5 | زر "إضافة شيك جديد" يفتح Modal فارغًا | اختبار يدوي |
| 6 | زر "تعديل" يفتح Modal معبأً — مخفي للشيكات النهائية | اختبار يدوي |
| 7 | زر "تغيير حالة" يفتح Modal مع خيارات الحالة المسموحة فقط — مخفي للنهائية | اختبار يدوي |
| 8 | زر "تفاصيل" يفتح Modal read-only | اختبار يدوي |
| 9 | زر "حذف" يظهر فقط لـ Admin وللشيكات غير النهائية | اختبار يدوي (ادخل كـ User و Admin) |
| 10 | Toast يظهر بعد نجاح/فشل كل عملية | اختبار يدوي |
| 11 | حالة "لا توجد شيكات" → رسالة + زر إضافة | اختبار يدوي |
| 12 | حالة "لا توجد نتائج" بعد فلتر → رسالة + زر مسح الفلاتر | اختبار يدوي |
| 13 | زر "طباعة الكشف" يفتح نافذة طباعة المتصفح | اختبار يدوي |
| 14 | الطباعة تظهر الجدول مع الإجمالي وتخفي الأزرار والفلاتر | اختبار يدوي (Print Preview) |
| 15 | نفس نمط Banks في الشكل والألوان (inline styles, RTL, system-ui) | مراجعة الكود |
| 16 | جميع الـ Modals تظهر وتختفي بشكل صحيح | اختبار يدوي |
| 17 | Status Change Modal يطلب ملاحظات لـ RETURNED | اختبار يدوي |
| 18 | Build يمر (
pm run build) | أمر build |
| 19 | البحث السريع محدود بـ debounce أو يُنفذ يدويًا (ليس عند كل حرف) | مراجعة الكود |

### 6.10 What FrontendAgent Must NOT Do

- ❌ لا يعدّل checks/actions.ts
- ❌ لا يعدّل schema.prisma
- ❌ لا يعدّل middleware.ts (TASK-0014)
- ❌ لا يعدّل pp/page.tsx (TASK-0014)
- ❌ لا يضيف مكتبات UI خارجية
- ❌ لا يضيف Redux/Zustand
- ❌ لا ينشئ Dashboard أو رسوم بيانية
- ❌ لا يعدّل project-control/ أو project-preparation/
- ❌ لا يضيف API Routes
- ❌ لا يكتب secrets في الكود

---

## 7. Sub-Task 3: Navigation Hub + Middleware Update (TASK-0014)

### 7.1 Objective

تحديث ملفين صغيرين لجعل /checks قابلاً للوصول:

**1. middleware.ts** — إضافة /checks إلى dminRoutes أو إنشاء مسار منفصل:
- checkRoutes أو مسار عام للمستخدمين المسجلين
- الحالي: dminRoutes = ['/banks', '/parties', '/users']
- المطلوب: dminRoutes = ['/banks', '/parties', '/users'] (يبقى كما هو — Banks/Parties/Users محمية بـ Admin)
- /checks يجب أن يكون محميًا للمستخدمين المسجلين فقط (ليس Admin فقط)
- الحل: إضافة مجموعة uthenticatedRoutes منفصلة أو تعديل المنطق:
  `
  const adminRoutes = ['/banks', '/parties', '/users']
  const authenticatedRoutes = ['/checks']  // NEW
  // If route is in authenticatedRoutes: require login (any role), no admin check
  `

**2. app/page.tsx** — تحديث بطاقة "الشيكات":
- تغيير ctive={false} إلى ctive={true}
- إضافة href="/checks"
- إزالة badge "قيد الإنشاء"

### 7.2 Allowed Write Targets

| المسار | الإجراء |
|---|---|
| checks-management/middleware.ts | **تعديل** — إضافة /checks كـ authenticated route |
| checks-management/app/page.tsx | **تعديل** — تحديث NavCard للشيكات |

### 7.3 Reference Files

- checks-management/middleware.ts (الملف الحالي)
- checks-management/app/page.tsx (الملف الحالي)

### 7.4 Acceptance Criteria

| # | المعيار |
|---|---|
| 1 | المستخدم المسجل (User) يستطيع الوصول إلى /checks |
| 2 | المستخدم غير المسجل يُعاد توجيهه إلى /login عند محاولة فتح /checks |
| 3 | /banks و /parties و /users تبقى محمية بـ Admin فقط |
| 4 | بطاقة "الشيكات" في الصفحة الرئيسية أصبحت ctive مع رابط إلى /checks |
| 5 | لا يوجد badge "قيد الإنشاء" على بطاقة الشيكات |
| 6 | Build يمر (
pm run build) |

### 7.5 What the Agent Must NOT Do

- ❌ لا يعدّل أي ملف خارج المصرّح به
- ❌ لا يغيّر منطق Admin routes الحالي لـ /banks و /parties و /users
- ❌ لا يضيف ميزات جديدة للصفحة الرئيسية
- ❌ لا يعدّل project-control/ أو project-preparation/

---

## 8. Risk Notes

| الخطر | التأثير | التخفيف |
|---|---|---|
| **تسريب صلاحية Admin للشيكات** | استخدام requireAdmin() في create/update عن طريق الخطأ | تأكيد أن EngineeringAgent يستخدم getSession() وليس requireAdmin() لغير delete |
| **status transition gap** | السماح بانتقال غير مسموح به (مثل REGISTERED → CASHED) | مصفوفة الانتقالات hardcoded وواضحة؛ مراجعة QA وإختبار جميع الـ 11 انتقالًا |
| **حجم ملف page.tsx** | قد يتجاوز 1200+ سطر مع summary bar + filters + table + 4 modals + toast + print | مقبول — Banks.tsx 786 سطرًا، و S02 أكثر تعقيدًا. يمكن للتقسيم الداخلي (functions) المساعدة |
| **Filter complexity** | Prisma where clause ديناميكي قد يكون عرضة للأخطاء | اختبار كل فلتر على حدة مع قيم مختلفة |
| **Print quality** | @media print قد لا يعمل بشكل مثالي عبر المتصفحات | اختبار Print Preview في الاستعراض |
| **Middleware duplication** | إضافة /checks بطريقة تتداخل مع adminRoutes الحالية | الحل: مجموعة uthenticatedRoutes منفصلة ← لا تؤثر على adminRoutes |
| **Form field overwhelming** | 7 حقول في Modal قد يربك المستخدم | ترتيب منطقي: Type → Bank → Party → Check# → Amount → Issue Date → Due Date → Notes |
| **User sees delete button** | UI يظهر زر حذف لـ User ثم يرفضه Server | إخفاء زر الحذف تمامًا لـ non-Admin من البداية (فحص user.role عند العرض) |

---

## 9. Post-Implementation Review Plan

### 9.1 Recommended Reviewers

| المهمة | المراجع | السبب |
|---|---|---|
| TASK-0012 (Backend) | **SecurityAgent** | Permissions (requireAdmin vs getSession), transition validation, data integrity |
| TASK-0013 (Frontend) | **QAAndAcceptanceAgent** | UI adherence, transition UX, filter accuracy, print quality, acceptance criteria |
| TASK-0014 (Nav+MW) | **SecurityAgent** | Middleware changes — critical for access control |
| Overall S02 | **QualityReviewCoordinatorAgent** | Broader quality review before moving to S05 (Users) |

### 9.2 Key Things to Verify

**Security:**
- ✅ equireAdmin() only on deleteCheck — all other actions use getSession()
- ✅ Middleware allows all authenticated users (Admin + User) to access /checks
- ✅ Final-state checks prevent modification of CASHED/CANCELLED
- ✅ Transition matrix enforcement is complete
- ✅ No secret exposure in actions.ts

**Functionality:**
- ✅ All 7 Server Actions work correctly
- ✅ All 11 status transitions pass, all invalid transitions fail
- ✅ Filters + search produce correct results
- ✅ Summary bar reflects real data
- ✅ Print includes filtered data + total

**UI/UX:**
- ✅ Same style as Banks (inline styles, RTL, colors)
- ✅ Badges match workflow-rules.md colors
- ✅ Status change shows only allowed options
- ✅ Delete button hidden for non-Admin
- ✅ Edit/status buttons hidden for final-state checks
- ✅ All states covered: loading, empty, no results, error

**Project Control:**
- ✅ TASK_REGISTRY.md updated with new task IDs
- ✅ PROJECT_ACTIVITY_LOG.md updated
- ✅ PROJECT_STATE.md updated
- ✅ No secret leakage in any file
- ✅ All acceptance criteria met per task

---

## 10. Execution Order Summary

`
Step 1: Tera reviews this package → Approves or modifies
Step 2: Tera passes through Pre-Execution Gate
Step 3: Tera delegates TASK-0012 (Backend) → EngineeringAgent
Step 4: EngineeringAgent handback → Tera reviews + Post-Execution Gate
Step 5: Tera delegates TASK-0013 (Frontend) → FrontendAgent
Step 6: FrontendAgent handback → Tera reviews + Post-Execution Gate
Step 7: Tera delegates TASK-0014 (Nav+MW) → FrontendAgent + EngineeringAgent
Step 8: Tera reviews + Post-Execution Gate
Step 9: Tera decides on independent review (SecurityAgent, QAAndAcceptanceAgent)
Step 10: Tera updates project-control files
`

---

## ExecutionPreparationAgent Handback

| البند | القيمة |
|---|---|
| Task/Work | PKG-S02-CHECKS |
| Agent | ExecutionPreparationAgent |
| Status | Done ✅ |
| Files Produced | project-control/tasks/PKG-S02/ (5 files: overview, subtask1-backend, subtask1-spec, subtask2-frontend, this handback) |
| Summary | Task package prepared for Checks S02. 3 sub-tasks recommended (TASK-0012 Backend, TASK-0013 Frontend, TASK-0014 Nav+MW). Each with detailed scope, allowed write targets, acceptance criteria, and risk notes. Key design decisions documented (permissions, transitions, filters, print). Post-implementation review plan includes SecurityAgent and QAAndAcceptanceAgent. |
| Issues or Missing Info | None — all specs from 07_SCREENS_AND_UI_STRUCTURE.md, workflow-rules.md, 28_UI_UX_GUIDELINES.md, and PROJECT_RULES.md are incorporated |
| Decisions Needed from Tera | 1. Approve task breakdown (3 sub-tasks or merge?) 2. Approve SecurityAgent review timing (after each sub-task or at end?) |
| Recommendation | Proceed with Pre-Execution Gate for TASK-0012 (Backend) first. SecurityAgent should review middleware changes (TASK-0014) and permissions in actions.ts (TASK-0012). QAAndAcceptanceAgent should verify the full S02 screen in one pass after all 3 sub-tasks are complete. |
