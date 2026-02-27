'use client';

import FadeSection from '@/components/FadeSection';
import { useI18n } from '@/lib/i18n';

export default function HowItWorksSection() {
  const { t } = useI18n();
  return (
    <section id="how" className="section-shell">
      <FadeSection className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold">{t('how.title')}</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((step) => (
            <li key={step} className="rounded-2xl border border-borderDark bg-bgCard p-6">
              <span className="text-gold">0{step}</span>
              <p className="mt-2 text-textSecondary">{t(`how.step${step}`)}</p>
            </li>
          ))}
        </ol>
      </FadeSection>
    </section>
  );
}
