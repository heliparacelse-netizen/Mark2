'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function DashboardSidebar() {
  const { t } = useI18n();
  return (
    <aside className="w-full rounded-2xl border border-borderDark bg-bgCard p-5 md:w-64">
      <nav className="space-y-3 text-sm text-textSecondary">
        <Link href="/dashboard" className="block rounded-lg px-3 py-2 hover:bg-bgSecondary">{t('sidebar.overview')}</Link>
        <Link href="/studio" className="block rounded-lg px-3 py-2 hover:bg-bgSecondary">{t('sidebar.studio')}</Link>
        <a href="#pricing" className="block rounded-lg px-3 py-2 hover:bg-bgSecondary">{t('sidebar.billing')}</a>
      </nav>
    </aside>
  );
}
