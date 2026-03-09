import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ParkSection from '../components/sections/ParkSection';
import KostenSection from '../components/sections/KostenSection';
import OpenSection from '../components/sections/OpenSection';
import VerhaalSection from '../components/sections/VerhaalSection';
import LessenSection from '../components/sections/LessenSection';
import TeamSection from '../components/sections/TeamSection';
import ContactSection from '../components/sections/ContactSection';
import FaqSection from '../components/sections/FaqSection';
import InstagramSection from '../components/sections/InstagramSection';
import EventsSection from '../components/sections/EventsSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import SponsorsSection from '../components/sections/SponsorsSection';
import { track } from '../lib/analytics';
import type { AppContext } from '../App';

const HomePage: React.FC = () => {
  const { language, scrollToSection, setCurrentSection } = useOutletContext<AppContext>();
  const trackedSections = useRef<Set<string>>(new Set());

  // Scroll naar #sectie bij laden (bijv. na redirect van /open naar /#open)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'park', 'kosten', 'open', 'verhaal', 'lessen', 'team', 'contact'].includes(hash)) {
      const scroll = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      setTimeout(scroll, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'park', 'kosten', 'open', 'verhaal', 'lessen', 'team', 'faq', 'contact', 'sponsors', 'events'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            if (!trackedSections.current.has(section)) {
              trackedSections.current.add(section);
              track(`${section}_viewed`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentSection]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Hero language={language} onNavigate={scrollToSection} />
      <InstagramSection language={language} />
      <EventsSection language={language} />
      <ParkSection language={language} />
      <ReviewsSection language={language} />
      <KostenSection language={language} />
      <OpenSection language={language} />
      <VerhaalSection language={language} />
      <LessenSection language={language} />
      <TeamSection language={language} />
      <FaqSection language={language} />
      <ContactSection language={language} />
      <SponsorsSection language={language} />
    </motion.div>
  );
};

export default HomePage;
