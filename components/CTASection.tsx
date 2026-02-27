'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AppProvider, useApp } from '../../lib/store'

const MAX_FREE = 3

function DashboardContent() {
  const { t, generations, plan, watermarkType, setWatermarkType, customWatermarkUrl, setCustomWatermarkUrl } = useApp()
  const [upgraded, setUpgraded] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('upgraded') === 'true') setUpgraded(true)
  }, [])

  const usagePercent = plan === 'free' ? Math.min((generations / MAX_FREE) * 100, 100) : Math.min((generations / 200) * 100, 100)

  const handleWmUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setCustomWatermarkUrl(url)
      localStorage.setItem('designai_wm_url', url)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: '100vh' }}>
        <Link href="/" style={{ textDecoration: 'none', marginBottom: '2rem', display: 'block' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700 }}>Design<span style={{ color: '#c9a84c' }}>AI</span></div>
        </Link>
        {[
          { label: 'Dashboard', href: '/dashboard', icon: '◈', active: true },
          { label: 'Studio', href: '/studio', icon: '✦', active: false },
          { label: 'Settings', href: '#', icon: '◎', active: false },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '6px',
              background: item.active ? 'rgba(201,168,76,0.1)' : 'transparent',
              border: item.active ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
              color: item.active ? '#c9a84c' : '#9999aa', fontSize: '0.85rem', transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.7rem', color: '#9999aa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Current Plan</div>
          <div style={{ color: '#c9a84c', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 700, textTransform: 'capitalize' }}>{plan}</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '3rem', overflow: 'auto' }}>
        {upgraded && (
          <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#c9a84c', fontSize: '1.25rem' }}>✦</span>
            <span style={{ color: '#c9a84c', fontSize: '0.9rem' }}>Plan upgraded successfully! Welcome to DesignAI Pro.</span>
          </div>
        )}

        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t('dash_welcome')}, <span style={{ color: '#c9a84c' }}>Designer</span>
          </h1>
          <p style={{ color: '#9999aa', fontSize: '0.9rem' }}>Manage your projects and settings</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { label: t('dash_generations'), value: `${generations}/${plan === 'free' ? MAX_FREE : '∞'}`, color: '#c9a84c' },
            { label: 'Projects', value: '0', color: '#6c47ff' },
            { label: 'This Month', value: '0', color: '#f0c96e' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ padding: '1.75rem' }}>
              <div style={{ color: '#9999aa', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Usage bar */}
        {plan === 'free' && (
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('dash_generations')}</div>
                <div style={{ color: '#9999aa', fontSize: '0.8rem' }}>{t('free_gen')}</div>
              </div>
              {generations >= MAX_FREE && (
                <Link href="/#pricing"><button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>{t('dash_upgrade')}</button></Link>
              )}
            </div>
            <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${usagePercent}%`, background: usagePercent >= 100 ? 'linear-gradient(90deg, #ff4444, #ff6666)' : 'linear-gradient(90deg, #c9a84c, #f0c96e)', borderRadius: '4px', transition: 'width 0.5s' }} />
            </div>
            <div style={{ color: '#9999aa', fontSize: '0.75rem', marginTop: '0.5rem' }}>{generations} / {MAX_FREE} generations used</div>
          </div>
        )}

        {/* Watermark Settings */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Watermark Settings
          </h2>
          
          {plan === 'free' ? (
            <div style={{ padding: '1.5rem', background: 'rgba(201,168,76,0.05)', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.15)' }}>
              <p style={{ color: '#9999aa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Free plan: DesignAI watermark is applied to all generations.</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                <span style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>✦ DesignAI Watermark Active</span>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Link href="/#pricing"><button className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}>Upgrade to customize →</button></Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { value: 'none', label: t('wm_none'), desc: 'No watermark on your generations' },
                { value: 'designai', label: t('wm_designai'), desc: 'Keep the DesignAI branding' },
                { value: 'custom', label: t('wm_custom'), desc: 'Upload your own logo or watermark' },
              ].map(opt => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem',
                  background: watermarkType === opt.value ? 'rgba(201,168,76,0.08)' : 'var(--bg-card)',
                  border: `1px solid ${watermarkType === opt.value ? 'rgba(201,168,76,0.4)' : 'var(--border)'}`,
                  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  <input type="radio" name="watermark" value={opt.value} checked={watermarkType === opt.value}
                    onChange={() => { setWatermarkType(opt.value as any); localStorage.setItem('designai_wm', opt.value) }}
                    style={{ accentColor: '#c9a84c', marginTop: '2px', width: 'auto' }} />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>{opt.label}</div>
                    <div style={{ color: '#9999aa', fontSize: '0.8rem' }}>{opt.desc}</div>
                    {opt.value === 'custom' && watermarkType === 'custom' && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <input type="file" accept="image/*" onChange={handleWmUpload}
                          style={{ display: 'none' }} id="wm-upload" />
                        <label htmlFor="wm-upload" style={{ cursor: 'pointer' }}>
                          <span className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', display: 'inline-block' }}>{t('wm_upload')}</span>
                        </label>
                        {customWatermarkUrl && (
                          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={customWatermarkUrl} alt="watermark preview" style={{ height: '40px', objectFit: 'contain', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px', background: 'rgba(255,255,255,0.05)' }} />
                            <span style={{ color: '#9999aa', fontSize: '0.75rem' }}>Logo uploaded ✓</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.3 }}>◈</div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>{t('dash_no_projects')}</h3>
          <p style={{ color: '#9999aa', marginBottom: '2rem' }}>{t('dash_start_gen')}</p>
          <Link href="/studio"><button className="btn-primary">{t('dash_start_gen')} →</button></Link>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() { return <AppProvider><DashboardContent /></AppProvider> }
