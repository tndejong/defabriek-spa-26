import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Language } from '../App';

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

  const navItems = [
    { id: 'home', label: { nl: 'Home', en: 'Home', de: 'Start' } },
    { id: 'park', label: { nl: 'Park', en: 'Park', de: 'Park' } },
    { id: 'kosten', label: { nl: 'Kosten', en: 'Costs', de: 'Kosten' } },
    { id: 'open', label: { nl: 'Open', en: 'Open', de: 'Öffnen' } },
    { id: 'verhaal', label: { nl: 'Verhaal', en: 'Story', de: 'Geschichte' } },
    { id: 'lessen', label: { nl: 'Lessen', en: 'Lessons', de: 'Lektionen' } },
    { id: 'team', label: { nl: 'Team', en: 'Team', de: 'Team' } },
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
            <motion.div
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
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentSection === item.id
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label[language]}
                  {currentSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-100 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Language Switcher & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center space-x-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onLanguageChange(lang.code)}
                    className="px-3 py-1 text-xs"
                  >
                    <span className="mr-1">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
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
            className="fixed top-16 left-0 right-0 z-40 glass backdrop-blur-xl bg-white/95 border-b border-white/20 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Language Switcher */}
              <div className="flex justify-center space-x-2 mb-6">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    currentSection === item.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label[language]}
                  {currentSection === item.id && (
                    <Badge variant="default" className="ml-2 text-xs">
                      Active
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

