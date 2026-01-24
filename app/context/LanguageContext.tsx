'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

type LanguageCode = 'US' | 'IT' | 'DE' | 'ES' | 'PT' | 'RO' | 'RU';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (code: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<LanguageCode>('US');
    const isInitialMount = useRef(true);

    useEffect(() => {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            setLanguage(savedLang as LanguageCode);
        }
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        localStorage.setItem('selectedLanguage', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
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
