### 5.5 Required Server Actions Specification

#### Session Pattern

`	ypescript
// For non-admin actions (list, create, update, changeStatus):
import { getSession } from '@/lib/auth'

const session = await getSession()
if (!session) return { error: 'يجب تسجيل الدخول أولاً' }
// session.userId, session.username, session.role available
`

> **IMPORTANT:** equireAdmin() is ONLY used on deleteCheck(). All other check actions use getSession().

#### listChecks(filters?: CheckFilters)

`	ypescript
type CheckFilters = {
  type?: CheckType
  status?: CheckStatus
  bankId?: number
  partyId?: number
  dueDateFrom?: string  // YYYY-MM-DD
  dueDateTo?: string    // YYYY-MM-DD
  search?: string       // searches checkNumber or party name
}

// Build Prisma where clause dynamically from provided filters
// Include: bank { select: { id, name } }, party { select: { id, name } }, createdBy { select: { id, displayName } }
// Order by: createdAt desc
`

#### getCheckSummary()

`	ypescript
type CheckSummary = {
  totalCount: number
  totalAmount: number       // Sum of all amounts
  dueSoonCount: number      // dueDate between today and today+7
  returnedCount: number     // status === 'RETURNED'
}
`

Implement with separate Prisma queries:
- prisma.check.count()
- prisma.check.aggregate({ _sum: { amount: true } })
- prisma.check.count({ where: { dueDate: { gte: today, lte: todayPlus7 } } })
- prisma.check.count({ where: { status: 'RETURNED' } })

#### createCheck(data: CheckFormData)

`	ypescript
type CheckFormData = {
  type: CheckType
  bankId: number
  partyId: number
  checkNumber: string
  amount: number
  issueDate: string    // YYYY-MM-DD
  dueDate: string      // YYYY-MM-DD
  notes?: string
}
`

Validation in order:
1. checkNumber: required, trim, max 50 chars
2. type: must be ISSUED or INCOMING
3. bankId: must be a positive integer; verify bank exists
4. partyId: must be a positive integer; verify party exists
5. amount: required, must be > 0, max 9999999999.99
6. issueDate: must be valid date string
7. dueDate: must be valid date string, must be >= issueDate
8. notes: optional, max 500 chars

On success: status: 'REGISTERED', createdById: session.userId, statusChangedAt: new Date()

#### updateCheck(id: number, data: CheckFormData)

- Verify check exists
- Verify status is NOT final (not CASHED or CANCELLED) → error: "لا يمكن تعديل شيك في حالة نهائية"
- Same validation as createCheck
- Do NOT change status, statusNote, or statusChangedAt on edit
- Update only: checkNumber, type, bankId, partyId, amount, issueDate, dueDate, notes

#### changeStatus(id: number, newStatus: CheckStatus, statusNote?: string)

- Verify check exists
- Verify check not in final state
- Verify transition is allowed per transition matrix
  - Transition map (hardcoded):
    `
    REGISTERED → [IN_HAND, CANCELLED]
    IN_HAND → [CASHED, RETURNED, CANCELLED]
    RETURNED → [IN_HAND, CASHED, CANCELLED]
    CASHED → []       (final)
    CANCELLED → []    (final)
    `
- If newStatus is RETURNED AND no statusNote provided → error: "يرجى ذكر سبب الارتجاع"
- Update: status = newStatus, statusNote (if provided), statusChangedAt = new Date()
- Return updated check data (for UI confirmation)

#### deleteCheck(id: number)

- equireAdmin() — only Admin can delete
- Verify check exists
- Verify status is NOT final → error if CASHED or CANCELLED
- Delete the check

### 5.6 Validation Summary (must be server-side + client-side)

% Before writing validation rules, note that Banks validation pattern must be followed but adapted for Check fields.

| الحقل | القاعدة | رسالة الخطأ |
|---|---|---|
| checkNumber | مطلوب، trim، max 50 | "رقم الشيك مطلوب" / "رقم الشيك يجب ألا يتجاوز 50 حرف" |
| type | مطلوب (ISSUED / INCOMING) | "نوع الشيك مطلوب" |
| bankId | مطلوب (موجود) | "البنك مطلوب" |
| partyId | مطلوب (موجود) | "الجهة مطلوبة" |
| amount | مطلوب، > 0، max 9999999999.99 | "المبلغ مطلوب" / "المبلغ يجب أن يكون أكبر من صفر" |
| issueDate | مطلوب (صيغة تاريخ صحيحة) | "تاريخ الإصدار مطلوب" |
| dueDate | مطلوب، >= issueDate | "تاريخ الاستحقاق مطلوب" / "تاريخ الاستحقاق يجب أن يكون بعد أو يساوي تاريخ الإصدار" |
| notes | اختياري، max 500 | "الملاحظات يجب ألا تتجاوز 500 حرف" |

### 5.7 TypeScript Types to Export

يجب على ctions.ts تصدير الأنواع التالية (تستخدمها FrontendAgent):

`	ypescript
export enum CheckType { ISSUED = 'ISSUED', INCOMING = 'INCOMING' }
export enum CheckStatus { REGISTERED = 'REGISTERED', IN_HAND = 'IN_HAND', CASHED = 'CASHED', RETURNED = 'RETURNED', CANCELLED = 'CANCELLED' }

export type CheckListItem = {
  id: number; checkNumber: string; type: CheckType; status: CheckStatus
  amount: number; issueDate: Date; dueDate: Date
  statusNote: string | null; statusChangedAt: Date | null; notes: string | null; createdAt: Date
  bank: { id: number; name: string }
  party: { id: number; name: string }
  createdBy: { id: number; displayName: string }
}

export type CheckFormData = {
  type: CheckType; bankId: number; partyId: number; checkNumber: string
  amount: number; issueDate: string; dueDate: string; notes?: string
}

export type CheckFilters = {
  type?: CheckType; status?: CheckStatus; bankId?: number; partyId?: number
  dueDateFrom?: string; dueDateTo?: string; search?: string
}

export type CheckSummary = {
  totalCount: number; totalAmount: number; dueSoonCount: number; returnedCount: number
}
`

### 5.8 Acceptance Criteria for Sub-Task 1

| # | المعيار | كيف يُفحص |
|---|---|---|
| 1 | checks/actions.ts موجود بجميع الـ 7 Server Actions | قراءة الملف |
| 2 | listChecks يعيد قائمة مع أسماء البنك والجهة والمستخدم | اختبار يدوي |
| 3 | listChecks يدعم الفلاتر (type, status, bankId, partyId, dueDateFrom/To, search) | مراجعة الكود |
| 4 | getCheckSummary يعيد totalCount, totalAmount, dueSoonCount, returnedCount | مراجعة الكود |
| 5 | createCheck ينشئ شيكًا بحالة REGISTERED و createdById صحيح | اختبار يدوي |
| 6 | createCheck يرفض amount <= 0 | اختبار يدوي |
| 7 | createCheck يرفض dueDate < issueDate | اختبار يدوي |
| 8 | createCheck يرفض الحقول الفارغة المطلوبة | اختبار يدوي |
| 9 | updateCheck يعدّل غير النهائي ويرفض CASHED/CANCELLED | اختبار يدوي |
| 10 | changeStatus ينفذ فقط الانتقالات المسموحة | اختبار يدوي (كل انتقال) |
| 11 | changeStatus يرفض الانتقال غير المسموح (مثل REGISTERED → CASHED) | اختبار يدوي |
| 12 | changeStatus يتطلب statusNote لـ RETURNED | اختبار يدوي |
| 13 | changeStatus يسجل statusChangedAt تلقائيًا | مراجعة الكود |
| 14 | deleteCheck يستخدم requireAdmin() ويمنع حذف النهائي | مراجعة الكود + اختبار يدوي |
| 15 | جميع الأنواع مصدرة (CheckListItem, CheckFormData, CheckFilters, CheckSummary) | مراجعة الكود |
| 16 | evalidatePath('/checks') بعد كل عملية كتابة | مراجعة الكود |
| 17 | Build يمر (
pm run build) | أمر build |
