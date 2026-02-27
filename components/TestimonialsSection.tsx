'use client'
import { useState } from 'react'
import Link from 'next/link'
import { AppProvider, useApp } from '../../lib/store'

function LoginForm() {
  const { t } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--bg-primary)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(108,71,255,0.12) 0%, transparent 60%)' }} />
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Design<span style={{ color: '#c9a84c' }}>AI</span></div>
          </Link>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700 }}>{t('login_title')}</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('login_email')}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('login_pass')}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>{t('login_btn')}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#9999aa', fontSize: '0.85rem' }}>
          {t('login_no_account')}{' '}<Link href="/register" style={{ color: '#c9a84c', textDecoration: 'none' }}>{t('login_register')}</Link>
        </p>
      </div>
    </div>
  )
}
export default function LoginPage() { return <AppProvider><LoginForm /></AppProvider> }
