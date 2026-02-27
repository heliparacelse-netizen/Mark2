export const languages = ['en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar']

export const LANGUAGES = languages.map((code) => {
  const label = code.toUpperCase()
  const flagMap: Record<string, string> = {
    en: '🇺🇸',
    fr: '🇫🇷',
    es: '🇪🇸',
    de: '🇩🇪',
    it: '🇮🇹',
    pt: '🇵🇹',
    ru: '🇷🇺',
    zh: '🇨🇳',
    ja: '🇯🇵',
    ko: '🇰🇷',
    ar: '🇸🇦',
  }
  return {
    code,
    label,
    flag: flagMap[code] || '',
  }
})

// simple stub for internationalization hook used in components
export function useI18n() {
  const lang = 'en'
  function t(key: string) {
    // in a real app we'd look up translations by lang
    return key
  }
  const setLang = (l: string) => {}
  return { t, lang, setLang }
}
