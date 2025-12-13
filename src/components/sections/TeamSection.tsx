import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Heart, Coffee } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface TeamSectionProps {
  language: Language;
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Ons Team',
      subtitle: 'De mensen achter De Fabriek',
      description: 'Ons team bestaat uit gepassioneerde skateboarders, coaches en community bouwers die allemaal geloven in de kracht van skateboarden om mensen samen te brengen.',
      team: [
        {
          name: 'Jan van der Berg',
          role: ' Oprichter & Hoofdcoach',
          bio: 'Jan begon De Fabriek 15 jaar geleden. Hij is een professionele skateboarder met meerdere nationale titels en heeft duizenden mensen leren skaten.',
          specialties: ['Freestyle', 'Coaching', 'Park Ontwerp'],
          icon: Award
        },
        {
          name: 'Maria Rodriguez',
          role: 'Community Manager',
          bio: 'Maria zorgt ervoor dat iedereen zich thuis voelt bij De Fabriek. Zij organiseert evenementen en bouwt bruggen in de community.',
          specialties: ['Event Planning', 'Community Building', 'Inclusiviteit'],
          icon: Heart
        },
        {
          name: 'Tom de Vries',
          role: 'Technisch Manager',
          bio: 'Tom zorgt ervoor dat ons park altijd in topconditie is. Hij onderhoudt alle faciliteiten en ontwikkelt nieuwe features.',
          specialties: ['Onderhoud', 'Park Design', 'Veiligheid'],
          icon: Users
        },
        {
          name: 'Lisa Chen',
          role: 'Lescoördinator',
          bio: 'Lisa coördineert al onze lessen en zorgt voor de beste leerervaring voor alle niveaus, van beginners tot professionals.',
          specialties: ['Lessen Planning', 'Instructeur Training', 'Kwaliteit'],
          icon: Coffee
        }
      ],
      stats: [
        { number: '15+', label: 'Jaar Ervaring' },
        { number: '20+', label: 'Team Leden' },
        { number: '5000+', label: 'Leerlingen' },
        { number: '100+', label: 'Evenementen' }
      ],
      values: [
        'Passie voor skateboarden',
        'Inclusiviteit voor iedereen',
        'Kwaliteit boven kwantiteit',
        'Gemeenschap centraal',
        'Voortdurende verbetering'
      ]
    },
    en: {
      title: 'Our Team',
      subtitle: 'The people behind De Fabriek',
      description: 'Our team consists of passionate skateboarders, coaches and community builders who all believe in the power of skateboarding to bring people together.',
      team: [
        {
          name: 'Jan van der Berg',
          role: 'Founder & Head Coach',
          bio: 'Jan started De Fabriek 15 years ago. He is a professional skateboarder with multiple national titles and has taught thousands of people to skate.',
          specialties: ['Freestyle', 'Coaching', 'Park Design'],
          icon: Award
        },
        {
          name: 'Maria Rodriguez',
          role: 'Community Manager',
          bio: 'Maria ensures everyone feels at home at De Fabriek. She organizes events and builds bridges in the community.',
          specialties: ['Event Planning', 'Community Building', 'Inclusivity'],
          icon: Heart
        },
        {
          name: 'Tom de Vries',
          role: 'Technical Manager',
          bio: 'Tom ensures our park is always in top condition. He maintains all facilities and develops new features.',
          specialties: ['Maintenance', 'Park Design', 'Safety'],
          icon: Users
        },
        {
          name: 'Lisa Chen',
          role: 'Lesson Coordinator',
          bio: 'Lisa coordinates all our lessons and ensures the best learning experience for all levels, from beginners to professionals.',
          specialties: ['Lesson Planning', 'Instructor Training', 'Quality'],
          icon: Coffee
        }
      ],
      stats: [
        { number: '15+', label: 'Years Experience' },
        { number: '20+', label: 'Team Members' },
        { number: '5000+', label: 'Students' },
        { number: '100+', label: 'Events' }
      ],
      values: [
        'Passion for skateboarding',
        'Inclusivity for everyone',
        'Quality over quantity',
        'Community at the center',
        'Continuous improvement'
      ]
    },
    de: {
      title: 'Unser Team',
      subtitle: 'Die Menschen hinter De Fabriek',
      description: 'Unser Team besteht aus leidenschaftlichen Skateboardern, Coaches und Community-Buildern, die alle an die Kraft des Skateboardens glauben, Menschen zusammenzubringen.',
      team: [
        {
          name: 'Jan van der Berg',
          role: 'Gründer & Chefcoach',
          bio: 'Jan gründete De Fabriek vor 15 Jahren. Er ist ein professioneller Skateboarder mit mehreren nationalen Titeln und hat Tausenden von Menschen das Skaten beigebracht.',
          specialties: ['Freestyle', 'Coaching', 'Park Design'],
          icon: Award
        },
        {
          name: 'Maria Rodriguez',
          role: 'Community Manager',
          bio: 'Maria sorgt dafür, dass sich jeder bei De Fabriek zu Hause fühlt. Sie organisiert Events und baut Brücken in der Community.',
          specialties: ['Event Planung', 'Community Building', 'Inklusivität'],
          icon: Heart
        },
        {
          name: 'Tom de Vries',
          role: 'Technischer Manager',
          bio: 'Tom sorgt dafür, dass unser Park immer in Topform ist. Er wartet alle Einrichtungen und entwickelt neue Features.',
          specialties: ['Wartung', 'Park Design', 'Sicherheit'],
          icon: Users
        },
        {
          name: 'Lisa Chen',
          role: 'Lektionskoordinator',
          bio: 'Lisa koordiniert all unsere Lektionen und sorgt für die beste Lernerfahrung für alle Levels, von Anfängern bis Profis.',
          specialties: ['Lektionsplanung', 'Instruktor Training', 'Qualität'],
          icon: Coffee
        }
      ],
      stats: [
        { number: '15+', label: 'Jahre Erfahrung' },
        { number: '20+', label: 'Team Mitglieder' },
        { number: '5000+', label: 'Schüler' },
        { number: '100+', label: 'Events' }
      ],
      values: [
        'Leidenschaft für Skateboarding',
        'Inklusivität für alle',
        'Qualität vor Quantität',
        'Community im Zentrum',
        'Kontinuierliche Verbesserung'
      ]
    }
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
            👥 Ons Team
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {text.team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="glass h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <member.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-800 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary-600 font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-neutral-600 leading-relaxed mb-4">
                        {member.bio}
                      </p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specialtyIndex) => (
                          <Badge
                            key={specialtyIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
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

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-12 text-neutral-800">
            {language === 'nl' && 'Onze Waarden'}
            {language === 'en' && 'Our Values'}
            {language === 'de' && 'Unsere Werte'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {text.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-neutral-700 font-medium text-sm">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;

