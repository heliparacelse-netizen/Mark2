'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import it from '@/locales/it.json';
import pt from '@/locales/pt.json';
import nl from '@/locales/nl.json';
import ja from '@/locales/ja.json';
import zh from '@/locales/zh.json';
import ko from '@/locales/ko.json';
import ar from '@/locales/ar.json';

type Locale = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'nl' | 'ja' | 'zh' | 'ko' | 'ar';
type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = { en, fr, es, de, it, pt, nl, ja, zh, ko, ar };

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}>({ locale: 'en', setLocale: () => undefined, t: (key) => key });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Locale | null;
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('lang', next);
  };

  const t = useMemo(() => {
    return (key: string, vars?: Record<string, string | number>) => {
      const template = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
      if (!vars) return template;
      return Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)), template);
    };
  }, [locale]);

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const languageOptions: Array<{ value: Locale; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'fr', label: 'FR' },
  { value: 'es', label: 'ES' },
  { value: 'de', label: 'DE' },
  { value: 'it', label: 'IT' },
  { value: 'pt', label: 'PT' },
  { value: 'nl', label: 'NL' },
  { value: 'ja', label: 'JA' },
  { value: 'zh', label: 'ZH' },
  { value: 'ko', label: 'KO' },
  { value: 'ar', label: 'AR' }
];
