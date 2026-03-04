import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../../App';

interface ReviewsSectionProps {
  language: Language;
}

const content = {
  nl: {
    badge: 'Reviews',
    title: 'Wat bezoekers zeggen',
    subtitle: 'Lees wat andere skaters en bezoekers vinden van De Fabriek.',
  },
  en: {
    badge: 'Reviews',
    title: 'What visitors say',
    subtitle: 'Read what other skaters and visitors think of De Fabriek.',
  },
  de: {
    badge: 'Bewertungen',
    title: 'Was Besucher sagen',
    subtitle: 'Lesen Sie, was andere Skater und Besucher über De Fabriek denken.',
  },
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = content[language];
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    if (widgetRef.current.querySelector('script[src*="trustmary"]')) return;
    const s = document.createElement('script');
    s.src = 'https://widget.trustmary.com/0U4aKlPV5';
    s.async = true;
    widgetRef.current.appendChild(s);
  }, []);


  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold tracking-wide uppercase mb-4">
            ⭐ {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div ref={widgetRef} />
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
