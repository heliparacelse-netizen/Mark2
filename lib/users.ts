'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { AppProvider, useApp } from '../../lib/store'

const MAX_FREE = 3

const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room']
const styles = ['Modern', 'Scandinavian', 'Industrial', 'Bohemian', 'Minimalist', 'Art Deco', 'Mediterranean', 'Japandi']

function StudioContent() {
  const { t, generations, setGenerations, plan, watermarkType, customWatermarkUrl } = useApp()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0])
  const [selectedStyle, setSelectedStyle] = useState(styles[0])
  const [generating, setGenerating] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }, [])

  const handleGenerate = async () => {
    if (plan === 'free' && generations >= MAX_FREE) {
      setShowUpgradeModal(true)
      return
    }
    setGenerating(true)
    // Simulate AI generation (replace with real API call)
    await new Promise(r => setTimeout(r, 2500))
    // Use uploaded image as placeholder for generated result
    setGeneratedImage(uploadedImage)
    const newGen = generations + 1
    setGenerations(newGen)
    localStorage.setItem('designai_gens', String(newGen))
    setGenerating(false)
  }

  const limitReached = plan === 'free' && generations >= MAX_FREE

  // Determine watermark to show
  const showDesignAIWatermark = watermarkType === 'designai' || (plan === 'free')
  const showCustomWatermark = plan !== 'free' && watermarkType === 'custom' && customWatermarkUrl
  const showNoWatermark = plan !== 'free' && watermarkType === 'none'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: '#9999aa', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ← Dashboard
        </Link>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700 }}>Design<span style={{ color: '#c9a84c' }}>AI</span> Studio</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: '#9999aa', fontSize: '0.8rem' }}>{generations}/{plan === 'free' ? MAX_FREE : '∞'} gens</span>
          {limitReached && <Link href="/#pricing"><button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>Upgrade</button></Link>}
        </div>
      </header>

      {/* Main studio layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '380px 1fr', gap: 0 }}>
        {/* Left panel - Controls */}
        <aside style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          {/* Upload */}
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('studio_upload')}</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={onDrop}
              onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              style={{
                border: `2px dashed ${isDragging ? '#c9a84c' : uploadedImage ? 'rgba(201,168,76,0.4)' : 'var(--border)'}`,
                borderRadius: '8px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer',
                background: isDragging ? 'rgba(201,168,76,0.05)' : 'transparent',
                transition: 'all 0.2s', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
              {uploadedImage ? (
                <img src={uploadedImage} alt="uploaded" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
              ) : (
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.4 }}>⬆</div>
                  <div style={{ color: '#9999aa', fontSize: '0.8rem' }}>Drop image or click to browse</div>
                  <div style={{ color: '#9999aa', fontSize: '0.7rem', marginTop: '0.25rem' }}>JPG, PNG, WEBP • max 20MB</div>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {/* Room type */}
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('studio_room')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {roomTypes.map(r => (
                <button key={r} onClick={() => setSelectedRoom(r)} style={{
                  padding: '0.5rem', borderRadius: '6px', border: `1px solid ${selectedRoom === r ? 'rgba(201,168,76,0.6)' : 'var(--border)'}`,
                  background: selectedRoom === r ? 'rgba(201,168,76,0.1)' : 'transparent',
                  color: selectedRoom === r ? '#c9a84c' : '#9999aa', cursor: 'pointer', fontSize: '0.75rem', transition: 'all 0.2s',
                  fontFamily: 'DM Sans, sans-serif'
                }}>{r}</button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label style={{ display: 'block', color: '#9999aa', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('studio_style')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {styles.map(s => (
                <button key={s} onClick={() => setSelectedStyle(s)} style={{
                  padding: '0.5rem', borderRadius: '6px', border: `1px solid ${selectedStyle === s ? 'rgba(108,71,255,0.6)' : 'var(--border)'}`,
                  background: selectedStyle === s ? 'rgba(108,71,255,0.1)' : 'transparent',
                  color: selectedStyle === s ? '#9c7fff' : '#9999aa', cursor: 'pointer', fontSize: '0.75rem', transition: 'all 0.2s',
                  fontFamily: 'DM Sans, sans-serif'
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Watermark info */}
          {plan === 'free' && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '6px' }}>
              <div style={{ color: '#c9a84c', fontSize: '0.75rem', fontWeight: 500 }}>✦ Free Plan</div>
              <div style={{ color: '#9999aa', fontSize: '0.72rem', marginTop: '0.25rem' }}>DesignAI watermark will be applied</div>
            </div>
          )}

          {/* Generate button */}
          <button
            className="btn-primary"
            onClick={handleGenerate}
            disabled={!uploadedImage || generating || limitReached}
            style={{ width: '100%', padding: '1rem', fontSize: '0.9rem', opacity: (!uploadedImage || limitReached) ? 0.5 : 1, cursor: (!uploadedImage || limitReached) ? 'not-allowed' : 'pointer' }}>
            {generating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#0a0a0f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Generating...
              </span>
            ) : limitReached ? t('studio_limit') : t('studio_generate')}
          </button>
        </aside>

        {/* Right panel - Result */}
        <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 700, color: '#9999aa' }}>
            Result — <span style={{ color: '#c9a84c' }}>{selectedStyle} {selectedRoom}</span>
          </div>

          <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
            {generating ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', border: '3px solid rgba(201,168,76,0.2)', borderTopColor: '#c9a84c', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#c9a84c' }}>Generating your design...</div>
                <div style={{ color: '#9999aa', fontSize: '0.8rem', marginTop: '0.5rem' }}>This may take a few seconds</div>
              </div>
            ) : generatedImage ? (
              <>
                <img src={generatedImage} alt="generated" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                {/* Watermark overlay */}
                {showDesignAIWatermark && (
                  <div className="watermark-overlay">
                    <span className="watermark-text">DesignAI</span>
                  </div>
                )}
                {showCustomWatermark && (
                  <div className="watermark-overlay" style={{ alignItems: 'flex-end', justifyContent: 'flex-end', padding: '1.5rem' }}>
                    <img src={customWatermarkUrl} alt="watermark" style={{ height: '48px', objectFit: 'contain', opacity: 0.7, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                  </div>
                )}
                {/* Download button */}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <a download="designai-render.png" href={generatedImage}>
                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>⬇ Download</button>
                  </a>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', opacity: 0.4 }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>◈</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>Your render will appear here</div>
                <div style={{ color: '#9999aa', fontSize: '0.8rem', marginTop: '0.5rem' }}>Upload an image and click Generate</div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#c9a84c' }}>✦</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>{t('studio_limit')}</h2>
            <p style={{ color: '#9999aa', marginBottom: '2rem', lineHeight: 1.7, fontSize: '0.9rem' }}>{t('studio_upgrade_modal')}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/#pricing" onClick={() => setShowUpgradeModal(false)}>
                <button className="btn-primary">{t('dash_upgrade')}</button>
              </Link>
              <button className="btn-outline" onClick={() => setShowUpgradeModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .studio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default function StudioPage() { return <AppProvider><StudioContent /></AppProvider> }
