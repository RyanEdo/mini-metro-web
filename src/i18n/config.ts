
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from './locales/en.json';
import translation_zh from './locales/zh.json';
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  en: { translation: translation_en },
  zh: { translation: translation_zh },
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
