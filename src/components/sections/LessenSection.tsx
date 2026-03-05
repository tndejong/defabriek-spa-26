import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Calendar, CheckCircle, ExternalLink, Snowflake, Sun, MapPin, Info } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface LessenSectionProps {
  language: Language;
}

const waitlistMsg: Record<string, string> = {
  nl: 'Door grote belangstelling kan er een wachtlijst zijn.',
  en: 'Due to high demand, there may be a waiting list.',
  de: 'Aufgrund der hohen Nachfrage kann es eine Warteliste geben.',
};

const WaitlistTooltip: React.FC<{ language: string }> = ({ language }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-yellow-300/70 hover:text-yellow-200 transition-colors focus:outline-none"
        aria-label="Wachtlijst informatie"
      >
        <Info className="w-4 h-4 animate-pulse" />
      </button>
      {show && (
        <div className="absolute bottom-full right-0 mb-2 w-52 bg-neutral-900 text-white text-xs rounded-xl px-3 py-2 shadow-xl leading-snug z-50 pointer-events-none sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
          ⚠️ {waitlistMsg[language]}
          <div className="absolute top-full right-3 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
        </div>
      )}
    </div>
  );
};

const LessenSection: React.FC<LessenSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Skateboard Lessen',
      subtitle: 'Leer skaten bij Fresh Skateschool',
      description: 'Er worden lessen in ons park aangeboden door Fresh Skateschool. Voor meer informatie over lessen en tijden kun je mailen naar info@freshskateschool.nl',
      partner: {
        name: 'Fresh Skateschool',
        tagline: 'Dé skateschool van Twente',
        description: 'Skateboard lessen voor alle niveaus — van beginners tot gevorderden. Let op: er worden geen step-, BMX- of inline lessen aangeboden.',
        email: 'info@freshskateschool.nl'
      },
      seasons: [
        {
          icon: Snowflake,
          title: 'Winterseizoen',
          period: 'November t/m Maart',
          location: 'Indoor bij De Fabriek, Enschede',
          description: 'In de wintermaanden worden de lessen gegeven in ons overdekte skatepark.'
        },
        {
          icon: Sun,
          title: 'Zomerseizoen',
          period: 'April t/m Oktober',
          location: 'Skatepark Hengelo',
          description: 'In de zomer verhuizen de lessen naar het buitenpark in Hengelo.'
        }
      ],
      offerings: [
        {
          icon: Users,
          title: 'Groepslessen',
          description: 'Leer samen met anderen in kleine groepen onder begeleiding van ervaren instructeurs.'
        },
        {
          icon: GraduationCap,
          title: 'Privélessen',
          description: 'Persoonlijke aandacht en een op maat gemaakt lesprogramma voor snelle vooruitgang.'
        },
        {
          icon: Calendar,
          title: 'Events',
          description: 'Wil je een event bij ons organiseren? Neem dan contact op en we praten verder.'
        }
      ],
      benefits: [
        'Geschikt voor alle niveaus',
        'Ervaren professionele instructeurs',
        'Veilige leeromgeving',
        'Bescherming wordt aangeraden',
        'Skateboards beschikbaar'
      ],
      cta: 'Inschrijven bij Fresh Skateschool',
      visitWebsite: 'Bezoek de website voor meer info en inschrijving',
      note: 'Let op: Door grote belangstelling kan er een wachtlijst zijn. Inschrijven kan via de Fresh Skateschool website of bij Sabotage Skateshop in Hengelo.'
    },
    en: {
      title: 'Skateboard Lessons',
      subtitle: 'Learn to skate at Fresh Skateschool',
      description: 'Lessons in our park are offered by Fresh Skateschool. For more information about lessons and times, email info@freshskateschool.nl',
      partner: {
        name: 'Fresh Skateschool',
        tagline: 'The skateschool of Twente',
        description: 'Skateboard lessons for all levels — from beginners to advanced. Note: no scooter, BMX or inline lessons are offered.',
        email: 'info@freshskateschool.nl'
      },
      seasons: [
        {
          icon: Snowflake,
          title: 'Winter Season',
          period: 'November - March',
          location: 'Indoor at De Fabriek, Enschede',
          description: 'During winter months, lessons are held in our indoor skatepark.'
        },
        {
          icon: Sun,
          title: 'Summer Season',
          period: 'April - October',
          location: 'Skatepark Hengelo',
          description: 'In summer, lessons move to the outdoor park in Hengelo.'
        }
      ],
      offerings: [
        {
          icon: Users,
          title: 'Group Lessons',
          description: 'Learn together with others in small groups under guidance of experienced instructors.'
        },
        {
          icon: GraduationCap,
          title: 'Private Lessons',
          description: 'Personal attention and a customized lesson program for fast progress.'
        },
        {
          icon: Calendar,
          title: 'Events',
          description: 'Want to organise an event with us? Get in touch and we\'ll talk it through.'
        }
      ],
      benefits: [
        'Suitable for all levels',
        'Experienced professional instructors',
        'Safe learning environment',
        'Protective gear recommended',
        'Skateboards available'
      ],
      cta: 'Sign up at Fresh Skateschool',
      visitWebsite: 'Visit the website for more info and registration',
      note: 'Note: Due to high demand, there may be a waiting list. Sign up via the Fresh Skateschool website or at Sabotage Skateshop in Hengelo.'
    },
    de: {
      title: 'Skateboard Unterricht',
      subtitle: 'Lerne Skaten bei Fresh Skateschool',
      description: 'Der Unterricht in unserem Park wird von Fresh Skateschool angeboten. Für weitere Informationen zu Lektionen und Zeiten kannst du eine E-Mail an info@freshskateschool.nl senden.',
      partner: {
        name: 'Fresh Skateschool',
        tagline: 'Die Skateschool von Twente',
        description: 'Skateboard-Unterricht für alle Niveaus — von Anfängern bis Fortgeschrittenen. Hinweis: Es werden keine Scooter-, BMX- oder Inline-Lektionen angeboten.',
        email: 'info@freshskateschool.nl'
      },
      seasons: [
        {
          icon: Snowflake,
          title: 'Wintersaison',
          period: 'November - März',
          location: 'Indoor bei De Fabriek, Enschede',
          description: 'In den Wintermonaten findet der Unterricht in unserem Indoor-Skatepark statt.'
        },
        {
          icon: Sun,
          title: 'Sommersaison',
          period: 'April - Oktober',
          location: 'Skatepark Hengelo',
          description: 'Im Sommer zieht der Unterricht zum Außenpark in Hengelo um.'
        }
      ],
      offerings: [
        {
          icon: Users,
          title: 'Gruppenunterricht',
          description: 'Lerne zusammen mit anderen in kleinen Gruppen unter Anleitung erfahrener Instruktoren.'
        },
        {
          icon: GraduationCap,
          title: 'Privatunterricht',
          description: 'Persönliche Aufmerksamkeit und ein maßgeschneidertes Unterrichtsprogramm für schnellen Fortschritt.'
        },
        {
          icon: Calendar,
          title: 'Events',
          description: 'Möchtest du ein Event bei uns organisieren? Nimm Kontakt auf und wir besprechen es.'
        }
      ],
      benefits: [
        'Geeignet für alle Niveaus',
        'Erfahrene professionelle Instruktoren',
        'Sichere Lernumgebung',
        'Schutzausrüstung empfohlen',
        'Skateboards verfügbar'
      ],
      cta: 'Anmeldung bei Fresh Skateschool',
      visitWebsite: 'Besuche die Website für mehr Infos und Anmeldung',
      note: 'Hinweis: Aufgrund der hohen Nachfrage kann es eine Warteliste geben. Anmeldung über die Fresh Skateschool Website oder bei Sabotage Skateshop in Hengelo.'
    }
  };

  const text = content[language];

  return (
    <section id="lessen" className="section-padding bg-white">
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
            🎓 Skateboard Lessen
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

        {/* Partner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">

                {/* Left: logo + info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <Badge className="bg-primary-100 text-primary-700 mb-3">
                      {language === 'nl' && 'Officiële Partner'}
                      {language === 'en' && 'Official Partner'}
                      {language === 'de' && 'Offizieller Partner'}
                    </Badge>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-1">
                      {text.partner.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {text.partner.tagline}
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      {text.partner.description}
                    </p>
                  </div>
                </div>

                {/* Right: sign-up card */}
                <div className="w-full lg:w-72 shrink-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white flex flex-col gap-4 overflow-visible">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                        {language === 'nl' && '🛹 Schrijf je nu in!'}
                        {language === 'en' && '🛹 Sign up now!'}
                        {language === 'de' && '🛹 Jetzt anmelden!'}
                      </span>
                      <WaitlistTooltip language={language} />
                    </div>
                    <p className="text-primary-100 text-sm leading-relaxed mb-3">
                      {language === 'nl' && 'Meld je aan via de website van Fresh Skateschool of stuur een mailtje.'}
                      {language === 'en' && 'Sign up via the Fresh Skateschool website or send an email.'}
                      {language === 'de' && 'Melde dich über die Website von Fresh Skateschool an oder schick eine E-Mail.'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://freshskateschool.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold py-2.5 px-4 rounded-xl hover:bg-primary-50 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {text.cta}
                    </a>
                    <a
                      href={`mailto:${text.partner.email}`}
                      className="flex items-center justify-center gap-2 bg-white/15 text-white font-medium py-2.5 px-4 rounded-xl hover:bg-white/25 transition-colors text-sm border border-white/20"
                    >
                      {language === 'nl' && 'Of mail ons'}
                      {language === 'en' && 'Or email us'}
                      {language === 'de' && 'Oder maile uns'}
                    </a>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Seasons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            {language === 'nl' && 'Leslocaties per Seizoen'}
            {language === 'en' && 'Lesson Locations by Season'}
            {language === 'de' && 'Unterrichtsorte pro Saison'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {text.seasons.map((season, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        index === 0 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <season.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-neutral-800 mb-2">
                          {season.title}
                        </h4>
                        <p className="text-primary-600 font-medium mb-2">
                          {season.period}
                        </p>
                        <div className="flex items-center gap-2 text-neutral-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{season.location}</span>
                        </div>
                        <p className="text-neutral-600">
                          {season.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Offerings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            {language === 'nl' && 'Lesaanbod'}
            {language === 'en' && 'Lesson Options'}
            {language === 'de' && 'Unterrichtsangebot'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {text.offerings.map((offering, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <offering.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-800 mb-3">
                      {offering.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      {offering.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {text.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-neutral-700 leading-relaxed">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default LessenSection;

