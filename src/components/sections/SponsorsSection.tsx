import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../../App';

interface SponsorsSectionProps {
  language: Language;
}

const sponsors = [
  {
    name: 'Hardboard',
    image: '/images/sponsors/hardboard.png',
  },
  {
    name: 'RegioFresh',
    image: '/images/sponsors/regiofresh.png',
  },
  {
    name: 'Studio 15',
    image: '/images/sponsors/studio15.png',
  },
  {
    name: 'Gold Dry',
    image: '/images/sponsors/golddry.svg',
  },
];

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Sponsors',
      subtitle: 'Onze geweldige sponsors maken het mogelijk',
      description: 'Dankzij de steun van onze sponsors kunnen wij De Fabriek blijven runnen en uitbreiden. Wil jij ook sponsor worden? Neem contact met ons op!',
      cta: 'Word Sponsor',
    },
    en: {
      title: 'Sponsors',
      subtitle: 'Our amazing sponsors make it possible',
      description: 'Thanks to the support of our sponsors we can keep running and expanding De Fabriek. Want to become a sponsor? Get in touch with us!',
      cta: 'Become a Sponsor',
    },
    de: {
      title: 'Sponsoren',
      subtitle: 'Unsere großartigen Sponsoren machen es möglich',
      description: 'Dank der Unterstützung unserer Sponsoren können wir De Fabriek weiter betreiben und ausbauen. Möchten Sie Sponsor werden? Nehmen Sie Kontakt mit uns auf!',
      cta: 'Sponsor Werden',
    },
  };

  const text = content[language];

  return (
    <section id="sponsors" className="py-20 bg-neutral-50 overflow-hidden">
      <div className="container-max px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase mb-4">
            {text.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {text.subtitle}
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto leading-relaxed">
            {text.description}
          </p>
        </motion.div>
      </div>

      {/* Marquee track */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none" />

        <div className="overflow-hidden">
          {/* Doubled list — animation moves -50% so it loops seamlessly */}
          <div className="marquee-track gap-8 px-4">
            {[...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
              <SponsorCard key={i} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
        >
          {text.cta}
        </a>
      </motion.div>
    </section>
  );
};

const SponsorCard: React.FC<{ sponsor: { name: string; image: string } }> = ({ sponsor }) => (
  <div className="shrink-0 w-52 bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
    <div className="h-28 flex items-center justify-center bg-white p-4">
      <img
        src={sponsor.image}
        alt={sponsor.name}
        className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="px-4 py-3 text-center border-t border-neutral-100">
      <span className="text-sm font-semibold text-neutral-600">{sponsor.name}</span>
    </div>
  </div>
);

export default SponsorsSection;
