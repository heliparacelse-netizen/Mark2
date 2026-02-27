'use client'
import { useApp } from '../lib/store'

const icons = ['✦','◈','◎','❋']

export default function FeaturesSection() {
  const { t } = useApp()
  const feats = [
    { key: 'feat1', icon: icons[0] },
    { key: 'feat2', icon: icons[1] },
    { key: 'feat3', icon: icons[2] },
    { key: 'feat4', icon: icons[3] },
  ]

  return (
    <section id="features" style={{ padding: '8rem 2rem', background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 500 }}>Features</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '1rem' }}>{t('feat_title')}</h2>
          <p style={{ color: '#9999aa', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>{t('feat_sub')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {feats.map((f, i) => (
            <div key={f.key} className="card" style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden', animationDelay: `${i * 0.1}s` }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'radial-gradient(circle at top right, rgba(201,168,76,0.1), transparent)', borderRadius: '0 8px 0 80px' }} />
              <div style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#c9a84c', fontFamily: 'Cormorant Garamond, serif' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{t(f.key + '_t')}</h3>
              <p style={{ color: '#9999aa', lineHeight: 1.7, fontSize: '0.9rem' }}>{t(f.key + '_d')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
