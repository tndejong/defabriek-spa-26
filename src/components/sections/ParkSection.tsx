import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Award, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import TrickCounter from '../TrickCounter';
import type { Language } from '../../App';

interface ParkSectionProps {
  language: Language;
}

const polaroidImages = [
  { src: '/images/park/park-15.png', rotate: -2.5 },
  { src: '/images/park/park-2.png',  rotate:  1.5 },
  { src: '/images/park/park-3.png',  rotate: -1   },
  { src: '/images/park/park-6.png',  rotate:  2   },
  { src: '/images/park/park-5.png',  rotate: -1.5 },
  { src: '/images/park/park-9.png',  rotate:  3   },
  { src: '/images/park/park-16.png', rotate: -2   },
  { src: '/images/park/park-17.png', rotate:  1   },
  { src: '/images/park/park-18.png', rotate: -3   },
  { src: '/images/park/park-10.png', rotate:  2.5 },
  { src: '/images/park/park-11.png', rotate: -1   },
  { src: '/images/park/park-12.png', rotate:  1.5 },
];

const ParkSection: React.FC<ParkSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Park',
      subtitle: 'Hogebothofstraat 49, Enschede',
      description: 'Op openingsdagen ben je altijd vrijblijvend welkom. Kom gewoon langs tegen een kleine entree – geen reservering nodig. Ons skatepark biedt de perfecte omgeving voor skaten op elk niveau.',
      galleryTitle: 'Bekijk Ons Park',
      features: [
        {
          icon: Users,
          title: 'Voor Iedereen',
          description: 'Van beginners tot professionals, ons park is inclusief en uitnodigend voor alle leeftijden.'
        },
        {
          icon: Clock,
          title: 'Vrijblijvend Toegankelijk',
          description: 'Op openingsdagen ben je altijd welkom. Kom gewoon langs tegen een kleine entree.'
        },
        {
          icon: Award,
          title: 'Professioneel Ontwerp',
          description: 'Ontworpen door ervaren skateboarders met aandacht voor veiligheid en plezier.'
        },
        {
          icon: Heart,
          title: 'Gemeenschap',
          description: 'Word deel van onze vriendelijke en ondersteunende skategemeenschap.'
        }
      ],
      stats: [
        { number: '100+', label: 'Wekelijkse Bezoekers' },
        { number: '15+', label: 'Jaren Ervaring' },
        { number: '1200', label: 'Vierkante Meter' },
        { number: '10+', label: 'Evenementen per Jaar' }
      ],
      cta: 'Bekijk Openingstijden'
    },
    en: {
      title: 'Park',
      subtitle: 'Hogebothofstraat 49, Enschede',
      description: 'On opening days you\'re always welcome to drop in. Just come by for a small entrance fee – no reservation needed. Our skatepark provides the perfect environment for skating at every level.',
      galleryTitle: 'View Our Park',
      features: [
        {
          icon: Users,
          title: 'For Everyone',
          description: 'From beginners to professionals, our park is inclusive and inviting for all ages.'
        },
        {
          icon: Clock,
          title: 'Freely Accessible',
          description: 'On opening days you\'re always welcome. Just drop in for a small entrance fee.'
        },
        {
          icon: Award,
          title: 'Professional Design',
          description: 'Designed by experienced skateboarders with attention to safety and fun.'
        },
        {
          icon: Heart,
          title: 'Community',
          description: 'Become part of our friendly and supportive skate community.'
        }
      ],
      stats: [
        { number: '100+', label: 'Weekly Visitors' },
        { number: '15+', label: 'Years Experience' },
        { number: '1200', label: 'Square Meters' },
        { number: '10+', label: 'Events per Year' }
      ],
      cta: 'View Opening Hours'
    },
    de: {
      title: 'Park',
      subtitle: 'Hogebothofstraat 49, Enschede',
      description: 'An Öffnungstagen sind Sie immer unverbindlich willkommen. Kommen Sie einfach vorbei gegen einen kleinen Eintritt – keine Reservierung nötig. Unser Skatepark bietet die perfekte Umgebung zum Skaten auf jedem Niveau.',
      galleryTitle: 'Unser Park Ansehen',
      features: [
        {
          icon: Users,
          title: 'Für Alle',
          description: 'Von Anfängern bis Profis ist unser Park inklusiv und einladend für alle Altersgruppen.'
        },
        {
          icon: Clock,
          title: 'Unverbindlich Zugänglich',
          description: 'An Öffnungstagen sind Sie immer willkommen. Kommen Sie einfach vorbei gegen einen kleinen Eintritt.'
        },
        {
          icon: Award,
          title: 'Professionelles Design',
          description: 'Entworfen von erfahrenen Skateboardern mit Augenmerk auf Sicherheit und Spaß.'
        },
        {
          icon: Heart,
          title: 'Gemeinschaft',
          description: 'Werden Sie Teil unserer freundlichen und unterstützenden Skate-Community.'
        }
      ],
      stats: [
        { number: '100+', label: 'Wöchentliche Besucher' },
        { number: '15+', label: 'Jahre Erfahrung' },
        { number: '1200', label: 'Quadratmeter' },
        { number: '10+', label: 'Events pro Jahr' }
      ],
      cta: 'Öffnungszeiten Ansehen'
    }
  };

  const text = content[language];

  const [userTricks, setUserTricks] = useState(0);

  // Bubble intensity scales with the user's personal trick count
  const t = Math.min(userTricks / 400, 1); // 0 → 1 over first 400 clicks
  const bubbleOpacity  = 0.06 + t * 0.50;  // 0.06 (barely visible) → 0.56 (blazing)
  const sizeScale      = 0.5  + t * 1.2;   // 0.5× → 1.7× base size
  const blurPx         = Math.round(28 - t * 16); // 28px (soft) → 12px (sharp/intense)
  const animSpeed      = 12   - t * 5;      // 12s (lazy) → 7s (energetic)

  const bubble = (rgba: string) =>
    `radial-gradient(circle, ${rgba} 0%, transparent 70%)`;

  return (
    <section id="park" className="section-padding bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            🛹 Ons Skatepark
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{text.title}</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-neutral-600 mb-8 font-light">
            {text.subtitle}
          </h3>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            {text.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
        >
          {text.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-neutral-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trick Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-32"
        >
          <div className="relative rounded-3xl px-8 py-10 shadow-xl border border-neutral-100 w-full max-w-2xl overflow-hidden bg-white">
            {/* Intensity-driven red light bubbles — grow stronger with more tricks */}
            <motion.div
              animate={{ x: [0, 120, 40, 160, 0], y: [0, 70, 150, 30, 0] }}
              transition={{ duration: animSpeed, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-8 -left-8 rounded-full pointer-events-none"
              style={{ width: `${Math.round(224 * sizeScale)}px`, height: `${Math.round(224 * sizeScale)}px`, background: bubble(`rgba(239,68,68,${bubbleOpacity})`), filter: `blur(${blurPx}px)` }}
            />
            <motion.div
              animate={{ x: [0, -90, -50, -130, 0], y: [0, 60, -40, 90, 0] }}
              transition={{ duration: animSpeed * 1.3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 right-0 rounded-full pointer-events-none"
              style={{ width: `${Math.round(192 * sizeScale)}px`, height: `${Math.round(192 * sizeScale)}px`, background: bubble(`rgba(220,38,38,${bubbleOpacity * 0.9})`), filter: `blur(${blurPx + 4}px)` }}
            />
            <motion.div
              animate={{ x: [0, 70, -70, 40, 0], y: [0, -50, 50, -90, 0] }}
              transition={{ duration: animSpeed * 0.85, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-1/4 rounded-full pointer-events-none"
              style={{ width: `${Math.round(240 * sizeScale)}px`, height: `${Math.round(240 * sizeScale)}px`, background: bubble(`rgba(239,68,68,${bubbleOpacity * 0.8})`), filter: `blur(${blurPx + 2}px)` }}
            />
            <motion.div
              animate={{ x: [0, -50, 90, -20, 0], y: [0, -70, -20, 55, 0] }}
              transition={{ duration: animSpeed * 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 right-1/4 rounded-full pointer-events-none"
              style={{ width: `${Math.round(176 * sizeScale)}px`, height: `${Math.round(176 * sizeScale)}px`, background: bubble(`rgba(185,28,28,${bubbleOpacity})`), filter: `blur(${blurPx - 2}px)` }}
            />
            <motion.div
              animate={{ x: [0, 55, -35, 110, 0], y: [0, 90, -70, 45, 0] }}
              transition={{ duration: animSpeed * 1.1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-0 rounded-full pointer-events-none"
              style={{ width: `${Math.round(160 * sizeScale)}px`, height: `${Math.round(160 * sizeScale)}px`, background: bubble(`rgba(239,68,68,${bubbleOpacity * 0.7})`), filter: `blur(${blurPx + 3}px)` }}
            />
            {/* Content */}
            <div className="relative z-10">
              <TrickCounter language={language} onUserCountChange={setUserTricks} />
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery */}
        <div className="mb-32">
          {/* Mobile + Tablet: auto-scrolling marquee */}
          <div className="lg:hidden overflow-hidden py-8 -my-8">
            <div className="marquee-track marquee-track--nopause gap-5" style={{ animationDuration: '28s' }}>
              {[...polaroidImages, ...polaroidImages].map((img, index) => (
                <div
                  key={index}
                  className="shrink-0 bg-white p-3 pb-8 shadow-xl"
                  style={{ rotate: `${img.rotate}deg`, transform: `rotate(${img.rotate}deg)` }}
                >
                  <div className="w-40 h-28 overflow-hidden bg-neutral-100">
                    <img
                      src={img.src}
                      alt={`Skatepark De Fabriek - ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: flex wrap polaroid grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-wrap justify-center gap-6"
          >
            {polaroidImages.map((img, index) => (
              <motion.div
                key={img.src}
                className="bg-white p-3 pb-10 shadow-xl cursor-pointer"
                style={{ rotate: `${img.rotate}deg` }}
                initial={{ opacity: 0, y: 30, rotate: img.rotate - 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: img.rotate }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 10, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
              >
                <div className="w-52 h-36 overflow-hidden bg-neutral-100">
                  <img
                    src={img.src}
                    alt={`Skatepark De Fabriek - ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-32">
          {text.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full glass hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-neutral-50">
                <CardHeader className="text-center pb-2 lg:pb-4">
                  <div className="w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <CardTitle className="text-sm lg:text-xl font-semibold text-neutral-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0 lg:pt-4">
                  <p className="text-xs lg:text-base text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
            <a href="#open">{text.cta}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ParkSection;

