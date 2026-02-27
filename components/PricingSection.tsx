'use client';

import { useI18n } from '@/lib/i18n';

const plans = [
  { key: 'free', price: '0€', paid: false },
  { key: 'starter', price: '9€', paid: true },
  { key: 'pro', price: '19€', paid: true },
  { key: 'studio', price: '39€', paid: true }
];

export default function PricingSection() {
  const { t } = useI18n();

  const checkout = async (plan: string) => {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    });
    const data = await response.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <section id="pricing" className="section-shell bg-bgSecondary">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold">{t('pricing.title')}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.key} className="rounded-2xl border border-borderDark bg-bgCard p-6">
              <h3 className="text-xl text-goldLight">{t(`pricing.${plan.key}`)}</h3>
              <p className="mt-4 text-3xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-textSecondary">
                <li>{t(plan.paid ? 'pricing.paidFeature1' : 'pricing.freeFeature1')}</li>
                <li>{t(plan.paid ? 'pricing.paidFeature2' : 'pricing.freeFeature2')}</li>
                <li>{t(plan.paid ? 'pricing.paidFeature3' : 'pricing.freeFeature3')}</li>
              </ul>
              <button
                onClick={() => (plan.paid ? checkout(plan.key) : undefined)}
                className={`mt-6 w-full rounded-xl px-4 py-3 transition duration-200 ${plan.paid ? 'btn-premium' : 'border border-borderDark text-textSecondary'}`}
              >
                {t(plan.paid ? 'pricing.buttonPaid' : 'pricing.buttonFree')}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
