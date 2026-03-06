import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, X } from 'lucide-react';
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
    volunteer: 'Word vrijwilliger',
    volunteerText: 'Wil jij ook bijdragen aan events zoals deze?',
  },
  en: {
    badge: 'Events',
    title: 'Latest events',
    subtitle: 'See what has been happening at De Fabriek.',
    readMore: 'Read more',
    volunteer: 'Become a volunteer',
    volunteerText: 'Do you also want to contribute to events like this?',
  },
  de: {
    badge: 'Events',
    title: 'Neueste Events',
    subtitle: 'Schau was bei De Fabriek passiert ist.',
    readMore: 'Mehr lesen',
    volunteer: 'Freiwilliger werden',
    volunteerText: 'Möchtest du auch zu Events wie diesem beitragen?',
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
  const [selectedEvent, setSelectedEvent] = useState<EventPost | null>(null);
  const [embedReady, setEmbedReady] = useState(false);

  const events = (eventsData as EventPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Sluit modal met Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Blokkeer body scroll terwijl modal open is
  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  // Instagram embed — reset en laad opnieuw per event
  useEffect(() => {
    setEmbedReady(false);
    if (!selectedEvent?.instagramEmbedHtml) return;
    const process = () => {
      (window as any).instgrm?.Embeds.process();
      setEmbedReady(true);
    };
    if ((window as any).instgrm) {
      process();
    } else {
      const existing = document.querySelector('script[src*="instagram.com/embed.js"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', process);
      } else {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = process;
        document.body.appendChild(script);
      }
    }
  }, [selectedEvent?.slug]);

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
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full text-left"
                >
                  <Card className="glass h-full hover:shadow-xl transition-all duration-300 cursor-pointer">
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
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal — via portal zodat fixed positioning niet beïnvloed wordt door parent transforms */}
      {createPortal(<AnimatePresence>
        {selectedEvent && (() => {
          const translation = selectedEvent.translations[language];
          return (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 z-50"
                onClick={() => setSelectedEvent(null)}
              />

              {/* Panel — wrapper centreert via flexbox, motion.div doet alleen animatie */}
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
              <motion.div
                key="panel"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-hide bg-white rounded-2xl shadow-2xl pointer-events-auto"
              >
                {/* Sluit-knop */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-600" />
                </button>

                <div className="p-6 sm:p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                      {selectedEvent.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-400 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(selectedEvent.date, language)}
                    </span>
                  </div>

                  {/* Titel */}
                  <h2 className="text-2xl font-bold text-neutral-900 mb-5 leading-tight pr-8">
                    {translation.title}
                  </h2>

                  {/* Body */}
                  <div className="mb-6 space-y-3">
                    {translation.body.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-neutral-700 leading-relaxed text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Instagram embed — alleen tonen als script geladen is */}
                  {selectedEvent.instagramEmbedHtml && embedReady && (
                    <div className="flex justify-center mb-6">
                      <div
                        className="w-full max-w-sm"
                        dangerouslySetInnerHTML={{ __html: selectedEvent.instagramEmbedHtml }}
                      />
                    </div>
                  )}

                  {/* CTA vrijwilliger */}
                  <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-5 text-center text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-primary-100 text-sm mb-3">{t.volunteerText}</p>
                    <button
                      onClick={() => {
                        setSelectedEvent(null);
                        setTimeout(() => window.dispatchEvent(new CustomEvent('open-volunteer-widget')), 150);
                      }}
                      className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                    >
                      {t.volunteer}
                    </button>
                  </div>
                </div>
              </motion.div>
              </div>
            </>
          );
        })()}
      </AnimatePresence>, document.body)}
    </section>
  );
};

export default EventsSection;
