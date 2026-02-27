'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useApp } from '../lib/store'
import { languages } from '../lib/i18n'

export default function Navbar() {
  const { t, lang, setLang } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(42,42,58,0.8)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #c9a84c, #6c47ff)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: '1rem' }}>D</span>
          </div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, color: '#f5f5f0', letterSpacing: '0.02em' }}>
            Design<span style={{ color: '#c9a84c' }}>AI</span>
          </span>
        </Link>

        {/* Nav links - desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {['nav_home','nav_features','nav_pricing'].map(k => (
            <a key={k} href={k === 'nav_home' ? '#hero' : k === 'nav_features' ? '#features' : '#pricing'}
              style={{ color: '#9999aa', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as any).style.color = '#c9a84c'}
              onMouseLeave={e => (e.target as any).style.color = '#9999aa'}>
              {t(k)}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language selector */}
          <select value={lang} onChange={e => setLang(e.target.value as any)}
            style={{ background: 'transparent', border: '1px solid #2a2a3a', color: '#9999aa', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}>
            {languages.map(l => <option key={l} value={l} style={{ background: '#16161f' }}>{l.toUpperCase()}</option>)}
          </select>
          <Link href="/login" style={{ color: '#9999aa', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('nav_login')}</Link>
          <Link href="/register">
            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>{t('nav_start')}</button>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </nav>
  )
}
