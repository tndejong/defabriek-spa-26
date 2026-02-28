import React from 'react';
import { motion } from 'framer-motion';
import { Euro, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Language } from '../../App';

interface KostenSectionProps {
  language: Language;
}

const KostenSection: React.FC<KostenSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Entree kosten',
      subtitle: 'Vrijblijvend toegankelijk op openingsdagen',
      description: 'Op openingsdagen ben je altijd welkom – kom gewoon langs tegen een kleine entree. We hanteren verschillende prijzen per sport, omdat sommige sporten meer slijtage aan ons park veroorzaken.',
      prices: [
        { sport: 'BMX', price: '€ 8,-' },
        { sport: 'Steppen', price: '€ 8,-' },
        { sport: 'Skateboarden / Inlinen', price: '€ 7,-' },
      ],
      cta: 'Neem Contact Op',
    },
    en: {
      title: 'Entrance fees',
      subtitle: 'Freely accessible on opening days',
      description: 'On opening days you\'re always welcome – just drop in for a small entrance fee. We have different prices per sport, as some sports cause more wear to our park.',
      prices: [
        { sport: 'BMX', price: '€ 8' },
        { sport: 'Scooters', price: '€ 8' },
        { sport: 'Skateboarding / Inline skating', price: '€ 7' },
      ],
      cta: 'Get in Touch',
    },
    de: {
      title: 'Eintrittspreise',
      subtitle: 'Unverbindlich zugänglich an Öffnungstagen',
      description: 'An Öffnungstagen sind Sie immer willkommen – kommen Sie einfach vorbei gegen einen kleinen Eintritt. Wir haben unterschiedliche Preise pro Sportart, da einige mehr Abnutzung verursachen.',
      prices: [
        { sport: 'BMX', price: '€ 8' },
        { sport: 'Scooter', price: '€ 8' },
        { sport: 'Skateboarden / Inlineskaten', price: '€ 7' },
      ],
      cta: 'Kontakt Aufnehmen',
    },
  };

  const text = content[language];

  return (
    <section id="kosten" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
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
            💰 {language === 'nl' ? 'Prijzen' : language === 'en' ? 'Pricing' : 'Preise'}
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

        {/* Price List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-16"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-neutral-800 flex items-center">
                <Info className="w-6 h-6 mr-3 text-primary-600" />
                {text.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {text.prices.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-center p-4 bg-white/50 rounded-lg"
                >
                  <span className="font-medium text-neutral-800">{item.sport}</span>
                  <span className="text-xl font-bold text-primary-600">{item.price}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-neutral-600 mb-6">
            {language === 'nl' && 'Heb je vragen over onze prijzen?'}
            {language === 'en' && 'Have questions about our pricing?'}
            {language === 'de' && 'Haben Sie Fragen zu unseren Preisen?'}
          </p>
          <Button variant="outline" size="lg" className="btn-secondary" asChild>
            <a href="#contact">
              <Euro className="w-5 h-5 mr-2" />
              {text.cta}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default KostenSection;
