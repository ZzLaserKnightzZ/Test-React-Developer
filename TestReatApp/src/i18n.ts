import th from './translate/translateTh.json';
import en from './translate/translateEN.json';
import i18next from 'i18next';
import {initReactI18next} from "react-i18next"

export const resources = {
  en: {
    translation:en
  },
  th:{
    translation:th
  }
} as const;

i18next.use(initReactI18next).init({resources,lng:"en"});


export default i18next;