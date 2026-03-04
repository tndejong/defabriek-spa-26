import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Award, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
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
        { number: '1600', label: 'Vierkante Meter' },
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
        { number: '1600', label: 'Square Meters' },
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
        { number: '1600', label: 'Quadratmeter' },
        { number: '10+', label: 'Events pro Jahr' }
      ],
      cta: 'Öffnungszeiten Ansehen'
    }
  };

  const text = content[language];

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

        {/* Photo Mosaic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-800">
            {text.galleryTitle}
          </h3>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
                <div className="w-44 h-32 sm:w-52 sm:h-36 overflow-hidden bg-neutral-100">
                  <img
                    src={img.src}
                    alt={`Skatepark De Fabriek - ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-neutral-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
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

