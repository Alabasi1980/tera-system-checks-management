# ExecutionPreparationAgent — Task Package: Checks Management Screen (S02)

---

## Task Package Overview

| البند | القيمة |
|---|---|
| **Package ID** | PKG-S02-CHECKS |
| **Screen** | S02 — إدارة الشيكات (Checks Management) |
| **Project Phase** | Phase 4 — Checks Screen |
| **Prepared By** | ExecutionPreparationAgent |
| **Prepared For** | Tera Agent review → Pre-Execution Gate → Delegation |
| **Package Status** | Draft — Ready for Tera review |
| **Next TASK-ID** | TASK-0012 (first sub-task) |

---

## 1. Overall Task Objective

Build the **Checks Management Screen (S02)** — the primary screen of the MVP. This screen provides:

- **Summary bar** at the top: check counts, total amounts, due-soon count, returned count
- **Full table** of checks with sortable columns
- **Filters** by type, status, bank, party, and due-date range
- **Add/Edit** check via unified modal
- **Status change** modal with transition validation per workflow-rules.md
- **Delete** (Admin only) with final-state protection
- **Print statement** of the currently filtered list
- **Quick search** by check number or party name

**Pattern:** Banks (S03) + Parties (S04) architecture adapted for the more complex Check model with status transitions, related entities, and multi-role access.

---

## 2. Scope / Out of Scope

### داخل النطاق ✅

| البند | التفاصيل |
|---|---|
| pp/checks/actions.ts (إنشاء) | Server Actions: list, create, update, delete, changeStatus, getSummary, getCheckById |
| pp/checks/page.tsx (إنشاء) | Full client page: summary bar, table, filters, modals, toast, print |
| middleware.ts (تعديل) | Add /checks to authenticated routes (NOT admin — all users can access) |
| pp/page.tsx (تعديل) | Update Checks card from "قيد الإنشاء" to active link to /checks |
| Check CRUD | List with Bank/Party/User names; Create with validation; Update only non-final; Delete only Admin + non-final |
| Status transitions | Full transition matrix per workflow-rules.md |
| Filters | By type, status, bank, party, due-date range |
| Quick search | By check number or party name |
| Summary bar | Count, total amounts, due-soon (7 days), returned count |
| Print | window.print() with @media print styles for current filtered list |
| Empty state | "لا توجد شيكات مسجلة بعد" + "إضافة شيك جديد" button |
| No results after filter | "لا توجد نتائج" + "مسح الفلاتر" button |
| Sort | Descending by createdAt (newest first) |
| Modal for add/edit | Single modal for both add and edit |
| Modal for status change | Dedicated modal with allowed-transition dropdown + note field |
| Modal for details | Read-only details view |
| Validation (server+client) | Required fields, amount > 0, due_date >= issue_date |
| equireAdmin() | Only for deleteCheck() — others use getSession() |
| Inline styles | Same styles object pattern as Banks/Parties |
| RTL, system-ui font, colors | Per 28_UI_UX_GUIDELINES.md |
| evalidatePath('/checks') | After create, update, delete, changeStatus |

### خارج النطاق ❌

| البند | سبب الإقصاء |
|---|---|
| Status History / Audit Log | غير موجود في MVP |
| Export Excel / CSV | غير مطلوب في MVP |
| Dashboard منفصلة | الملخص مدمج في شاشة الشيكات |
| Notifications | غير مطلوبة في MVP |
| Separate add/edit/details pages | كلها عبر Modal |
| API Routes خارجية | Server Actions فقط |
| Services/Repositories layer | غير مطلوبة |
| State management (Redux/Zustand) | غير مطلوب |
| Multi-tenant / Company structure | غير موجودة في MVP |
| حذف Check في حالة نهائية | ممنوع حتى Admin |
| تعديل Check في حالة نهائية | ممنوع |
| تغيير حالة Check في حالة نهائية | ممنوع |
| Migration أو تغيير schema | نموذج Check موجود مسبقًا |
| إضافة مكتبات UI خارجية | ممنوع حسب PROJECT_RULES.md |
| Progress tracking | غير موجودة في المواصفات |
