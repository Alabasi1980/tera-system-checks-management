### 5.9 Security Considerations

| البند | الإجراء |
|---|---|
| **عدم استخدام requireAdmin() للقراءة/الكتابة العادية** | getSession() فقط لـ list, create, update, changeStatus; equireAdmin() فقط لـ delete |
| **التحقق من وجود البنك والجهة** | قبل إنشاء/تعديل، تأكد أن bankId و partyId موجودان |
| **التحقق من الحالة النهائية** | قبل update, delete, changeStatus — ارفض CASHED/CANCELLED |
| **التحقق من الانتقالات المسموحة** | changeStatus يستخدم مصفوفة ثابتة (hardcoded) |
| **عدم تسريب معلومات** | رسائل خطأ عامة — لا تكشف وجود/عدم وجود سجلات |
| **لا أسرار في الكود** | لا تكتب JWT_SECRET, DATABASE_URL في actions.ts |

### 5.10 What EngineeringAgent Must NOT Do

- ❌ لا يعدّل schema.prisma أو ينفذ db push أو migration
- ❌ لا ينشئ checks/page.tsx
- ❌ لا يضيف مكتبات خارجية جديدة
- ❌ لا ينشئ Status History أو Audit Log
- ❌ لا يضيف Dashboard
- ❌ لا يعدّل project-control/ أو project-preparation/ أو 	era-system/
- ❌ لا يكتب secrets في الكود
- ❌ لا يعدّل middleware.ts (سيُعدّل في TASK-0014)
- ❌ لا يعدّل pp/page.tsx (سيُعدّل في TASK-0014)
- ❌ لا ينشئ API Routes — Server Actions فقط

---

## 6. Sub-Task 2: Frontend — checks/page.tsx (TASK-0013)

### 6.1 Objective

إنشاء pp/checks/page.tsx كـ Client Component يعرض واجهة إدارة الشيكات الكاملة:

**1. Summary Bar** — 4 بطاقات في أعلى الصفحة (grid 2x2 أو 4 أعمدة):
   - إجمالي الشيكات (عدد)
   - إجمالي المبالغ (مجموع amounts)
   - شيكات مستحقة قريبًا (عدد — خلال 7 أيام)
   - شيكات مرتجعة (عدد)

**2. Filters Bar** — أسفل summary bar:
   - Dropdown: النوع (الكل / صادر / وارد)
   - Dropdown: الحالة (الكل / مسجل / مستلم / مصرف / مرتجع / ملغي)
   - Dropdown: البنك (قائمة ديناميكية)
   - Dropdown: الجهة (قائمة ديناميكية)
   - Date picker: من تاريخ / إلى تاريخ (تاريخ الاستحقاق)
   - حقل بحث نصي: بحث برقم الشيك أو اسم الجهة
   - زر "مسح الفلاتر"
   - زر "طباعة الكشف"

**3. Action Button** — زر "إضافة شيك جديد" في header

**4. Table** — أعمدة:
   - رقم الشيك
   - النوع (صادر/وارد) — badge مع لون
   - البنك
   - الجهة
   - المبلغ (منسّق)
   - تاريخ الاستحقاق
   - الحالة — badge ملون
   - تاريخ الإضافة
   - الإجراءات: تعديل، تغيير حالة، تفاصيل، حذف (Admin فقط)

**5. Per Row Actions:**
   - تعديل — يظهر فقط للشيكات غير النهائية
   - تغيير حالة — يظهر فقط للشيكات غير النهائية
   - تفاصيل — يظهر دائماً
   - حذف — يظهر فقط للمستخدم Admin وللشيكات غير النهائية

**6. Modals:**
   - **Add/Edit Modal**: form (type, bankId, partyId, checkNumber, amount, issueDate, dueDate, notes)
   - **Status Change Modal**: dropdown للحالة الجديدة (المسموحة فقط) + حقل ملاحظات (إلزامي لـ RETURNED)
   - **Details Modal**: عرض read-only لكل الحقول
   - **Delete Confirmation Dialog**: تأكيد الحذف

**7. Toast Notifications** — بعد كل عملية

**8. States:**
   - Loading: "جاري تحميل الشيكات..."
   - Empty: "لا توجد شيكات مسجلة بعد" + زر إضافة
   - Error: رسالة خطأ مع إعادة المحاولة
   - No results: "لا توجد نتائج تطابق الفلتر المحدد" + زر "مسح الفلاتر"
   - Session expired: إعادة توجيه إلى /login

**9. Print:**
   - window.print() مع @media print styles
   - إخفاء الأزرار والفلاتر والـ modals عند الطباعة
   - عنوان "كشف الشيكات" وتاريخ الطباعة
   - الجدول كاملاً مع الإجمالي في الأسفل

### 6.2 UI Pattern

استخدم **نفس نمط** anks/page.tsx:
- 'use client'
- styles object مع جميع الأنماط
- useState, useEffect, useCallback
- هيكل: Header → Content → Modals → Toast
- نفس hover effects, focus styles, color scheme
- نفس Modal, Confirm Dialog, Toast components
- RTL, system-ui font

### 6.3 Badge Colors

**Status badges (من workflow-rules.md):**

| الحالة | النص | الخلفية | النص |
|---|---|---|---|
| REGISTERED | مسجل | #DBEAFE | #1E40AF |
| IN_HAND | مستلم/مسلّم | #FEF3C7 | #92400E |
| CASHED | مصرف | #D1FAE5 | #065F46 |
| RETURNED | مرتجع | #FEE2E2 | #991B1B |
| CANCELLED | ملغي | #F3F4F6 | #374151 |

**Type badges:**

| النوع | النص | الخلفية | النص |
|---|---|---|---|
| ISSUED | صادر | #EDE9FE | #5B21B6 |
| INCOMING | وارد | #CFFAFE | #155E75 |

### 6.4 Status Change Modal Design

- عند الضغط على "تغيير حالة" -> فتح Modal
- Dropdown يعرض فقط الحالات المسموحة بناءً على الحالة الحالية
- حقل نصي للملاحظات (يظهر كـ "سبب الارتجاع (مطلوب)" لـ RETURNED، و "ملاحظات (اختياري)" للباقي)
- نص تأكيد حسب workflow-rules.md القسم 5
- زر "تأكيد" (Primary) و "إلغاء" (Secondary)

### 6.5 Print Implementation

`	ypescript
// In page.tsx, wrap table in a div with className or id "print-area"
// Add inline style tag in the component:

const printStyles = 
  @media print {
    body * { visibility: hidden; }
    .print-area, .print-area * { visibility: visible; }
    .print-area { position: absolute; left: 0; top: 0; width: 100%; }
    .no-print { display: none !important; }
  }

// Inject via <style>{printStyles}</style> in JSX
`

### 6.6 Data Flow

1. Page loads → call getCheckSummary(), listChecks(), listBanks(), listParties() (for filter dropdowns)
2. User applies filter → call listChecks(filters) — server-side filtering
3. User adds/edits → call createCheck/updateCheck → on success: reload list + summary
4. User changes status → call changeStatus → on success: reload list + summary
5. User deletes → call deleteCheck → on success: reload list + summary
6. User prints → window.print() prints currently displayed data

### 6.7 Allowed Write Targets

| المسار | الإجراء |
|---|---|
| checks-management/app/checks/page.tsx | **إنشاء** — ملف جديد |
| *(للقراءة فقط)* checks-management/app/checks/actions.ts | من TASK-0012 — الأنواع والـ Actions |
| *(للقراءة فقط)* checks-management/app/banks/page.tsx | النمط المرجعي |
| *(للقراءة فقط)* project-preparation/28_UI_UX_GUIDELINES.md | دليل الستايل |
| *(للقراءة فقط)* project-control/workflow-rules.md | ألوان badges، نصوص التأكيد |
| *(للقراءة فقط)* project-preparation/07_SCREENS_AND_UI_STRUCTURE.md | مواصفات S02 |

### 6.8 Reference Files (must read)

1. **checks-management/app/checks/actions.ts** — (إلزامي) الأنواع والـ Actions
2. **checks-management/app/banks/page.tsx** — النمط المرجعي (780+ سطر)
3. **project-preparation/28_UI_UX_GUIDELINES.md** — دليل الستايل
4. **project-control/workflow-rules.md** — ألوان Badge، نصوص التأكيد
5. **project-preparation/07_SCREENS_AND_UI_STRUCTURE.md** — القسم S02
6. **checks-management/app/banks/actions.ts** — لفهم listBanks (للـ dropdown)
