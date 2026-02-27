'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import LanguageSelector from '@/components/LanguageSelector';
import { useI18n } from '@/lib/i18n';

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useI18n();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-borderDark/70 bg-bgPrimary/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-goldLight">
          MARK2
        </Link>
        <nav className="hidden gap-6 text-sm text-textSecondary md:flex">
          <a href="#features">{t('nav.features')}</a>
          <a href="#how">{t('nav.howItWorks')}</a>
          <a href="#pricing">{t('nav.pricing')}</a>
          <a href="#testimonials">{t('nav.testimonials')}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          {session ? (
            <>
              <Link className="rounded-lg border border-borderDark px-4 py-2" href="/dashboard">
                {t('nav.dashboard')}
              </Link>
              <button className="rounded-lg border border-borderDark px-4 py-2" onClick={() => signOut({ callbackUrl: '/' })}>
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link className="rounded-lg border border-borderDark px-4 py-2" href="/login">
                {t('nav.login')}
              </Link>
              <Link className="btn-premium text-sm" href="/register">
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
