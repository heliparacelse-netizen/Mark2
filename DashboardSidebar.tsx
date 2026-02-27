'use client'
import { useState } from 'react'
import Link from 'next/link'
import { AppProvider, useApp } from '../../lib/store'

function RegisterForm() {
  const { t } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) return alert('Passwords do not match')
    window.location.href = '/dashboard'
  }
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--bg-primary)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Design<span style={{ color: '#c9a84c' }}>AI</span></div>
          </Link>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700 }}>{t('register_title')}</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { label: 'register_name', key: 'name', type: 'text', ph: 'John Doe' },
            { label: 'login_email', key: 'email', type: 'email', ph: 'you@example.com' },
            { label: 'login_pass', key: 'password', type: 'password', ph: '••••••••' },
            { label: 'register_confirm', key: 'confirm', type: 'password', ph: '••••••••' },
          ].map(field => (
            <div key={field.key}>
              <label style={{ display: 'block', color: '#9999aa', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t(field.label)}</label>
              <input type={field.type} value={(form as any)[field.key]} onChange={set(field.key)} required placeholder={field.ph} />
            </div>
          ))}
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>{t('register_btn')}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#9999aa', fontSize: '0.85rem' }}>
          {t('register_have_account')}{' '}<Link href="/login" style={{ color: '#c9a84c', textDecoration: 'none' }}>{t('nav_login')}</Link>
        </p>
      </div>
    </div>
  )
}
export default function RegisterPage() { return <AppProvider><RegisterForm /></AppProvider> }
