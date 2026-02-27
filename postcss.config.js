'use client'
import { useState } from 'react'
import { useI18n, LANGUAGES } from '@/lib/i18n'

export default function LanguageSelector() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[#9999aa] hover:text-[#f5f5f0] text-sm transition-colors px-2 py-1 rounded-lg hover:bg-[#16161f]"
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 12 12">
          <path d="M2 4l4 4 4-4"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-44 bg-[#16161f] border border-[#2a2a3a] rounded-xl shadow-2xl overflow-hidden z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#2a2a3a] ${lang === l.code ? 'text-[#c9a84c]' : 'text-[#9999aa]'}`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
