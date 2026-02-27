'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function CTASection() {
  const { t } = useI18n();
  return (
    <section className="section-shell bg-bgSecondary">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gold/40 bg-bgCard p-10 text-center shadow-[0_0_22px_rgba(108,71,255,.2)]">
        <h2 className="text-3xl font-semibold">{t('cta.title')}</h2>
        <p className="mt-4 text-textSecondary">{t('cta.subtitle')}</p>
        <Link className="btn-premium mt-8 inline-flex" href="/register">
          {t('cta.button')}
        </Link>
      </div>
    </section>
  );
}
