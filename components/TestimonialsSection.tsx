'use client';

import FadeSection from '@/components/FadeSection';
import { useI18n } from '@/lib/i18n';

export default function TestimonialsSection() {
  const { t } = useI18n();
  return (
    <section id="testimonials" className="section-shell">
      <FadeSection className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold">{t('testimonials.title')}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[1, 2].map((id) => (
            <blockquote key={id} className="rounded-2xl border border-borderDark bg-bgCard p-6">
              <p className="text-textPrimary">“{t(`testimonials.quote${id}`)}”</p>
              <footer className="mt-3 text-sm text-goldLight">{t(`testimonials.author${id}`)}</footer>
            </blockquote>
          ))}
        </div>
      </FadeSection>
    </section>
  );
}
