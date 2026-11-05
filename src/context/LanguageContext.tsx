import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types.ts';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  t: typeof translations.en;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('rayees_designs_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Warm up and pre-cache both font families so switching languages is instantaneous with zero flicker
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.load('400 16px "Manrope"').catch(() => {});
      document.fonts.load('500 16px "Manrope"').catch(() => {});
      document.fonts.load('600 16px "Manrope"').catch(() => {});
      document.fonts.load('400 16px "IBM Plex Sans Arabic"').catch(() => {});
      document.fonts.load('500 16px "IBM Plex Sans Arabic"').catch(() => {});
      document.fonts.load('600 16px "IBM Plex Sans Arabic"').catch(() => {});
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('rayees_designs_lang', lang);
    } catch {
      // ignore
    }
  }, [lang, dir]);

  const toggleLanguage = () => {
    setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, dir, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
