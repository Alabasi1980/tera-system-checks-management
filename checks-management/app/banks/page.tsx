'use client'

import { useState, useEffect, useCallback } from 'react'
import { listBanks, createBank, updateBank, deleteBank } from './actions'
import type { BankItem, BankFormData } from './actions'

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
  pageTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
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
  addButtonHover: {
    backgroundColor: '#1D4ED8',
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
  trHover: {
    backgroundColor: '#F9FAFB',
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
  editButton: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
  },
  editButtonHover: {
    backgroundColor: '#DBEAFE',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
  },
  deleteButtonHover: {
    backgroundColor: '#FEE2E2',
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
    maxWidth: '480px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
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
  checkCount: {
    display: 'inline-block',
    backgroundColor: '#F3F4F6',
    color: '#374151',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 500,
  },
  dateText: {
    fontSize: '13px',
    color: '#6B7280',
  },
}

function formatDate(date: Date): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

type ToastState = { message: string; type: 'success' | 'error' } | null

export default function BanksPage() {
  const [banks, setBanks] = useState<BankItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBank, setEditingBank] = useState<BankItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<BankItem | null>(null)
  const [toast, setToast] = useState<ToastState>(null)

  // Form fields
  const [formName, setFormName] = useState('')
  const [formBranch, setFormBranch] = useState('')
  const [formAccountNumber, setFormAccountNumber] = useState('')
  const [formNotes, setFormNotes] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  const loadBanks = useCallback(async () => {
    setLoading(true)
    try {
      const data = await listBanks()
      if (Array.isArray(data)) {
        setBanks(data)
      } else {
        showToast(data.error, 'error')
      }
    } catch {
      showToast('حدث خطأ أثناء تحميل البيانات', 'error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBanks()
  }, [loadBanks])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const openAddModal = () => {
    setEditingBank(null)
    setFormName('')
    setFormBranch('')
    setFormAccountNumber('')
    setFormNotes('')
    setFormError('')
    setModalOpen(true)
  }

  const openEditModal = (bank: BankItem) => {
    setEditingBank(bank)
    setFormName(bank.name)
    setFormBranch(bank.branch || '')
    setFormAccountNumber(bank.accountNumber || '')
    setFormNotes(bank.notes || '')
    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingBank(null)
    setFormError('')
  }

  const handleSave = async () => {
    if (!formName.trim()) {
      setFormError('اسم البنك مطلوب')
      return
    }

    if (formName.trim().length > 100) {
      setFormError('اسم البنك يجب ألا يتجاوز 100 حرف')
      return
    }

    setSaving(true)
    setFormError('')

    const data: BankFormData = {
      name: formName.trim(),
      branch: formBranch.trim() || undefined,
      accountNumber: formAccountNumber.trim() || undefined,
      notes: formNotes.trim() || undefined,
    }

    let result
    try {
      if (editingBank) {
        result = await updateBank(editingBank.id, data)
      } else {
        result = await createBank(data)
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
      editingBank ? 'تم تعديل البنك بنجاح' : 'تم إضافة البنك بنجاح',
      'success'
    )
    setSaving(false)
    loadBanks()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    let result
    try {
      result = await deleteBank(deleteTarget.id)
    } catch {
      setDeleteTarget(null)
      showToast('حدث خطأ أثناء حذف البنك', 'error')
      return
    }

    setDeleteTarget(null)

    if ('error' in result) {
      showToast(result.error, 'error')
      return
    }

    showToast('تم حذف البنك بنجاح', 'success')
    loadBanks()
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.headerRow}>
        <h1 style={styles.pageTitle}>إدارة البنوك</h1>
        <button
          style={styles.addButton}
          onClick={openAddModal}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1D4ED8'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563EB'
          }}
        >
          إضافة بنك جديد
        </button>
      </div>

      {/* Table Card */}
      <div style={styles.card}>
        {loading ? (
          <div style={styles.loadingRow}>جاري تحميل البنوك...</div>
        ) : banks.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyTitle}>لا توجد بنوك مسجلة بعد.</div>
            <div style={styles.emptyText}>
              أضف بنكًا جديدًا للبدء في إدارة الشيكات.
            </div>
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
              إضافة بنك جديد
            </button>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>اسم البنك</th>
                <th style={styles.th}>الفرع</th>
                <th style={styles.th}>رقم الحساب</th>
                <th style={styles.th}>عدد الشيكات</th>
                <th style={styles.th}>تاريخ الإضافة</th>
                <th style={styles.th}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank, index) => (
                <tr
                  key={bank.id}
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
                  <td style={styles.td}>{bank.name}</td>
                  <td style={{ ...styles.td, color: bank.branch ? '#111827' : '#9CA3AF' }}>
                    {bank.branch || '—'}
                  </td>
                  <td style={{ ...styles.td, color: bank.accountNumber ? '#111827' : '#9CA3AF' }}>
                    {bank.accountNumber || '—'}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.checkCount}>{bank.checkCount}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.dateText}>{formatDate(bank.createdAt)}</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.actionButton, ...styles.editButton }}
                      onClick={() => openEditModal(bank)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#DBEAFE'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFF6FF'
                      }}
                    >
                      تعديل
                    </button>
                    <button
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                      onClick={() => setDeleteTarget(bank)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FEE2E2'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FEF2F2'
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div style={styles.overlay} onClick={closeModal}>
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>
              {editingBank ? `تعديل البنك: ${editingBank.name}` : 'إضافة بنك جديد'}
            </h2>

            {formError && (
              <div style={styles.formError} role="alert">
                {formError}
              </div>
            )}

            <div style={styles.fieldGroup}>
              <label htmlFor="bank-name" style={styles.label}>
                اسم البنك<span style={styles.requiredStar}>*</span>
              </label>
              <input
                id="bank-name"
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="أدخل اسم البنك"
                maxLength={100}
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

            <div style={styles.fieldGroup}>
              <label htmlFor="bank-branch" style={styles.label}>
                الفرع
              </label>
              <input
                id="bank-branch"
                type="text"
                value={formBranch}
                onChange={(e) => setFormBranch(e.target.value)}
                placeholder="أدخل الفرع (اختياري)"
                maxLength={100}
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

            <div style={styles.fieldGroup}>
              <label htmlFor="bank-account" style={styles.label}>
                رقم الحساب
              </label>
              <input
                id="bank-account"
                type="text"
                value={formAccountNumber}
                onChange={(e) => setFormAccountNumber(e.target.value)}
                placeholder="أدخل رقم الحساب (اختياري)"
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

            <div style={styles.fieldGroup}>
              <label htmlFor="bank-notes" style={styles.label}>
                ملاحظات
              </label>
              <textarea
                id="bank-notes"
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          style={styles.confirmOverlay}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            style={styles.confirmDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.confirmTitle}>تأكيد الحذف</h2>
            <p style={styles.confirmText}>
              هل أنت متأكد من حذف البنك &quot;{deleteTarget.name}&quot;؟
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

      {/* Toast */}
      {toast && (
        <div
          style={{
            ...styles.toast,
            ...(toast.type === 'success' ? styles.toastSuccess : styles.toastError),
          }}
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
