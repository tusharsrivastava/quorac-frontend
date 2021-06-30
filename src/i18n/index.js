import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUS from './en';
import hiIN from "./hi";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enUS,
      },
      hi: {
        translation: hiIN,
      },
    },
  });

export const languages = [
  { key: "en-US", icon: "En", name: "English" },
  { key: "hi-IN", icon: "हि", name: "हिन्दी" },
];

export default i18n;
