// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역할 내용
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to React"
    }
  },
  ko: {
    translation: {
      "welcome": "리액트에 오신 것을 환영합니다"
    }
  }
};

i18n
  .use(initReactI18next) // i18next를 리액트와 연동
  .init({
    resources, // 위에서 정의한 번역 내용
    lng: "en", // 기본 언어 설정
    keySeparator: false, // 키 구분자 사용 안함
    interpolation: {
      escapeValue: false // XSS 보호를 위해 false 설정
    }
  });

export default i18n;