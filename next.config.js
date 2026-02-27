'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useApp } from '../lib/store'

export default function HeroSection() {
  const { t } = useApp()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{x:number,y:number,vx:number,vy:number,size:number,opacity:number,color:string}> = []
    const colors = ['#c9a84c','#f0c96e','#6c47ff','#9c7fff']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2,'0')
        ctx.fill()
      })
      // draw lines between close particles
      particles.forEach((p, i) => {
        particles.slice(i+1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(201,168,76,${0.05 * (1 - dist/120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section id="hero" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '72px' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }} />
      
      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(108,71,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', zIndex: 1, padding: '2rem', maxWidth: '900px' }}>
        {/* Tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '2rem', animation: 'fadeInUp 0.5s ease forwards' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a84c', animation: 'pulse-gold 2s infinite' }} />
          <span style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{t('hero_tag')}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          animation: 'fadeInUp 0.6s ease 0.1s both',
          whiteSpace: 'pre-line'
        }}>
          <span className="gradient-text">{t('hero_title')}</span>
        </h1>

        {/* Sub */}
        <p style={{ color: '#9999aa', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7, animation: 'fadeInUp 0.6s ease 0.2s both' }}>
          {t('hero_sub')}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeInUp 0.6s ease 0.3s both' }}>
          <Link href="/register"><button className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.9rem 2.5rem' }}>{t('hero_cta')}</button></Link>
          <a href="#features"><button className="btn-outline" style={{ fontSize: '0.9rem', padding: '0.9rem 2.5rem' }}>{t('hero_cta2')}</button></a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '4rem', animation: 'fadeInUp 0.6s ease 0.4s both', flexWrap: 'wrap' }}>
          {[['10K+', 'Designers'], ['50K+', 'Renderings'], ['99%', 'Satisfaction']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: '#c9a84c' }}>{num}</div>
              <div style={{ color: '#9999aa', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', animation: 'float 3s ease-in-out infinite' }}>
        <span style={{ color: '#9999aa', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
      </div>
    </section>
  )
}
