import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowLeft, Users } from 'lucide-react';
import eventsData from '../data/events.json';
import type { EventPost } from '../types/event';
import type { AppContext } from '../App';

function formatDate(dateStr: string, language: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(
    language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
}

const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useOutletContext<AppContext>();

  const event = (eventsData as EventPost[]).find((e) => e.slug === slug);

  // Instagram embed verwerken zodra pagina geladen is
  useEffect(() => {
    if (!event?.instagramEmbedHtml) return;

    const runProcess = () => {
      (window as any).instgrm?.Embeds?.process();
    };

    if ((window as any).instgrm) {
      runProcess();
      const retry = setTimeout(runProcess, 600);
      return () => clearTimeout(retry);
    } else {
      const existing = document.querySelector('script[src*="instagram.com/embed.js"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', runProcess);
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.onload = runProcess;
        document.body.appendChild(script);
      }
    }
  }, [event?.slug]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Event niet gevonden</h1>
          <Link to="/#events" className="text-primary-600 hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Terug naar events
          </Link>
        </div>
      </div>
    );
  }

  const translation = event.translations[language as 'nl' | 'en' | 'de'] ?? event.translations.nl;
  const formattedDate = formatDate(event.date, language);

  // Schema.org Event structured data
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: translation.title,
    description: translation.excerpt,
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Skatepark De Fabriek',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hogebothofstraat 49',
        addressLocality: 'Enschede',
        postalCode: '7513 AX',
        addressCountry: 'NL',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'SV De Fabriek',
      url: 'https://defabriek.org',
    },
    url: `https://defabriek.org/events/${event.slug}/`,
  };

  return (
    <>
      <Helmet>
        <title>{`${translation.title} | De Fabriek Skatepark Enschede`}</title>
        <meta name="description" content={translation.excerpt} />
        <link rel="canonical" href={`https://defabriek.org/events/${event.slug}/`} />
        <meta property="og:title" content={translation.title} />
        <meta property="og:description" content={translation.excerpt} />
        <meta property="og:url" content={`https://defabriek.org/events/${event.slug}/`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://defabriek.org/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
      </Helmet>

      <main className="pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/#events"
              className="inline-flex items-center gap-2 text-primary-200 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Events
            </Link>
            <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
              {event.label}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {translation.title}
            </h1>
            <div className="flex items-center gap-2 text-primary-200 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4 mb-10">
            {translation.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Instagram embed */}
          {event.instagramEmbedHtml && (
            <div className="flex justify-center mb-10">
              <div
                className="w-full max-w-sm"
                dangerouslySetInnerHTML={{ __html: event.instagramEmbedHtml }}
              />
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Word vrijwilliger bij De Fabriek</h2>
            <p className="text-primary-100 text-sm mb-5">
              Help mee events als dit mogelijk te maken.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            >
              Neem contact op
            </Link>
          </div>
        </article>
      </main>
    </>
  );
};

export default EventDetailPage;
