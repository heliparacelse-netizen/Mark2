'use client';

import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-borderDark px-6 py-8 text-center text-sm text-textSecondary">
      © 2026 MARK2. {t('footer.copy')}
    </footer>
  );
}
