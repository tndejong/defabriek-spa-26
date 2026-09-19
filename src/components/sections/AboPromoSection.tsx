import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import type { Language } from '../../App';
import { track } from '../../lib/analytics';

interface AboPromoSectionProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

const content = {
  nl: {
    badge: 'Nieuw bij De Fabriek',
    title: 'Onbeperkt toegang tot het park voor €25,- per maand',
    cta: 'Bekijk abonnementen',
  },
  en: {
    badge: 'New at De Fabriek',
    title: 'Unlimited access to the park for €25,- a month',
    cta: 'View memberships',
  },
  de: {
    badge: 'Neu bei De Fabriek',
    title: 'Unbegrenzter Zugang zum Park für €25,- im Monat',
    cta: 'Abonnements ansehen',
  },
};

const AboPromoSection: React.FC<AboPromoSectionProps> = ({ language, onNavigate }) => {
  const t = content[language];

  return (
    <section id="abo-promo" className="px-4 py-8 md:px-8 lg:px-16 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-300 mb-2">
              {t.badge}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {t.title}
            </h2>
          </div>
          <Button
            size="lg"
            className="bg-white text-primary-700 hover:bg-yellow-50 font-semibold h-auto py-3 px-6 shrink-0"
            onClick={() => {
              track('abo_promo_click');
              onNavigate('abonnementen');
            }}
          >
            {t.cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboPromoSection;
