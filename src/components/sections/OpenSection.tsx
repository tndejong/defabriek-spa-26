import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MessageCircle, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Language } from '../../App';

interface OpenSectionProps {
  language: Language;
}

const OpenSection: React.FC<OpenSectionProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'Openingstijden & Informatie',
      subtitle: 'Wanneer je ons kunt vinden',
      description: 'Op openingsdagen ben je altijd vrijblijvend welkom. Kom gewoon langs tegen een kleine entree – geen reservering nodig.',
      scheduleTitle: 'Openingstijden',
      schedule: [
        { day: 'Maandag', hours: 'Dicht', closed: true },
        { day: 'Dinsdag', hours: 'Dicht', closed: true },
        { day: 'Woensdag', hours: '18:30 - 23:00', closed: false },
        { day: 'Donderdag', hours: '18:30 - 23:00', closed: false },
        { day: 'Vrijdag', hours: '18:30 - 23:00', closed: false },
        { day: 'Zaterdag', hours: '13:00 - 23:00', closed: false },
        { day: 'Zondag', hours: '13:00 - 20:00', closed: false },
      ],
      notices: {
        title: 'Let op',
        items: []
      },
      volunteer: {
        title: 'Wij zijn op zoek naar bar personeel!',
        description: 'Woon je in Enschede of dichtbij Enschede en wil je ons helpen met bardiensten op vrijwillige basis? Stuur je contactgegevens naar ons en wij nemen contact met je op!',
        cta: 'Word Vrijwilliger'
      },
      info: [
        {
          icon: MessageCircle,
          title: 'Neem Contact Op',
          content: 'Stuur ons een bericht',
          description: 'Voor vragen en informatie',
          link: '#contact'
        },
        {
          icon: Calendar,
          title: 'Vrijblijvend Toegankelijk',
          content: 'Wo t/m Zo',
          description: 'Kom gewoon langs, geen reservering',
          link: null
        },
        {
          icon: Heart,
          title: 'Vrijwilligers Gezocht',
          content: 'Help mee!',
          description: 'Word deel van ons team',
          link: '#contact'
        }
      ]
    },
    en: {
      title: 'Opening Hours & Information',
      subtitle: 'When you can find us',
      description: 'On opening days you\'re always welcome to drop in. Just come by for a small entrance fee – no reservation needed.',
      scheduleTitle: 'Opening Hours',
      schedule: [
        { day: 'Monday', hours: 'Closed', closed: true },
        { day: 'Tuesday', hours: 'Closed', closed: true },
        { day: 'Wednesday', hours: '18:30 - 23:00', closed: false },
        { day: 'Thursday', hours: '18:30 - 23:00', closed: false },
        { day: 'Friday', hours: '18:30 - 23:00', closed: false },
        { day: 'Saturday', hours: '13:00 - 23:00', closed: false },
        { day: 'Sunday', hours: '13:00 - 20:00', closed: false },
      ],
      notices: {
        title: 'Please note',
        items: []
      },
      volunteer: {
        title: 'We are looking for bar staff!',
        description: 'Do you live in Enschede or nearby and would you like to help us with bar shifts on a voluntary basis? Send us your contact details and we will get in touch!',
        cta: 'Become a Volunteer'
      },
      info: [
        {
          icon: MessageCircle,
          title: 'Get in Touch',
          content: 'Send us a message',
          description: 'For questions and information',
          link: '#contact'
        },
        {
          icon: Calendar,
          title: 'Freely Accessible',
          content: 'Wed - Sun',
          description: 'Just drop in, no reservation',
          link: null
        },
        {
          icon: Heart,
          title: 'Volunteers Wanted',
          content: 'Help us!',
          description: 'Become part of our team',
          link: '#contact'
        }
      ]
    },
    de: {
      title: 'Öffnungszeiten & Informationen',
      subtitle: 'Wann Sie uns finden können',
      description: 'An Öffnungstagen sind Sie immer unverbindlich willkommen. Kommen Sie einfach vorbei gegen einen kleinen Eintritt – keine Reservierung nötig.',
      scheduleTitle: 'Öffnungszeiten',
      schedule: [
        { day: 'Montag', hours: 'Geschlossen', closed: true },
        { day: 'Dienstag', hours: 'Geschlossen', closed: true },
        { day: 'Mittwoch', hours: '18:30 - 23:00', closed: false },
        { day: 'Donnerstag', hours: '18:30 - 23:00', closed: false },
        { day: 'Freitag', hours: '18:30 - 23:00', closed: false },
        { day: 'Samstag', hours: '13:00 - 23:00', closed: false },
        { day: 'Sonntag', hours: '13:00 - 20:00', closed: false },
      ],
      notices: {
        title: 'Bitte beachten',
        items: []
      },
      volunteer: {
        title: 'Wir suchen Barpersonal!',
        description: 'Wohnen Sie in Enschede oder in der Nähe und möchten Sie uns freiwillig bei Bardiensten helfen? Senden Sie uns Ihre Kontaktdaten und wir melden uns bei Ihnen!',
        cta: 'Freiwilliger werden'
      },
      info: [
        {
          icon: MessageCircle,
          title: 'Kontaktieren Sie uns',
          content: 'Senden Sie uns eine Nachricht',
          description: 'Für Fragen und Informationen',
          link: '#contact'
        },
        {
          icon: Calendar,
          title: 'Unverbindlich Zugänglich',
          content: 'Mi - So',
          description: 'Einfach vorbeikommen, keine Reservierung',
          link: null
        },
        {
          icon: Heart,
          title: 'Freiwillige Gesucht',
          content: 'Helfen Sie mit!',
          description: 'Werden Sie Teil unseres Teams',
          link: '#contact'
        }
      ]
    }
  };

  const text = content[language];

  return (
    <section id="open" className="section-padding bg-white">
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
            🕐 Openingstijden
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{text.title}</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-neutral-600 mb-8 font-light">
            {text.subtitle}
          </h3>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            {text.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Schedule Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-neutral-800 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-primary-600" />
                  {text.scheduleTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {text.schedule.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        item.closed 
                          ? 'bg-neutral-100 text-neutral-500' 
                          : 'bg-primary-50'
                      }`}
                    >
                      <span className={`font-medium ${item.closed ? 'text-neutral-500' : 'text-neutral-800'}`}>
                        {item.day}
                      </span>
                      <span className={`font-bold ${
                        item.closed 
                          ? 'text-neutral-400' 
                          : 'text-primary-600'
                      }`}>
                        {item.hours}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notices & Volunteer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:pt-16"
          >
            {/* Volunteer Card */}
            <Card className="glass border-primary-200 bg-primary-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-primary-800 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary-600" />
                  {text.volunteer.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-primary-700 leading-relaxed">
                  {text.volunteer.description}
                </p>
                <Button className="btn-primary" asChild>
                  <a href="#contact">
                    <Heart className="w-4 h-4 mr-2" />
                    {text.volunteer.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {text.info.map((info, index) => {
            const cardContent = (
              <Card className={`glass text-center h-full hover:shadow-xl transition-all duration-300 ${info.link ? 'cursor-pointer' : ''}`}>
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                    {info.title}
                  </h3>
                  <div className="text-2xl font-bold text-gradient mb-2">
                    {info.content}
                  </div>
                  <p className="text-neutral-600 text-sm">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            );

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                {info.link ? (
                  <a href={info.link}>{cardContent}</a>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OpenSection;

