import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface SkateTeamSectionProps {
  language: Language;
}

const skaters = [
  { name: 'Luc', profile: '/images/skateteam/luc.jpg', skate: '/images/skateteam/luc2.jpg' },
  { name: 'Niels', profile: '/images/skateteam/niels.jpg', skate: '/images/skateteam/niels2.jpg' },
  { name: 'Bert', profile: '/images/skateteam/bert.jpg', skate: '/images/skateteam/bert2.jpg' },
  { name: 'Chay', profile: '/images/skateteam/chay.jpg', skate: '/images/skateteam/chay2.jpg' },
];

interface SkaterCardProps {
  name: string;
  profile: string;
  skate: string;
  index: number;
}

const SkaterCard: React.FC<SkaterCardProps> = ({ name, profile, skate, index }) => {
  const [showSkate, setShowSkate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSkate((prev) => !prev);
    }, 2500 + index * 300);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-md bg-neutral-900" style={{ aspectRatio: '3/4' }}>
        <img
          src={profile}
          alt={`${name} – profiel`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showSkate ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={skate}
          alt={`${name} – skaten`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showSkate ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="pt-3 text-center">
        <span className="text-base font-semibold text-neutral-800 tracking-wide">{name}</span>
      </div>
    </motion.div>
  );
};

const SkateTeamSection: React.FC<SkateTeamSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Skate Team',
      subtitle: 'De rijders van De Fabriek',
      teamLead: 'Team Lead',
      skater: 'Skater',
    },
    en: {
      title: 'Skate Team',
      subtitle: 'The riders of De Fabriek',
      teamLead: 'Team Lead',
      skater: 'Skater',
    },
    de: {
      title: 'Skate Team',
      subtitle: 'Die Fahrer von De Fabriek',
      teamLead: 'Team Lead',
      skater: 'Skater',
    },
  };

  const text = content[language];

  return (
    <section id="skateteam" className="section-padding bg-neutral-50">
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
            🛹 {text.title}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">{text.title}</span>
          </h2>
          <p className="text-lg text-neutral-500 font-light">{text.subtitle}</p>
        </motion.div>

        {/* Team Lead – Bryan */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="w-52 md:w-64 rounded-2xl overflow-hidden shadow-lg bg-neutral-900">
            <img
              src="/images/skateteam/bryan.jpg"
              alt="Bryan – Team Lead"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
          <div className="mt-3 flex flex-col items-center gap-1">
            <Badge className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
              {text.teamLead}
            </Badge>
            <span className="text-base font-semibold text-neutral-800 tracking-wide">Bryan</span>
          </div>
        </motion.div>

        {/* Skaters grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {skaters.map((skater, index) => (
            <SkaterCard
              key={skater.name}
              name={skater.name}
              profile={skater.profile}
              skate={skater.skate}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkateTeamSection;
