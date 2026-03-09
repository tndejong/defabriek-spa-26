import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import type { Language } from '../../App';
import type { EventPost } from '../../types/event';
import eventsData from '../../data/events.json';

interface EventsSectionProps {
  language: Language;
}

const content = {
  nl: {
    badge: 'Events',
    title: 'Laatste events',
    subtitle: 'Bekijk wat er bij De Fabriek is gebeurd.',
    readMore: 'Lees meer',
  },
  en: {
    badge: 'Events',
    title: 'Latest events',
    subtitle: 'See what has been happening at De Fabriek.',
    readMore: 'Read more',
  },
  de: {
    badge: 'Events',
    title: 'Neueste Events',
    subtitle: 'Schau was bei De Fabriek passiert ist.',
    readMore: 'Mehr lesen',
  },
};

function formatDate(dateStr: string, language: Language): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(
    language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
}

const EventsSection: React.FC<EventsSectionProps> = ({ language }) => {
  const t = content[language];

  const events = (eventsData as EventPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="events" className="section-padding bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase mb-4">
            🛹 {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const translation = event.translations[language];
            return (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/events/${event.slug}`} className="block h-full">
                  <Card className="glass h-full hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-xl bg-white/80 border-2 border-white/40 shadow-lg">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                          {event.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-sm mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(event.date, language)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">
                        {translation.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1">
                        {translation.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm">
                        {t.readMore} →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
