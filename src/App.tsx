import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';

export type Language = 'nl' | 'en' | 'de';

export interface AppContext {
  language: Language;
  setLanguage: (lang: Language) => void;
  scrollToSection: (id: string) => void;
  setCurrentSection: (section: string) => void;
}

function App() {
  const [language, setLanguage] = useState<Language>('nl');
  const [currentSection, setCurrentSection] = useState('home');

  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      navigate(`/#${sectionId}`);
      return;
    }
    const y = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 88);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        <Navigation
          currentSection={currentSection}
          language={language}
          onLanguageChange={setLanguage}
          onNavigate={scrollToSection}
        />
        <Outlet context={{ language, setLanguage, scrollToSection, setCurrentSection } satisfies AppContext} />
        <Footer language={language} />
        <FloatingActions language={language} />
      </div>
    </HelmetProvider>
  );
}

export default App;
