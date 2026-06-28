'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  listChecks,
  getCheckSummary,
  getBanksForDropdown,
  getPartiesForDropdown,
  createCheck,
  updateCheck,
  updateCheckStatus,
  deleteCheck,
  getCheckById,
} from './actions'
import type {
  CheckItem,
  CheckFormData,
  CheckSummary,
  DropdownItem,
  CheckFilters,
} from './actions'
import { getCurrentUser } from '@/app/actions'

// ---------------------------------------------------------------------------
// Inline styles (matching Banks/Parties page pattern)
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    padding: '24px',
    fontFamily: 'system-ui, Arial, sans-serif',
    direction: 'rtl',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  printButton: {
    backgroundColor: '#FFFFFF',
    color: '#374151',
    fontWeight: 500,
    padding: '10px 20px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  addButton: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontWeight: 500,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  // Summary cards
  summaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
  },
  summaryCard: {
    borderRadius: '8px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  summaryCardLabel: {
    fontSize: '13px',
    fontWeight: 500,
    margin: 0,
  },
  summaryCardValue: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
  },
  // Filters bar
  filtersRow: {
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    padding: '16px 20px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '12px',
    alignItems: 'flex-end',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    minWidth: '140px',
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6B7280',
  },
  filterInput: {
    padding: '8px 12px',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#111827',
    outline: 'none',
    fontFamily: 'system-ui, Arial, sans-serif',
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#111827',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    fontFamily: 'system-ui, Arial, sans-serif',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    color: '#6B7280',
    fontWeight: 500,
    padding: '8px 16px',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  card: {
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
    fontWeight: 600,
    textAlign: 'start' as const,
    padding: '12px 16px',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '13px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #E5E7EB',
    color: '#111827',
  },
  actionButton: {
    padding: '6px 14px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    marginLeft: '8px',
    fontWeight: 500,
  },
  detailButton: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
  },
  editButton: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
  },
  statusButton: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    whiteSpace: 'nowrap' as const,
  },
  emptyState: {
    padding: '60px 24px',
    textAlign: 'center' as const,
    color: '#6B7280',
  },
  emptyTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    marginBottom: '24px',
  },
  emptyAddButton: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontWeight: 500,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '520px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
  },
  modalWide: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    marginBottom: '24px',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '6px',
  },
  requiredStar: {
    color: '#DC2626',
    marginRight: '2px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'system-ui, Arial, sans-serif',
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box' as const,
    backgroundColor: '#FFFFFF',
    fontFamily: 'system-ui, Arial, sans-serif',
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    minHeight: '80px',
    fontFamily: 'system-ui, Arial, sans-serif',
  },
  formError: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#B91C1C',
    fontSize: '13px',
    borderRadius: '8px',
    padding: '10px 14px',
    marginBottom: '16px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontWeight: 500,
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  saveButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    color: '#374151',
    fontWeight: 500,
    padding: '10px 24px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  confirmOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1100,
    padding: '16px',
  },
  confirmDialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  confirmTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    marginBottom: '12px',
  },
  confirmText: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '24px',
    lineHeight: 1.5,
  },
  confirmActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  confirmDeleteButton: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    fontWeight: 500,
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  toast: {
    position: 'fixed' as const,
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    zIndex: 1200,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    direction: 'rtl' as const,
  },
  toastSuccess: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
    border: '1px solid #BBF7D0',
  },
  toastError: {
    backgroundColor: '#FEF2F2',
    color: '#B91C1C',
    border: '1px solid #FECACA',
  },
  loadingRow: {
    textAlign: 'center' as const,
    padding: '40px 16px',
    color: '#6B7280',
    fontSize: '14px',
  },
  // Details view
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  },
  detailField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  detailLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: 500,
  },
  detailFull: {
    gridColumn: '1 / -1',
  },
  // Status change info row
  statusInfoRow: {
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
    display: 'flex',
    gap: '24px',
    fontSize: '14px',
  },
  statusInfoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  statusInfoLabel: {
    fontSize: '12px',
    color: '#6B7280',
  },
  statusInfoValue: {
    fontWeight: 600,
    color: '#111827',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(date: Date): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatAmount(amount: number): string {
  return amount.toLocaleString('ar-SA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const STATUS_LABELS: Record<string, string> = {
  REGISTERED: 'مسجل',
  IN_HAND: 'مستلم/مسلّم',
  CASHED: 'مصرف',
  RETURNED: 'مرتجع',
  CANCELLED: 'ملغي',
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  REGISTERED: { bg: '#DBEAFE', text: '#1D4ED8' },
  IN_HAND: { bg: '#FEF3C7', text: '#92400E' },
  CASHED: { bg: '#DCFCE7', text: '#166534' },
  RETURNED: { bg: '#FEF2F2', text: '#991B1B' },
  CANCELLED: { bg: '#F3F4F6', text: '#6B7280' },
}

const TYPE_LABELS: Record<string, string> = {
  ISSUED: 'صادر',
  INCOMING: 'وارد',
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  ISSUED: { bg: '#DBEAFE', text: '#1D4ED8' },
  INCOMING: { bg: '#DCFCE7', text: '#166534' },
}

// Valid transitions for status change
const VALID_TRANSITIONS: Record<string, string[]> = {
  REGISTERED: ['IN_HAND', 'CANCELLED'],
  IN_HAND: ['CASHED', 'RETURNED', 'CANCELLED'],
  RETURNED: ['IN_HAND', 'CASHED', 'CANCELLED'],
  CASHED: [],
  CANCELLED: [],
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type ToastState = { message: string; type: 'success' | 'error' } | null

export default function ChecksPage() {
  // ---------- Data state ----------
  const [checks, setChecks] = useState<CheckItem[]>([])
  const [summary, setSummary] = useState<CheckSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [banksList, setBanksList] = useState<DropdownItem[]>([])
  const [partiesList, setPartiesList] = useState<DropdownItem[]>([])
  const [userRole, setUserRole] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastState>(null)

  // ---------- Filters state ----------
  const [filters, setFilters] = useState<CheckFilters>({})
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterBankId, setFilterBankId] = useState('')
  const [filterPartyId, setFilterPartyId] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---------- Modal state ----------
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCheck, setEditingCheck] = useState<CheckItem | null>(null)
  const [detailsTarget, setDetailsTarget] = useState<CheckItem | null>(null)
  const [statusChangeTarget, setStatusChangeTarget] = useState<CheckItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<CheckItem | null>(null)

  // ---------- Form state ----------
  const [formType, setFormType] = useState<'ISSUED' | 'INCOMING'>('ISSUED')
  const [formBankId, setFormBankId] = useState('')
  const [formPartyId, setFormPartyId] = useState('')
  const [formCheckNumber, setFormCheckNumber] = useState('')
  const [formAmount, setFormAmount] = useState('')
  const [formIssueDate, setFormIssueDate] = useState('')
  const [formDueDate, setFormDueDate] = useState('')
  const [formNotes, setFormNotes] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  // ---------- Status change state ----------
  const [statusNewValue, setStatusNewValue] = useState('')
  const [statusNote, setStatusNote] = useState('')
  const [statusSaving, setStatusSaving] = useState(false)
  const [statusError, setStatusError] = useState('')

  // ---------- Toast helper ----------
  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }, [])

  // ---------- Build filters object ----------
  const buildFilters = useCallback((): CheckFilters => {
    const f: CheckFilters = {}
    if (filterType) f.type = filterType as 'ISSUED' | 'INCOMING'
    if (filterStatus) f.status = filterStatus as any
    if (filterBankId) f.bankId = Number(filterBankId)
    if (filterPartyId) f.partyId = Number(filterPartyId)
    if (filterDateFrom) f.dueDateFrom = filterDateFrom
    if (filterDateTo) f.dueDateTo = filterDateTo
    if (filterSearch.trim()) f.search = filterSearch.trim()
    return f
  }, [filterType, filterStatus, filterBankId, filterPartyId, filterDateFrom, filterDateTo, filterSearch])

  // ---------- Load data ----------
  const loadChecks = useCallback(async (f: CheckFilters) => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await listChecks(f)
      if (Array.isArray(data)) {
        setChecks(data)
      } else {
        setLoadError(data.error)
        showToast(data.error, 'error')
      }
    } catch {
      setLoadError('حدث خطأ أثناء تحميل الشيكات')
      showToast('حدث خطأ أثناء تحميل الشيكات', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Debounced search
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      const f = buildFilters()
      setFilters(f)
      loadChecks(f)
    }, 500)
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current)
    }
  }, [filterSearch]) // only search triggers debounce

  // Non-search filters trigger immediately
  useEffect(() => {
    // Skip first render — search effect handles it with debounce
    // For non-search filter changes, we load immediately
    const f = buildFilters()
    setFilters(f)
    loadChecks(f)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, filterStatus, filterBankId, filterPartyId, filterDateFrom, filterDateTo])

  // ---------- Initial data load ----------
  useEffect(() => {
    const initialLoad = async () => {
      try {
        const [summaryData, banksData, partiesData, userData] = await Promise.all([
          getCheckSummary(),
          getBanksForDropdown(),
          getPartiesForDropdown(),
          getCurrentUser(),
        ])

        if (summaryData && 'error' in summaryData) {
          showToast(summaryData.error, 'error')
        } else {
          setSummary(summaryData as CheckSummary)
        }

        if (Array.isArray(banksData)) {
          setBanksList(banksData)
        } else if (banksData && 'error' in banksData) {
          showToast(banksData.error, 'error')
        }

        if (Array.isArray(partiesData)) {
          setPartiesList(partiesData)
        } else if (partiesData && 'error' in partiesData) {
          showToast(partiesData.error, 'error')
        }

        if (userData) {
          setUserRole(userData.role)
        }
      } catch {
        showToast('حدث خطأ أثناء تحميل البيانات الأولية', 'error')
      }
    }

    initialLoad()
    // Load checks
    loadChecks({})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------- Refresh ----------
  const refreshAll = useCallback(async () => {
    const f = buildFilters()
    setFilters(f)
    loadChecks(f)
    try {
      const summaryData = await getCheckSummary()
      if (summaryData && !('error' in summaryData)) {
        setSummary(summaryData as CheckSummary)
      }
    } catch {
      // ignore summary refresh errors
    }
  }, [buildFilters, loadChecks])

  // ---------- Add / Edit Modal ----------
  const openAddModal = () => {
    setEditingCheck(null)
    setFormType('ISSUED')
    setFormBankId('')
    setFormPartyId('')
    setFormCheckNumber('')
    setFormAmount('')
    setFormIssueDate('')
    setFormDueDate('')
    setFormNotes('')
    setFormError('')
    setModalOpen(true)
  }

  const openEditModal = (check: CheckItem) => {
    setEditingCheck(check)
    setFormType(check.type as 'ISSUED' | 'INCOMING')
    setFormBankId(String(check.bankId))
    setFormPartyId(String(check.partyId))
    setFormCheckNumber(check.checkNumber)
    setFormAmount(String(check.amount))
    setFormIssueDate(formatDate(check.issueDate))
    setFormDueDate(formatDate(check.dueDate))
    setFormNotes(check.notes || '')
    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingCheck(null)
    setFormError('')
  }

  const handleSave = async () => {
    // Client-side validation
    if (!formType) {
      setFormError('النوع مطلوب')
      return
    }
    if (!formBankId) {
      setFormError('البنك مطلوب')
      return
    }
    if (!formPartyId) {
      setFormError('الجهة مطلوبة')
      return
    }
    if (!formCheckNumber.trim()) {
      setFormError('رقم الشيك مطلوب')
      return
    }
    if (formCheckNumber.trim().length > 50) {
      setFormError('رقم الشيك يجب ألا يتجاوز 50 حرف')
      return
    }
    const amountNum = parseFloat(formAmount)
    if (!formAmount || isNaN(amountNum) || amountNum <= 0) {
      setFormError('المبلغ يجب أن يكون أكبر من 0')
      return
    }
    if (!formIssueDate) {
      setFormError('تاريخ الإصدار مطلوب')
      return
    }
    if (!formDueDate) {
      setFormError('تاريخ الاستحقاق مطلوب')
      return
    }
    if (formDueDate < formIssueDate) {
      setFormError('تاريخ الاستحقاق يجب أن يكون أكبر من أو يساوي تاريخ الإصدار')
      return
    }
    if (formNotes.length > 500) {
      setFormError('الملاحظات يجب ألا تتجاوز 500 حرف')
      return
    }

    setSaving(true)
    setFormError('')

    const data: CheckFormData = {
      type: formType,
      bankId: Number(formBankId),
      partyId: Number(formPartyId),
      checkNumber: formCheckNumber.trim(),
      amount: amountNum,
      issueDate: formIssueDate,
      dueDate: formDueDate,
      notes: formNotes.trim() || undefined,
    }

    let result
    try {
      if (editingCheck) {
        result = await updateCheck(editingCheck.id, data)
      } else {
        result = await createCheck(data)
      }
    } catch {
      setFormError('حدث خطأ أثناء حفظ البيانات. حاول مرة أخرى.')
      setSaving(false)
      return
    }

    if ('error' in result) {
      setFormError(result.error)
      setSaving(false)
      return
    }

    closeModal()
    showToast(
      editingCheck ? 'تم تعديل الشيك بنجاح' : 'تم إضافة الشيك بنجاح',
      'success'
    )
    setSaving(false)
    refreshAll()
  }

  // ---------- Status Change ----------
  const openStatusChangeModal = (check: CheckItem) => {
    setStatusChangeTarget(check)
    setStatusNewValue('')
    setStatusNote('')
    setStatusError('')
    setStatusSaving(false)
  }

  const closeStatusChangeModal = () => {
    setStatusChangeTarget(null)
    setStatusError('')
  }

  const handleStatusChange = async () => {
    if (!statusChangeTarget || !statusNewValue) {
      setStatusError('يرجى اختيار الحالة الجديدة')
      return
    }

    setStatusSaving(true)
    setStatusError('')

    let result
    try {
      result = await updateCheckStatus(
        statusChangeTarget.id,
        statusNewValue,
        statusNote.trim() || undefined
      )
    } catch {
      setStatusError('حدث خطأ أثناء تغيير الحالة. حاول مرة أخرى.')
      setStatusSaving(false)
      return
    }

    if ('error' in result) {
      setStatusError(result.error)
      setStatusSaving(false)
      return
    }

    closeStatusChangeModal()
    showToast('تم تغيير حالة الشيك بنجاح', 'success')
    setStatusSaving(false)
    refreshAll()
  }

  // ---------- Delete ----------
  const handleDelete = async () => {
    if (!deleteTarget) return

    let result
    try {
      result = await deleteCheck(deleteTarget.id)
    } catch {
      setDeleteTarget(null)
      showToast('حدث خطأ أثناء حذف الشيك', 'error')
      return
    }

    setDeleteTarget(null)

    if ('error' in result) {
      showToast(result.error, 'error')
      return
    }

    showToast('تم حذف الشيك بنجاح', 'success')
    refreshAll()
  }

  // ---------- Helpers for visibility ----------
  const isAdmin = userRole === 'ADMIN'
  const isFinalStatus = (status: string) => status === 'CASHED' || status === 'CANCELLED'

  // ---------- Print ----------
  const handlePrint = () => {
    window.print()
  }

  // ---------- Render ----------
  return (
    <div style={styles.page}>
      {/* Print styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body { direction: rtl !important; }
              .no-print { display: none !important; }
              .print-only { display: block !important; }
              .print-table { width: 100% !important; }
              .print-table th, .print-table td {
                padding: 8px 10px !important;
                font-size: 12px !important;
                border: 1px solid #ddd !important;
              }
            }
            .print-only { display: none; }
          `,
        }}
      />

      {/* ========== Header ========== */}
      <div className="no-print" style={styles.headerRow}>
        <div style={styles.headerLeft}>
          <h1 style={styles.pageTitle}>إدارة الشيكات</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={styles.printButton}
            onClick={handlePrint}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF'
            }}
          >
            طباعة الكشف
          </button>
          <button
            className="no-print"
            style={styles.addButton}
            onClick={openAddModal}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1D4ED8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB'
            }}
          >
            إضافة شيك جديد
          </button>
        </div>
      </div>

      {/* ========== Summary Cards ========== */}
      {summary && (
        <div className="no-print" style={styles.summaryRow}>
          {/* عدد الشيكات */}
          <div
            style={{
              ...styles.summaryCard,
              backgroundColor: '#EFF6FF',
            }}
          >
            <p style={{ ...styles.summaryCardLabel, color: '#1D4ED8' }}>
              عدد الشيكات
            </p>
            <p style={{ ...styles.summaryCardValue, color: '#1D4ED8' }}>
              {summary.totalCount}
            </p>
          </div>

          {/* إجمالي المبالغ */}
          <div
            style={{
              ...styles.summaryCard,
              backgroundColor: '#DCFCE7',
            }}
          >
            <p style={{ ...styles.summaryCardLabel, color: '#166534' }}>
              إجمالي المبالغ
            </p>
            <p style={{ ...styles.summaryCardValue, color: '#166534' }}>
              {formatAmount(summary.totalAmount)}
            </p>
          </div>

          {/* مستحق قريبًا */}
          <div
            style={{
              ...styles.summaryCard,
              backgroundColor: '#FEF3C7',
            }}
          >
            <p style={{ ...styles.summaryCardLabel, color: '#92400E' }}>
              مستحق قريبًا
            </p>
            <p style={{ ...styles.summaryCardValue, color: '#92400E' }}>
              {summary.dueSoonCount}
            </p>
          </div>

          {/* شيكات مرتجعة */}
          <div
            style={{
              ...styles.summaryCard,
              backgroundColor: '#FEF2F2',
            }}
          >
            <p style={{ ...styles.summaryCardLabel, color: '#991B1B' }}>
              شيكات مرتجعة
            </p>
            <p style={{ ...styles.summaryCardValue, color: '#991B1B' }}>
              {summary.returnedCount}
            </p>
          </div>
        </div>
      )}

      {/* ========== Filters Bar ========== */}
      <div className="no-print" style={styles.filtersRow}>
        {/* النوع */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>النوع</span>
          <select
            style={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">الكل</option>
            <option value="ISSUED">صادر</option>
            <option value="INCOMING">وارد</option>
          </select>
        </div>

        {/* الحالة */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>الحالة</span>
          <select
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">الكل</option>
            <option value="REGISTERED">مسجل</option>
            <option value="IN_HAND">مستلم/مسلّم</option>
            <option value="CASHED">مصرف</option>
            <option value="RETURNED">مرتجع</option>
            <option value="CANCELLED">ملغي</option>
          </select>
        </div>

        {/* البنك */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>البنك</span>
          <select
            style={styles.filterSelect}
            value={filterBankId}
            onChange={(e) => setFilterBankId(e.target.value)}
          >
            <option value="">الكل</option>
            {banksList.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* الجهة */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>الجهة</span>
          <select
            style={styles.filterSelect}
            value={filterPartyId}
            onChange={(e) => setFilterPartyId(e.target.value)}
          >
            <option value="">الكل</option>
            {partiesList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* من تاريخ */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>من تاريخ</span>
          <input
            type="date"
            style={styles.filterInput}
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
        </div>

        {/* إلى تاريخ */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>إلى تاريخ</span>
          <input
            type="date"
            style={styles.filterInput}
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
        </div>

        {/* بحث */}
        <div style={styles.filterGroup}>
          <span style={styles.filterLabel}>بحث</span>
          <input
            type="text"
            style={styles.filterInput}
            placeholder="رقم الشيك أو الجهة..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </div>

        {/* إعادة تعيين */}
        <div
          style={{ ...styles.filterGroup, justifyContent: 'flex-end' }}
        >
          <button
            style={styles.resetButton}
            onClick={() => {
              setFilterType('')
              setFilterStatus('')
              setFilterBankId('')
              setFilterPartyId('')
              setFilterDateFrom('')
              setFilterDateTo('')
              setFilterSearch('')
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF'
            }}
          >
            إعادة تعيين
          </button>
        </div>
      </div>

      {/* ========== Table Card ========== */}
      <div style={styles.card}>
        {loading ? (
          <div style={styles.loadingRow}>جاري تحميل الشيكات...</div>
        ) : loadError ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyTitle}>خطأ في تحميل البيانات</div>
            <div style={styles.emptyText}>{loadError}</div>
            <button
              style={styles.emptyAddButton}
              onClick={() => {
                const f = buildFilters()
                loadChecks(f)
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1D4ED8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563EB'
              }}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : checks.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyTitle}>
              {Object.values(filters).some((v) => v !== '' && v !== undefined)
                ? 'لا توجد شيكات تطابق معايير البحث'
                : 'لا توجد شيكات مسجلة بعد'}
            </div>
            <div style={styles.emptyText}>
              {Object.values(filters).some((v) => v !== '' && v !== undefined)
                ? 'حاول تعديل معايير البحث أو إضافة شيك جديد'
                : 'أضف شيكًا جديدًا للبدء في إدارة الشيكات'}
            </div>
            {Object.values(filters).some((v) => v !== '' && v !== undefined) ? (
              <button
                style={styles.emptyAddButton}
                onClick={() => {
                  setFilterType('')
                  setFilterStatus('')
                  setFilterBankId('')
                  setFilterPartyId('')
                  setFilterDateFrom('')
                  setFilterDateTo('')
                  setFilterSearch('')
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1D4ED8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563EB'
                }}
              >
                إعادة تعيين الفلاتر
              </button>
            ) : (
              <button
                style={styles.emptyAddButton}
                onClick={openAddModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1D4ED8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563EB'
                }}
              >
                إضافة شيك جديد
              </button>
            )}
          </div>
        ) : (
          <table className="print-table" style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>رقم الشيك</th>
                <th style={styles.th}>النوع</th>
                <th style={styles.th}>البنك</th>
                <th style={styles.th}>الجهة</th>
                <th style={styles.th}>المبلغ</th>
                <th style={styles.th}>تاريخ الاستحقاق</th>
                <th style={styles.th}>الحالة</th>
                <th className="no-print" style={styles.th}>
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => {
                const statusColor = STATUS_COLORS[check.status] || {
                  bg: '#F3F4F6',
                  text: '#6B7280',
                }
                const typeColor = TYPE_COLORS[check.type] || {
                  bg: '#F3F4F6',
                  text: '#6B7280',
                }
                const finalStatus = isFinalStatus(check.status)

                return (
                  <tr
                    key={check.id}
                    style={{ pageBreakInside: 'avoid' }}
                    onMouseEnter={(e) => {
                      if (e.currentTarget instanceof HTMLElement) {
                        e.currentTarget.style.backgroundColor = '#F9FAFB'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (e.currentTarget instanceof HTMLElement) {
                        e.currentTarget.style.backgroundColor = ''
                      }
                    }}
                  >
                    <td style={styles.td}>{check.checkNumber}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: typeColor.bg,
                          color: typeColor.text,
                        }}
                      >
                        {TYPE_LABELS[check.type] || check.type}
                      </span>
                    </td>
                    <td style={styles.td}>{check.bankName}</td>
                    <td style={styles.td}>{check.partyName}</td>
                    <td style={styles.td}>
                      {formatAmount(check.amount)}
                    </td>
                    <td style={styles.td}>{formatDate(check.dueDate)}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                        }}
                      >
                        {STATUS_LABELS[check.status] || check.status}
                      </span>
                    </td>
                    <td className="no-print" style={styles.td}>
                      {/* تفاصيل */}
                      <button
                        style={{
                          ...styles.actionButton,
                          ...styles.detailButton,
                        }}
                        onClick={() => setDetailsTarget(check)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E5E7EB'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#F3F4F6'
                        }}
                      >
                        تفاصيل
                      </button>

                      {/* تعديل */}
                      {!finalStatus && (
                        <button
                          style={{
                            ...styles.actionButton,
                            ...styles.editButton,
                          }}
                          onClick={() => openEditModal(check)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#DBEAFE'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#EFF6FF'
                          }}
                        >
                          تعديل
                        </button>
                      )}

                      {/* تغيير حالة */}
                      {!finalStatus && (
                        <button
                          style={{
                            ...styles.actionButton,
                            ...styles.statusButton,
                          }}
                          onClick={() => openStatusChangeModal(check)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FDE68A'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEF3C7'
                          }}
                        >
                          تغيير حالة
                        </button>
                      )}

                      {/* حذف (Admin only, not final) */}
                      {isAdmin && !finalStatus && (
                        <button
                          style={{
                            ...styles.actionButton,
                            ...styles.deleteButton,
                          }}
                          onClick={() => setDeleteTarget(check)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEE2E2'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FEF2F2'
                          }}
                        >
                          حذف
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ========== Add/Edit Modal ========== */}
      {modalOpen && (
        <div className="no-print" style={styles.overlay} onClick={closeModal}>
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>
              {editingCheck
                ? `تعديل الشيك: ${editingCheck.checkNumber}`
                : 'إضافة شيك جديد'}
            </h2>

            {formError && (
              <div style={styles.formError} role="alert">
                {formError}
              </div>
            )}

            {/* النوع */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-type" style={styles.label}>
                النوع<span style={styles.requiredStar}>*</span>
              </label>
              <select
                id="check-type"
                required
                value={formType}
                onChange={(e) =>
                  setFormType(e.target.value as 'ISSUED' | 'INCOMING')
                }
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <option value="ISSUED">صادر</option>
                <option value="INCOMING">وارد</option>
              </select>
            </div>

            {/* البنك */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-bank" style={styles.label}>
                البنك<span style={styles.requiredStar}>*</span>
              </label>
              <select
                id="check-bank"
                required
                value={formBankId}
                onChange={(e) => setFormBankId(e.target.value)}
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <option value="">اختر البنك</option>
                {banksList.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* الجهة */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-party" style={styles.label}>
                الجهة<span style={styles.requiredStar}>*</span>
              </label>
              <select
                id="check-party"
                required
                value={formPartyId}
                onChange={(e) => setFormPartyId(e.target.value)}
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <option value="">اختر الجهة</option>
                {partiesList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* رقم الشيك */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-number" style={styles.label}>
                رقم الشيك<span style={styles.requiredStar}>*</span>
              </label>
              <input
                id="check-number"
                type="text"
                required
                value={formCheckNumber}
                onChange={(e) => setFormCheckNumber(e.target.value)}
                placeholder="أدخل رقم الشيك"
                maxLength={50}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* المبلغ */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-amount" style={styles.label}>
                المبلغ<span style={styles.requiredStar}>*</span>
              </label>
              <input
                id="check-amount"
                type="number"
                required
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                placeholder="أدخل المبلغ"
                min="0.01"
                step="0.01"
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* تاريخ الإصدار */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-issue-date" style={styles.label}>
                تاريخ الإصدار<span style={styles.requiredStar}>*</span>
              </label>
              <input
                id="check-issue-date"
                type="date"
                required
                value={formIssueDate}
                onChange={(e) => setFormIssueDate(e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* تاريخ الاستحقاق */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-due-date" style={styles.label}>
                تاريخ الاستحقاق<span style={styles.requiredStar}>*</span>
              </label>
              <input
                id="check-due-date"
                type="date"
                required
                value={formDueDate}
                onChange={(e) => setFormDueDate(e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* ملاحظات */}
            <div style={styles.fieldGroup}>
              <label htmlFor="check-notes" style={styles.label}>
                ملاحظات
              </label>
              <textarea
                id="check-notes"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="ملاحظات (اختياري)"
                maxLength={500}
                style={styles.textarea}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF'
                }}
              >
                إلغاء
              </button>
              <button
                disabled={saving}
                style={{
                  ...styles.saveButton,
                  ...(saving ? styles.saveButtonDisabled : {}),
                }}
                onClick={handleSave}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = '#1D4ED8'
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = '#2563EB'
                }}
              >
                {saving ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== Details Modal ========== */}
      {detailsTarget && (
        <div
          className="no-print"
          style={styles.overlay}
          onClick={() => setDetailsTarget(null)}
        >
          <div
            style={styles.modalWide}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>
              تفاصيل الشيك: {detailsTarget.checkNumber}
            </h2>

            <div style={styles.detailsGrid}>
              <div style={styles.detailField}>
                <span style={styles.detailLabel}>النوع</span>
                <span style={styles.detailValue}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: (TYPE_COLORS[detailsTarget.type] || {
                        bg: '#F3F4F6',
                        text: '#6B7280',
                      }).bg,
                      color: (TYPE_COLORS[detailsTarget.type] || {
                        bg: '#F3F4F6',
                        text: '#6B7280',
                      }).text,
                    }}
                  >
                    {TYPE_LABELS[detailsTarget.type] || detailsTarget.type}
                  </span>
                </span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>الحالة</span>
                <span style={styles.detailValue}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: (STATUS_COLORS[detailsTarget.status] || {
                        bg: '#F3F4F6',
                        text: '#6B7280',
                      }).bg,
                      color: (STATUS_COLORS[detailsTarget.status] || {
                        bg: '#F3F4F6',
                        text: '#6B7280',
                      }).text,
                    }}
                  >
                    {STATUS_LABELS[detailsTarget.status] || detailsTarget.status}
                  </span>
                </span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>البنك</span>
                <span style={styles.detailValue}>{detailsTarget.bankName}</span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>الجهة</span>
                <span style={styles.detailValue}>{detailsTarget.partyName}</span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>رقم الشيك</span>
                <span style={styles.detailValue}>
                  {detailsTarget.checkNumber}
                </span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>المبلغ</span>
                <span style={styles.detailValue}>
                  {formatAmount(detailsTarget.amount)}
                </span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>تاريخ الإصدار</span>
                <span style={styles.detailValue}>
                  {formatDate(detailsTarget.issueDate)}
                </span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>تاريخ الاستحقاق</span>
                <span style={styles.detailValue}>
                  {formatDate(detailsTarget.dueDate)}
                </span>
              </div>

              {detailsTarget.statusNote && (
                <div style={{ ...styles.detailField, ...styles.detailFull }}>
                  <span style={styles.detailLabel}>ملاحظة الحالة</span>
                  <span style={styles.detailValue}>
                    {detailsTarget.statusNote}
                  </span>
                </div>
              )}

              {detailsTarget.statusChangedAt && (
                <div style={styles.detailField}>
                  <span style={styles.detailLabel}>تاريخ تغيير الحالة</span>
                  <span style={styles.detailValue}>
                    {formatDate(detailsTarget.statusChangedAt)}
                  </span>
                </div>
              )}

              {detailsTarget.notes && (
                <div style={{ ...styles.detailField, ...styles.detailFull }}>
                  <span style={styles.detailLabel}>ملاحظات</span>
                  <span style={styles.detailValue}>{detailsTarget.notes}</span>
                </div>
              )}

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>تاريخ الإضافة</span>
                <span style={styles.detailValue}>
                  {formatDate(detailsTarget.createdAt)}
                </span>
              </div>

              <div style={styles.detailField}>
                <span style={styles.detailLabel}>أضيف بواسطة</span>
                <span style={styles.detailValue}>
                  {detailsTarget.createdByUsername}
                </span>
              </div>
            </div>

            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setDetailsTarget(null)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF'
                }}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== Status Change Modal ========== */}
      {statusChangeTarget && (
        <div
          className="no-print"
          style={styles.overlay}
          onClick={closeStatusChangeModal}
        >
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>تغيير حالة الشيك</h2>

            {/* Current check info */}
            <div style={styles.statusInfoRow}>
              <div style={styles.statusInfoItem}>
                <span style={styles.statusInfoLabel}>رقم الشيك</span>
                <span style={styles.statusInfoValue}>
                  {statusChangeTarget.checkNumber}
                </span>
              </div>
              <div style={styles.statusInfoItem}>
                <span style={styles.statusInfoLabel}>المبلغ</span>
                <span style={styles.statusInfoValue}>
                  {formatAmount(statusChangeTarget.amount)}
                </span>
              </div>
              <div style={styles.statusInfoItem}>
                <span style={styles.statusInfoLabel}>الحالة الحالية</span>
                <span style={styles.statusInfoValue}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: (STATUS_COLORS[
                        statusChangeTarget.status
                      ] || { bg: '#F3F4F6', text: '#6B7280' }).bg,
                      color: (STATUS_COLORS[
                        statusChangeTarget.status
                      ] || { bg: '#F3F4F6', text: '#6B7280' }).text,
                    }}
                  >
                    {STATUS_LABELS[statusChangeTarget.status] ||
                      statusChangeTarget.status}
                  </span>
                </span>
              </div>
            </div>

            {statusError && (
              <div style={styles.formError} role="alert">
                {statusError}
              </div>
            )}

            {/* Next status dropdown */}
            <div style={styles.fieldGroup}>
              <label htmlFor="new-status" style={styles.label}>
                الحالة الجديدة<span style={styles.requiredStar}>*</span>
              </label>
              <select
                id="new-status"
                required
                value={statusNewValue}
                onChange={(e) => setStatusNewValue(e.target.value)}
                style={styles.select}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <option value="">اختر الحالة الجديدة</option>
                {(VALID_TRANSITIONS[statusChangeTarget.status] || []).map(
                  (s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s] || s}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Status note */}
            <div style={styles.fieldGroup}>
              <label htmlFor="status-note" style={styles.label}>
                ملاحظة الحالة
                {statusNewValue === 'RETURNED' && (
                  <span
                    style={{ fontSize: '12px', color: '#6B7280', marginRight: '8px' }}
                  >
                    (يرجى ذكر سبب الارتجاع)
                  </span>
                )}
              </label>
              <textarea
                id="status-note"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="ملاحظات (اختياري)"
                maxLength={500}
                style={styles.textarea}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB'
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={closeStatusChangeModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF'
                }}
              >
                إلغاء
              </button>
              <button
                disabled={statusSaving || !statusNewValue}
                style={{
                  ...styles.saveButton,
                  ...(statusSaving || !statusNewValue
                    ? styles.saveButtonDisabled
                    : {}),
                }}
                onClick={handleStatusChange}
                onMouseEnter={(e) => {
                  if (!statusSaving && statusNewValue)
                    e.currentTarget.style.backgroundColor = '#1D4ED8'
                }}
                onMouseLeave={(e) => {
                  if (!statusSaving)
                    e.currentTarget.style.backgroundColor = '#2563EB'
                }}
              >
                {statusSaving ? 'جاري الحفظ...' : 'تأكيد التغيير'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== Delete Confirmation Modal ========== */}
      {deleteTarget && (
        <div
          className="no-print"
          style={styles.confirmOverlay}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            style={styles.confirmDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.confirmTitle}>تأكيد الحذف</h2>
            <p style={styles.confirmText}>
              هل أنت متأكد من حذف الشيك نهائيًا &quot;{deleteTarget.checkNumber}&quot;؟
            </p>
            <div style={styles.confirmActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setDeleteTarget(null)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF'
                }}
              >
                إلغاء
              </button>
              <button
                style={styles.confirmDeleteButton}
                onClick={handleDelete}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B91C1C'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#DC2626'
                }}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== Toast ========== */}
      {toast && (
        <div
          className="no-print"
          style={{
            ...styles.toast,
            ...(toast.type === 'success'
              ? styles.toastSuccess
              : styles.toastError),
          }}
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
