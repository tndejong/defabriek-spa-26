import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface AbonnementenSectionProps {
  language: Language;
}

const MYSUBS_EMBED_SRC = 'https://www.mysubs.nl/embed/sv-de-fabriek.js';

const content = {
  nl: {
    badge: 'Abonnementen',
    title: 'Abonnementen',
    subtitle: 'Onbeperkt entree bij ons voor een vast bedrag per maand. Sluit direct hieronder af via onze vertrouwde partner MySubs.',
  },
  en: {
    badge: 'Memberships',
    title: 'Memberships',
    subtitle: 'Unlimited entry for a fixed monthly fee. Sign up directly below through our trusted partner MySubs.',
  },
  de: {
    badge: 'Abonnements',
    title: 'Abonnements',
    subtitle: 'Unbegrenzter Eintritt für einen festen monatlichen Betrag. Schließe direkt hierunter über unseren Partner MySubs ab.',
  },
};

const AbonnementenSection: React.FC<AbonnementenSectionProps> = ({ language }) => {
  const t = content[language];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let cancelled = false;
    const load = () => {
      if (cancelled || document.querySelector(`script[src="${MYSUBS_EMBED_SRC}"]`)) return;
      const s = document.createElement('script');
      s.async = true;
      s.src = MYSUBS_EMBED_SRC;
      document.body.appendChild(s);
    };

    const idle = window.setTimeout(load, 800);

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        load();
        obs.disconnect();
      },
      { rootMargin: '600px' }
    );
    obs.observe(el);
    return () => {
      cancelled = true;
      obs.disconnect();
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <section
      id="abonnementen"
      ref={sectionRef}
      className="section-padding section-glow scroll-mt-24"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            🎟️ {t.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-light">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div id="mysubs-plans" className="min-h-[480px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default AbonnementenSection;
