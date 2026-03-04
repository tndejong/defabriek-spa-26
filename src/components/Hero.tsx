import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import VideoModal from './ui/VideoModal';
import type { Language } from '../App';

// WMO weather code → { emoji, good: skate outside? }
const weatherMap: Record<number, { emoji: string; good: boolean }> = {
  0:  { emoji: '☀️',  good: true  },
  1:  { emoji: '🌤️', good: true  },
  2:  { emoji: '⛅',  good: true  },
  3:  { emoji: '☁️',  good: false },
  45: { emoji: '🌫️', good: false },
  48: { emoji: '🌫️', good: false },
  51: { emoji: '🌦️', good: false },
  53: { emoji: '🌦️', good: false },
  55: { emoji: '🌧️', good: false },
  61: { emoji: '🌧️', good: false },
  63: { emoji: '🌧️', good: false },
  65: { emoji: '🌧️', good: false },
  71: { emoji: '❄️',  good: false },
  73: { emoji: '❄️',  good: false },
  75: { emoji: '❄️',  good: false },
  77: { emoji: '❄️',  good: false },
  80: { emoji: '🌧️', good: false },
  81: { emoji: '🌧️', good: false },
  82: { emoji: '⛈️',  good: false },
  85: { emoji: '❄️',  good: false },
  86: { emoji: '❄️',  good: false },
  95: { emoji: '⛈️',  good: false },
  96: { emoji: '⛈️',  good: false },
  99: { emoji: '⛈️',  good: false },
};

interface WeatherData {
  emoji: string;
  temp: number;
  good: boolean;
}

const weatherLabels = {
  nl: { good: 'Park heeft ventilatie – ook binnen prima!', bad: 'Kom binnen skaten!' },
  en: { good: 'Park has ventilation – inside is great too!', bad: 'Perfect indoor skate day!' },
  de: { good: 'Park hat Belüftung – auch drinnen prima!', bad: 'Perfekt zum Drinnen-Skaten!' },
};

interface HeroProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=52.2215&longitude=6.8937&current=temperature_2m,weathercode&timezone=Europe%2FAmsterdam'
    )
      .then(r => r.json())
      .then(data => {
        const code: number = data.current.weathercode;
        const temp: number = Math.round(data.current.temperature_2m);
        const info = weatherMap[code] ?? { emoji: '🌡️', good: false };
        setWeather({ emoji: info.emoji, temp, good: info.good });
      })
      .catch(() => {});
  }, []);

  const content = {
    nl: {
      titleIntro: 'Welkom bij',
      titleBrand: 'De Fabriek',
      subtitle: 'Het gezelligste skatepark van Nederland',
      description: 'Op openingsdagen ben je altijd vrijblijvend welkom. Kom gewoon langs tegen een kleine entree – geen reservering nodig. Van beginners tot professionals, iedereen is welkom om te skaten, leren en groeien.',
      cta: 'Ontdek het Park',
      secondaryCta: 'Bekijk Video',
      badges: ['Vrijblijvend toegankelijk', 'Entree vanaf €7', 'Geen reservering nodig']
    },
    en: {
      titleIntro: 'Welcome to',
      titleBrand: 'De Fabriek',
      subtitle: 'The friendliest skatepark in the Netherlands',
      description: 'On opening days you\'re always welcome to drop in. Just come by for a small entrance fee – no reservation needed. From beginners to professionals, everyone is welcome to skate, learn and grow.',
      cta: 'Explore the Park',
      secondaryCta: 'Watch Video',
      badges: ['Freely accessible', 'Entrance from €7', 'No reservation needed']
    },
    de: {
      titleIntro: 'Willkommen bei',
      titleBrand: 'De Fabriek',
      subtitle: 'Das gemütlichste Skatepark der Niederlande',
      description: 'An Öffnungstagen sind Sie immer unverbindlich willkommen. Kommen Sie einfach vorbei gegen einen kleinen Eintritt – keine Reservierung nötig. Von Anfängern bis Profis, jeder ist willkommen zu skaten, zu lernen und zu wachsen.',
      cta: 'Park Entdecken',
      secondaryCta: 'Video Ansehen',
      badges: ['Unverbindlich zugänglich', 'Eintritt ab €7', 'Keine Reservierung nötig']
    }
  };

  const text = content[language];

  return (
    <>
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-16 pb-32">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-200 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Weather badge */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute top-20 left-4 sm:left-8 z-20"
        >
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl border text-sm font-medium ${
            weather.good
              ? 'bg-white/20 border-white/40 text-orange-900'
              : 'bg-white/20 border-white/40 text-primary-900'
          }`}
            style={{ WebkitBackdropFilter: 'blur(20px)' }}
          >
            <span className="text-xl leading-none">{weather.emoji}</span>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold">{weather.temp}°C</span>
              <span className="text-xs opacity-80">
                {weather.good ? weatherLabels[language].good : weatherLabels[language].bad} 🛹
              </span>
            </div>
          </div>
        </motion.div>
      )}

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
            <span className="text-gradient block">{text.titleIntro}</span>
            <span className="text-gradient block">{text.titleBrand}</span>
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

