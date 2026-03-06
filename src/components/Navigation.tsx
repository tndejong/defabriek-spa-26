import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Language } from '../App';
import { track } from '../lib/analytics';

interface NavigationProps {
  currentSection: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  language,
  onLanguageChange,
  onNavigate
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'park', label: { nl: 'Park', en: 'Park', de: 'Park' } },
    { id: 'kosten', label: { nl: 'Kosten', en: 'Costs', de: 'Kosten' } },
    { id: 'open', label: { nl: 'Open', en: 'Open', de: 'Öffnen' } },
    { id: 'verhaal', label: { nl: 'Verhaal', en: 'Story', de: 'Geschichte' } },
    { id: 'lessen', label: { nl: 'Lessen', en: 'Lessons', de: 'Lektionen' } },
    { id: 'team', label: { nl: 'Bestuur', en: 'Board', de: 'Vorstand' } },
    { id: 'contact', label: { nl: 'Contact', en: 'Contact', de: 'Kontakt' } },
  ];

  const languages = [
    { code: 'nl' as Language, name: 'NL', flag: '🇳🇱' },
    { code: 'en' as Language, name: 'EN', flag: '🇬🇧' },
    { code: 'de' as Language, name: 'DE', flag: '🇩🇪' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl bg-white/80 border-b border-white/20"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/logo.png"
                alt="De Fabriek Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-gradient">De Fabriek</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-600'
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label[language]}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-100 rounded-lg -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}

            </div>

            {/* Language Switcher & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher - Dropdown */}
              <div className="hidden sm:block relative">
                <select
                  value={language}
                  onChange={(e) => { const lang = e.target.value as Language; track('language_change', { to: lang }); onLanguageChange(lang); }}
                  className="appearance-none bg-white/80 border border-neutral-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-neutral-700 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer min-w-[5rem]"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass backdrop-blur-xl bg-white/95 border-b border-white/20 lg:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Language Switcher - Dropdown */}
              <div className="mb-6">
                <label htmlFor="mobile-lang" className="sr-only">Taal</label>
                <select
                  id="mobile-lang"
                  value={language}
                  onChange={(e) => {
                    const lang = e.target.value as Language;
                    track('language_change', { to: lang });
                    onLanguageChange(lang);
                    setIsMenuOpen(false);
                  }}
                  className="w-full appearance-none bg-neutral-50 border border-neutral-300 rounded-lg px-4 py-3 text-base font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item, index) => {
                const isActive = currentSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label[language]}
                    {isActive && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Active
                      </Badge>
                    )}
                  </motion.button>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

