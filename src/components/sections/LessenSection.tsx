import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Calendar, CheckCircle, ExternalLink, Snowflake, Sun, MapPin, Info } from 'lucide-react';
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
    <section id="lessen" className="section-padding section-surface">
      <div className="container-max max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">{text.subtitle}</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{text.title}</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {text.partner.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 rounded-2xl border border-neutral-100 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-1">
                  {language === 'nl' && 'Officiële partner'}
                  {language === 'en' && 'Official partner'}
                  {language === 'de' && 'Offizieller Partner'}
                </p>
                <h3 className="text-xl font-bold text-neutral-900">{text.partner.name}</h3>
                <p className="text-sm text-neutral-500">{text.partner.tagline}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <a
                href="https://freshskateschool.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {text.cta}
              </a>
              <a
                href={`mailto:${text.partner.email}`}
                className="inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-700 font-medium py-2.5 px-4 rounded-xl hover:bg-neutral-50 transition-colors text-sm"
              >
                {language === 'nl' && 'Mail'}
                {language === 'en' && 'Email'}
                {language === 'de' && 'Mail'}
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            {waitlistMsg[language]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {text.seasons.map((season, index) => (
            <div key={season.title} className="flex gap-4 rounded-2xl border border-neutral-100 bg-white p-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                index === 0 ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <season.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">{season.title}</h3>
                <p className="text-sm text-primary-600 font-medium">{season.period}</p>
                <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {season.location}
                </p>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{season.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {text.offerings.map((offering) => (
            <div key={offering.title} className="rounded-2xl border border-neutral-100 bg-white p-5">
              <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-xl flex items-center justify-center mb-3">
                <offering.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">{offering.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{offering.description}</p>
            </div>
          ))}
        </div>

        <ul className="flex flex-wrap justify-center gap-2">
          {text.benefits.map((benefit) => (
            <li key={benefit} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700">
              <CheckCircle className="w-3.5 h-3.5 text-primary-600" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LessenSection;

