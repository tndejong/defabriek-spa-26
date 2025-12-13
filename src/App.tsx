import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ParkSection from './components/sections/ParkSection';
import KostenSection from './components/sections/KostenSection';
import OpenSection from './components/sections/OpenSection';
import VerhaalSection from './components/sections/VerhaalSection';
import LessenSection from './components/sections/LessenSection';
import TeamSection from './components/sections/TeamSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';

export type Language = 'nl' | 'en' | 'de';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'park', 'kosten', 'open', 'verhaal', 'lessen', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        <Navigation
          currentSection={currentSection}
          language={language}
          onLanguageChange={setLanguage}
          onNavigate={scrollToSection}
        />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero language={language} onNavigate={scrollToSection} />
                <ParkSection language={language} />
                <KostenSection language={language} />
                <OpenSection language={language} />
                <VerhaalSection language={language} />
                <LessenSection language={language} />
                <TeamSection language={language} />
                <ContactSection language={language} />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>

        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;
