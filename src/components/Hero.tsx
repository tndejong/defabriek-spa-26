import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import VideoModal from './ui/VideoModal';
import type { Language } from '../App';

interface HeroProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const content = {
    nl: {
      title: 'Welkom bij De Fabriek',
      subtitle: 'Het skatepark waar iedereen thuis is',
      description: 'Ontdek Enschede\'s meest inclusieve skatepark. Van beginners tot professionals, iedereen is welkom om te skaten, leren en groeien.',
      cta: 'Ontdek het Park',
      secondaryCta: 'Bekijk Video',
      badges: ['Toegang vanaf €7', 'Professionele Coaching', 'Inclusief voor Allen']
    },
    en: {
      title: 'Welcome to De Fabriek',
      subtitle: 'The skatepark where everyone belongs',
      description: 'Discover Enschede\'s most inclusive skatepark. From beginners to professionals, everyone is welcome to skate, learn and grow.',
      cta: 'Explore the Park',
      secondaryCta: 'Watch Video',
      badges: ['Access from €7', 'Professional Coaching', 'Inclusive for All']
    },
    de: {
      title: 'Willkommen bei De Fabriek',
      subtitle: 'Der Skatepark, wo jeder hingehört',
      description: 'Entdecken Sie Enschede\'s inklusivstes Skatepark. Von Anfängern bis Profis, jeder ist willkommen zu skaten, zu lernen und zu wachsen.',
      cta: 'Park Entdecken',
      secondaryCta: 'Video Ansehen',
      badges: ['Eintritt ab €7', 'Professionelles Coaching', 'Inklusiv für Alle']
    }
  };

  const text = content[language];

  return (
    <>
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-200 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🚀 {text.badges[0]}
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-gradient">{text.title}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-neutral-600 mb-8 font-light"
          >
            {text.subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-neutral-700 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {text.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('park')}
              className="btn-primary text-lg px-8 py-4 h-auto"
            >
              {text.cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-secondary text-lg px-8 py-4 h-auto"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              {text.secondaryCta}
            </Button>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {text.badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-white/50 backdrop-blur-sm"
              >
                {badge}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={() => onNavigate('park')}
          className="flex flex-col items-center text-neutral-500 hover:text-primary-600 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2">Scroll voor meer</span>
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>

    <VideoModal 
      isOpen={isVideoOpen} 
      onClose={() => setIsVideoOpen(false)} 
      videoSrc="/videos/team.mp4"
    />
    </>
  );
};

export default Hero;

