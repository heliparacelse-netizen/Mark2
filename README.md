'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useI18n } from '@/lib/i18n'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { href: '/studio', label: 'Studio', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { t } = useI18n()

  return (
    <aside className="w-60 bg-[#111118] border-r border-[#2a2a3a] flex flex-col h-full fixed left-0 top-0 bottom-0 z-30">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a3a]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#6c47ff] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L8 3L13 13H3Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-[#f5f5f0]">
            Design<span className="text-gold-gradient">AI</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
              pathname === item.href
                ? 'bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/20'
                : 'text-[#9999aa] hover:text-[#f5f5f0] hover:bg-[#16161f]'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#2a2a3a]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#16161f] border border-[#2a2a3a] mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6c47ff]/40 to-[#c9a84c]/40 flex items-center justify-center text-xs font-bold text-[#f5f5f0]">
            {session?.user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#f5f5f0] truncate">{session?.user?.name}</p>
            <p className="text-xs text-[#9999aa] truncate">{session?.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full text-left px-4 py-2 text-xs text-[#9999aa] hover:text-[#f5f5f0] transition-colors rounded-lg hover:bg-[#16161f]"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
