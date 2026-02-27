'use client';

import FadeSection from '@/components/FadeSection';
import { useI18n } from '@/lib/i18n';

export default function FeaturesSection() {
  const { t } = useI18n();
  return (
    <section id="features" className="section-shell bg-bgSecondary">
      <FadeSection className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold">{t('features.title')}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((id) => (
            <article key={id} className="rounded-2xl border border-borderDark bg-bgCard p-6 transition duration-200 hover:shadow-[0_0_18px_rgba(201,168,76,.25)]">
              <h3 className="text-xl text-goldLight">{t(`features.card${id}.title`)}</h3>
              <p className="mt-3 text-textSecondary">{t(`features.card${id}.desc`)}</p>
            </article>
          ))}
        </div>
      </FadeSection>
    </section>
  );
}
