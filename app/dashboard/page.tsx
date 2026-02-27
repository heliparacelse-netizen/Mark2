'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useI18n } from '@/lib/i18n';

export default function DashboardPage() {
  const { data: session } = useSession();
  const { t } = useI18n();
  const [used, setUsed] = useState(0);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch('/api/usage').then(async (res) => {
      const data = await res.json();
      setUsed(data.used ?? 0);
    });
  }, [session?.user?.email]);

  const percent = Math.min((used / 3) * 100, 100);

  return (
    <main>
      <Navbar />
      <section className="section-shell pt-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row">
          <DashboardSidebar />
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-semibold">{t('dashboard.title')}</h1>
            <div className="rounded-2xl border border-borderDark bg-bgCard p-6">
              <p>{t('dashboard.usage', { used })}</p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-bgSecondary">
                <div className="h-full bg-gradient-to-r from-gold to-goldLight" style={{ width: `${percent}%` }} />
              </div>
              {used >= 3 && (
                <Link href="/#pricing" className="btn-premium mt-4 inline-flex text-sm">
                  {t('dashboard.upgrade')}
                </Link>
              )}
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[['dashboard.projects', '0'], ['dashboard.renders', String(used)], ['dashboard.hours', '12']].map(([label, value]) => (
                <article key={label} className="rounded-2xl border border-borderDark bg-bgCard p-6">
                  <p className="text-sm text-textSecondary">{t(label)}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </article>
              ))}
            </div>
            <article className="rounded-2xl border border-dashed border-borderDark bg-bgCard p-10 text-center text-textSecondary">
              {t('dashboard.empty')}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
