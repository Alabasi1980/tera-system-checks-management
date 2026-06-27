'use client'

import { useActionState } from 'react'
import { login } from './actions'

const initialState: { error?: string } = {}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: '16px',
    fontFamily: 'system-ui, Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    padding: '32px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
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
  inputFocus: {
    borderColor: '#2563EB',
    boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#B91C1C',
    fontSize: '14px',
    borderRadius: '8px',
    padding: '12px 16px',
    textAlign: 'center' as const,
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontWeight: 500,
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <div dir="rtl" style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>نظام إدارة الشيكات</h1>
          <p style={styles.subtitle}>تسجيل الدخول</p>
        </div>

        <form action={formAction}>
          <div style={styles.fieldGroup}>
            <label htmlFor="username" style={styles.label}>
              اسم المستخدم
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              style={styles.input}
              placeholder="أدخل اسم المستخدم"
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
            <label htmlFor="password" style={styles.label}>
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={styles.input}
              placeholder="أدخل كلمة المرور"
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

          {state?.error && (
            <div style={styles.errorBox} role="alert">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{ ...styles.button, ...(pending ? styles.buttonDisabled : {}) }}
          >
            {pending ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
