import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface TeamSectionProps {
  language: Language;
}

const teamMembers = [
  { name: 'Kees', role: { nl: 'Voorzitter', en: 'Chairman', de: 'Vorsitzender' } },
  { name: 'Kilian', role: { nl: 'Secretaris', en: 'Secretary', de: 'Schriftführer' } },
  { name: 'Tijmen', role: { nl: 'IT & Communicatie', en: 'IT & Communications', de: 'IT & Kommunikation' } },
  { name: 'Bert', role: { nl: 'Socials & Evenementen', en: 'Socials & Events', de: 'Socials & Veranstaltungen' } },
  { name: 'Bryan', role: { nl: 'Algemene zaken', en: 'General Affairs', de: 'Allgemeine Angelegenheiten' } },
  { name: 'Willem', role: { nl: 'Algemene zaken', en: 'General Affairs', de: 'Allgemeine Angelegenheiten' } },
  { name: 'Luuk', role: { nl: 'Evenementen', en: 'Events', de: 'Veranstaltungen' } },
  { name: 'Leon', role: { nl: 'Merchandise', en: 'Merchandise', de: 'Merchandise' } },
  { name: 'Justin', role: { nl: 'Financiën', en: 'Finance', de: 'Finanzen' } },
];

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Team',
      subtitle: 'De mensen achter De Fabriek',
      description: 'Ons team bestaat uit vrijwilligers die zich inzetten voor de skateboardgemeenschap in Enschede.',
    },
    en: {
      title: 'Team',
      subtitle: 'The people behind De Fabriek',
      description: 'Our team consists of volunteers dedicated to the skateboarding community in Enschede.',
    },
    de: {
      title: 'Team',
      subtitle: 'Die Menschen hinter De Fabriek',
      description: 'Unser Team besteht aus Freiwilligen, die sich für die Skateboard-Community in Enschede einsetzen.',
    },
  };

  const text = content[language];

  return (
    <section id="team" className="section-padding bg-gradient-to-br from-secondary-50 via-white to-primary-50">
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
            👥 {text.title}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{text.title}</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-neutral-600 mb-8 font-light">
            {text.subtitle}
          </h3>
          <p className="text-lg text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            {text.description}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <Card className="glass h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary-600">
                    {member.role[language]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
