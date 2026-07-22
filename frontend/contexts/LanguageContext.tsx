import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { translations, detectLanguage } from '../services/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('vault_lang') as Language;
    if (savedLang && ['en', 'pt', 'es'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      setLanguage(detectLanguage());
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vault_lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
