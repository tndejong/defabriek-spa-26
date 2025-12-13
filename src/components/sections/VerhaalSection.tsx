import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface VerhaalSectionProps {
  language: Language;
}

const VerhaalSection: React.FC<VerhaalSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Ons Verhaal',
      subtitle: 'Door skateboarders, voor skateboarders',
      intro: 'Skateboardvereniging De Fabriek heeft als doel het skateboardklimaat in Enschede en omgeving te verbeteren en te promoten. Het skatepark is tegelijkertijd een belangrijk instrument en doel om dit allemaal te bereiken.',
      goals: {
        title: 'Onze Doelen',
        items: [
          'Een centrum creëren voor alles wat met skateboarden te maken heeft in Enschede en omgeving.',
          'Het krijgen en behouden van een goede relatie met de doelgroep door het principe "door skateboarders, voor skateboarders" toe te passen.',
          'Open staan voor initiatieven van externe leden of groepen.',
          'Actief jonge en/of beginnende skateboarders benaderen en motiveren.'
        ]
      },
      origin: {
        title: 'Hoe het begon',
        text: 'De Fabriek is in 2001 ontstaan uit een initiatief van een groep skateboarders in Enschede die de kans zagen om de skateboarders als een groep bij elkaar te brengen en samen een kans te creëren waar ze samen hun sport konden beoefenen. Vervolgens hebben ze een kleinschalig, zelfbetaald indoor skatepark opgezet en daar een jaar doorgebracht. Toen dit park niet meer mogelijk was, besloot een aantal van die mensen een vereniging op te richten om het skateboarden klimaat in Enschede en omstreken te promoten en te verbeteren. Zo ontstond op 19 februari 2002 skateboardclub De Fabriek.'
      },
      timeline: [
        {
          year: '2002',
          title: 'Oprichting',
          description: 'Op 19 februari 2002 wordt skateboardclub De Fabriek officieel opgericht door een groep enthousiaste skateboarders.'
        },
        {
          year: '2010',
          title: 'Groei',
          description: 'De vereniging groeit en trekt steeds meer leden aan die samen werken aan een betere skatecultuur in de regio.'
        },
        {
          year: '2016',
          title: 'Nieuwe Locatie',
          description: 'We verhuizen naar een grotere locatie met professionele faciliteiten voor alle niveaus.'
        },
        {
          year: '2020',
          title: 'Uitdagingen',
          description: 'Ondanks moeilijke tijden blijft de community sterk en ondersteunt elkaar.'
        },
        {
          year: '2024',
          title: 'Vandaag',
          description: 'De Fabriek is hét centrum voor skateboarden in Enschede en omgeving met een actieve en groeiende community.'
        }
      ],
      values: [
        {
          icon: Heart,
          title: 'Passie',
          description: 'Door skateboarders, voor skateboarders. We leven voor onze sport.'
        },
        {
          icon: Users,
          title: 'Gemeenschap',
          description: 'We brengen skateboarders samen en bouwen aan een sterke community.'
        },
        {
          icon: Lightbulb,
          title: 'Open voor Initiatief',
          description: 'We staan open voor ideeën van leden en externe groepen.'
        },
        {
          icon: Target,
          title: 'Motiveren',
          description: 'We benaderen en motiveren actief jonge en beginnende skateboarders.'
        }
      ],
      quote: '"Door skateboarders, voor skateboarders - dat is waar De Fabriek voor staat."',
      author: '- Skateboardvereniging De Fabriek'
    },
    en: {
      title: 'Our Story',
      subtitle: 'By skateboarders, for skateboarders',
      intro: 'Skateboard association De Fabriek aims to improve and promote the skateboarding climate in Enschede and the surrounding area. The skatepark is both an important tool and goal to achieve this.',
      goals: {
        title: 'Our Goals',
        items: [
          'Create a center for everything related to skateboarding in Enschede and surroundings.',
          'Obtain and maintain a good relationship with the target group by applying the principle "by skateboarders, for skateboarders".',
          'Be open to initiatives from external members or groups.',
          'Actively approach and motivate young and/or beginning skateboarders.'
        ]
      },
      origin: {
        title: 'How it started',
        text: 'De Fabriek was created in 2001 from an initiative of a group of skateboarders in Enschede who saw the opportunity to bring skateboarders together as a group and create a chance where they could practice their sport together. They set up a small-scale, self-funded indoor skatepark and spent a year there. When this park was no longer possible, some of those people decided to start an association to promote and improve the skateboarding climate in Enschede and surroundings. This is how skateboard club De Fabriek was founded on February 19, 2002.'
      },
      timeline: [
        {
          year: '2002',
          title: 'Foundation',
          description: 'On February 19, 2002, skateboard club De Fabriek was officially founded by a group of enthusiastic skateboarders.'
        },
        {
          year: '2010',
          title: 'Growth',
          description: 'The association grows and attracts more and more members working together on a better skate culture in the region.'
        },
        {
          year: '2016',
          title: 'New Location',
          description: 'We move to a larger location with professional facilities for all levels.'
        },
        {
          year: '2020',
          title: 'Challenges',
          description: 'Despite difficult times, the community remains strong and supports each other.'
        },
        {
          year: '2024',
          title: 'Today',
          description: 'De Fabriek is THE center for skateboarding in Enschede and surroundings with an active and growing community.'
        }
      ],
      values: [
        {
          icon: Heart,
          title: 'Passion',
          description: 'By skateboarders, for skateboarders. We live for our sport.'
        },
        {
          icon: Users,
          title: 'Community',
          description: 'We bring skateboarders together and build a strong community.'
        },
        {
          icon: Lightbulb,
          title: 'Open to Initiative',
          description: 'We are open to ideas from members and external groups.'
        },
        {
          icon: Target,
          title: 'Motivate',
          description: 'We actively approach and motivate young and beginning skateboarders.'
        }
      ],
      quote: '"By skateboarders, for skateboarders - that\'s what De Fabriek stands for."',
      author: '- Skateboard Association De Fabriek'
    },
    de: {
      title: 'Unsere Geschichte',
      subtitle: 'Von Skateboardern, für Skateboarder',
      intro: 'Der Skateboard-Verein De Fabriek hat das Ziel, das Skateboard-Klima in Enschede und Umgebung zu verbessern und zu fördern. Der Skatepark ist gleichzeitig ein wichtiges Instrument und Ziel, um dies zu erreichen.',
      goals: {
        title: 'Unsere Ziele',
        items: [
          'Ein Zentrum für alles rund ums Skateboarden in Enschede und Umgebung schaffen.',
          'Eine gute Beziehung zur Zielgruppe aufbauen und pflegen nach dem Prinzip "von Skateboardern, für Skateboarder".',
          'Offen sein für Initiativen von externen Mitgliedern oder Gruppen.',
          'Aktiv junge und/oder beginnende Skateboarder ansprechen und motivieren.'
        ]
      },
      origin: {
        title: 'Wie es begann',
        text: 'De Fabriek entstand 2001 aus einer Initiative einer Gruppe von Skateboardern in Enschede, die die Chance sahen, Skateboarder als Gruppe zusammenzubringen und gemeinsam eine Möglichkeit zu schaffen, ihren Sport auszuüben. Sie bauten einen kleinen, selbstfinanzierten Indoor-Skatepark auf und verbrachten dort ein Jahr. Als dieser Park nicht mehr möglich war, beschloss eine Gruppe, einen Verein zu gründen, um das Skateboard-Klima in Enschede und Umgebung zu fördern und zu verbessern. So entstand am 19. Februar 2002 der Skateboardclub De Fabriek.'
      },
      timeline: [
        {
          year: '2002',
          title: 'Gründung',
          description: 'Am 19. Februar 2002 wird der Skateboardclub De Fabriek offiziell von einer Gruppe enthusiastischer Skateboarder gegründet.'
        },
        {
          year: '2010',
          title: 'Wachstum',
          description: 'Der Verein wächst und zieht immer mehr Mitglieder an, die gemeinsam an einer besseren Skate-Kultur in der Region arbeiten.'
        },
        {
          year: '2016',
          title: 'Neuer Standort',
          description: 'Wir ziehen in einen größeren Standort mit professionellen Einrichtungen für alle Levels.'
        },
        {
          year: '2020',
          title: 'Herausforderungen',
          description: 'Trotz schwieriger Zeiten bleibt die Community stark und unterstützt sich gegenseitig.'
        },
        {
          year: '2024',
          title: 'Heute',
          description: 'De Fabriek ist DAS Zentrum für Skateboarding in Enschede und Umgebung mit einer aktiven und wachsenden Community.'
        }
      ],
      values: [
        {
          icon: Heart,
          title: 'Leidenschaft',
          description: 'Von Skateboardern, für Skateboarder. Wir leben für unseren Sport.'
        },
        {
          icon: Users,
          title: 'Gemeinschaft',
          description: 'Wir bringen Skateboarder zusammen und bauen eine starke Community auf.'
        },
        {
          icon: Lightbulb,
          title: 'Offen für Initiativen',
          description: 'Wir sind offen für Ideen von Mitgliedern und externen Gruppen.'
        },
        {
          icon: Target,
          title: 'Motivieren',
          description: 'Wir sprechen junge und beginnende Skateboarder aktiv an und motivieren sie.'
        }
      ],
      quote: '"Von Skateboardern, für Skateboarder - dafür steht De Fabriek."',
      author: '- Skateboardverein De Fabriek'
    }
  };

  const text = content[language];

  return (
    <section id="verhaal" className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
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
            📖 Ons Verhaal
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{text.title}</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-neutral-600 mb-8 font-light">
            {text.subtitle}
          </h3>
          <p className="text-lg text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            {text.intro}
          </p>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-800 mb-6 text-center">
                {text.goals.title}
              </h3>
              <ul className="space-y-4">
                {text.goals.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Origin Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                {text.origin.title}
              </h3>
              <p className="text-neutral-700 leading-relaxed text-lg">
                {text.origin.text}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            {language === 'nl' && 'Onze Tijdlijn'}
            {language === 'en' && 'Our Timeline'}
            {language === 'de' && 'Unsere Zeitleiste'}
          </h3>

          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-primary-700 rounded-full hidden md:block" style={{ top: '80px' }}></div>

          {text.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              } justify-center`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>

              {/* Content card */}
              <Card className={`glass w-full max-w-md mx-4 md:mx-0 ${
                index % 2 === 0 ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8'
              }`}>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gradient mb-2">
                    {item.year}
                  </div>
                  <h4 className="text-xl font-semibold text-neutral-800 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            {language === 'nl' && 'Onze Waarden'}
            {language === 'en' && 'Our Values'}
            {language === 'de' && 'Unsere Werte'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {text.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="glass text-center h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-neutral-800 mb-3">
                      {value.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass max-w-4xl mx-auto">
            <CardContent className="p-12">
              <blockquote className="text-2xl md:text-3xl font-light text-neutral-700 italic mb-6 leading-relaxed">
                {text.quote}
              </blockquote>
              <cite className="text-neutral-600 font-medium">
                {text.author}
              </cite>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default VerhaalSection;

