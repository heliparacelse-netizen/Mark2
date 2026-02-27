'use client';

import Link from 'next/link';
import FadeSection from '@/components/FadeSection';
import { useI18n } from '@/lib/i18n';

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="section-shell flex items-center justify-center pt-32">
      <FadeSection className="mx-auto max-w-4xl text-center">
        <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs text-goldLight">{t('hero.badge')}</span>
        <h1 className="mt-6 bg-gradient-to-r from-goldLight via-purple to-gold bg-[length:200%_200%] bg-clip-text text-4xl font-bold text-transparent animate-gradient md:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-textSecondary">{t('hero.subtitle')}</p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/register" className="btn-premium">{t('hero.ctaPrimary')}</Link>
          <Link href="/studio" className="rounded-xl border border-borderDark px-6 py-3 transition duration-200 hover:border-gold hover:text-goldLight">{t('hero.ctaSecondary')}</Link>
        </div>
      </FadeSection>
    </section>
  );
}
