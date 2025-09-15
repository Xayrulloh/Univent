import ru from '../content/i18n/ru.json';
import uz from '../content/i18n/uz.json';
import en from '../content/i18n/en.json';

export const translations = {
  ru,
  uz,
  en
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof ru;

export function getTranslation(locale: Locale = 'ru') {
  return translations[locale] || translations.ru;
}

export function getCurrentLocale(url: URL): Locale {
  const pathParts = url.pathname.split('/').filter(Boolean);
  const possibleLocale = pathParts[0] as Locale;
  
  return Object.keys(translations).includes(possibleLocale) 
    ? possibleLocale 
    : 'ru';
}