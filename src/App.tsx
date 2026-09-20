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

  const HEADER_OFFSET = 88;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      navigate(`/#${sectionId}`);
      return;
    }

    const targetY = () =>
      Math.max(0, element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);

    window.scrollTo({ top: targetY(), behavior: 'smooth' });

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    window.addEventListener('wheel', cancel, { passive: true, once: true });
    window.addEventListener('touchstart', cancel, { passive: true, once: true });

    const realign = () => {
      if (cancelled) return;
      const y = targetY();
      if (Math.abs(window.scrollY - y) > 32) {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    window.setTimeout(realign, 500);
    window.setTimeout(realign, 1200);
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
