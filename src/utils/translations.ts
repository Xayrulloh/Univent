import ru from '../content/i18n/ru.json';
import uz from '../content/i18n/uz.json';
import en from '../content/i18n/en.json';

export const translations = {
  ru,
  uz,
  en
} as const;

export type Locale = keyof typeof translations;

export function getTranslation(locale: string = 'ru') {
  const safeLocale = (locale in translations) ? locale as Locale : 'ru';

  return translations[safeLocale];
}

export function getCurrentLocale(url: URL): Locale {
  const pathParts = url.pathname.split('/').filter(Boolean);
  const possibleLocale = pathParts[0];
  
  return (possibleLocale in translations) ? possibleLocale as Locale : 'ru';
}