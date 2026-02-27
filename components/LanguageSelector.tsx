'use client';

import { languageOptions, useI18n } from '@/lib/i18n';

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as typeof locale)}
      className="rounded-lg border border-borderDark bg-bgCard px-3 py-2 text-sm text-textPrimary"
    >
      {languageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
