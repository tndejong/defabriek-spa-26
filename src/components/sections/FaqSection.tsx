import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface FaqSectionProps {
  language: Language;
}

type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; url: string };
};

const faqContent: Record<Language, { title: string; subtitle: string; items: FaqItem[] }> = {
  nl: {
    title: 'Veelgestelde Vragen',
    subtitle: 'Alles wat je wilt weten over De Fabriek',
    items: [
      {
        question: 'Moet ik reserveren?',
        answer: 'Nee, reserveren is niet nodig. Op openingsdagen ben je altijd vrijblijvend welkom – gewoon langskomen!'
      },
      {
        question: 'Wat zijn jullie actuele openingstijden?',
        answer: 'Onze reguliere tijden staan op de site, maar controleer onze socials voor wijzigingen op feestdagen.',
        link: { label: 'Bekijk onze Instagram', url: 'https://www.instagram.com/skateparkdefabriek/' }
      },
      {
        question: 'Kan ik een proefles volgen?',
        answer: 'Ja, we bieden gratis proeflessen aan voor iedereen die geïnteresseerd is in onze skateboard lessen.'
      },
      {
        question: 'Zijn er lessen voor kinderen?',
        answer: 'Absoluut! We hebben speciale lessen voor kinderen vanaf 6 jaar, gegeven door gecertificeerde instructeurs.'
      },
      {
        question: 'Moet ik mijn eigen skateboard hebben?',
        answer: 'Nee, we verhuren skateboards en beschermingsmateriaal tijdens de lessen. Je kunt ook je eigen materiaal meenemen.'
      },
      {
        question: 'Kan ik lid worden?',
        answer: 'We gaan binnenkort starten met lidmaatschappen en willen graag de animo peilen. Laat van je horen als je geïnteresseerd bent! Je kunt je ook aanmelden als vrijwilliger.'
      },
      {
        question: 'Kan ik vrijwilliger worden?',
        answer: 'Ja! We zijn altijd op zoek naar vrijwilligers. Neem contact met ons op als je wilt helpen.'
      },
    ]
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you want to know about De Fabriek',
    items: [
      {
        question: 'Do I need to make a reservation?',
        answer: 'No reservation needed. On opening days you\'re always welcome – just drop in!'
      },
      {
        question: 'What are your current opening hours?',
        answer: 'Our regular hours are listed on the site, but check our socials for changes on public holidays.',
        link: { label: 'View our Instagram', url: 'https://www.instagram.com/skateparkdefabriek/' }
      },
      {
        question: 'Can I take a trial lesson?',
        answer: 'Yes, we offer free trial lessons for anyone interested in our skateboard lessons.'
      },
      {
        question: 'Are there lessons for children?',
        answer: 'Absolutely! We have special lessons for children from 6 years old, taught by certified instructors.'
      },
      {
        question: 'Do I need to bring my own skateboard?',
        answer: 'No, we rent skateboards and protective gear during lessons. You can also bring your own equipment.'
      },
      {
        question: 'Can I become a member?',
        answer: 'We\'re going to start offering memberships soon and want to gauge the interest. Let us know if you\'re interested! You can also sign up as a volunteer.'
      },
      {
        question: 'Can I become a volunteer?',
        answer: 'Yes! We\'re always looking for volunteers. Get in touch if you\'d like to help.'
      },
    ]
  },
  de: {
    title: 'Häufig Gestellte Fragen',
    subtitle: 'Alles was du über De Fabriek wissen möchtest',
    items: [
      {
        question: 'Muss ich reservieren?',
        answer: 'Nein, eine Reservierung ist nicht nötig. An Öffnungstagen sind Sie immer unverbindlich willkommen – einfach vorbeikommen!'
      },
      {
        question: 'Was sind eure aktuellen Öffnungszeiten?',
        answer: 'Unsere regulären Zeiten stehen auf der Website, aber prüfen Sie unsere Socials für Änderungen an Feiertagen.',
        link: { label: 'Zu unserem Instagram', url: 'https://www.instagram.com/skateparkdefabriek/' }
      },
      {
        question: 'Kann ich eine Probelektion machen?',
        answer: 'Ja, wir bieten kostenlose Probelektionen für alle an, die an unseren Skateboard-Lektionen interessiert sind.'
      },
      {
        question: 'Gibt es Lektionen für Kinder?',
        answer: 'Absolut! Wir haben spezielle Lektionen für Kinder ab 6 Jahren, unterrichtet von zertifizierten Instruktoren.'
      },
      {
        question: 'Muss ich mein eigenes Skateboard mitbringen?',
        answer: 'Nein, wir vermieten Skateboards und Schutzausrüstung während der Lektionen. Sie können auch Ihre eigene Ausrüstung mitbringen.'
      },
      {
        question: 'Kann ich Mitglied werden?',
        answer: 'Wir werden bald mit Mitgliedschaften starten und möchten das Interesse erfahren. Melden Sie sich, wenn Sie interessiert sind! Sie können sich auch als Freiwilliger anmelden.'
      },
      {
        question: 'Kann ich Freiwilliger werden?',
        answer: 'Ja! Wir suchen immer Freiwillige. Nehmen Sie Kontakt mit uns auf, wenn Sie helfen möchten.'
      },
    ]
  }
};

const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = faqContent[language];

  return (
    <section id="faq" className="section-padding bg-gradient-to-br from-neutral-50 via-white to-primary-50 scroll-mt-16">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            💬 FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <p className="text-xl text-neutral-600 font-light">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <Card className="glass h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <MessageCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                    <h4 className="font-semibold text-neutral-800 leading-snug">
                      {item.question}
                    </h4>
                  </div>
                  <p className="text-neutral-600 leading-relaxed pl-8">
                    {item.answer}
                    {item.link && (
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-primary-600 hover:text-primary-700 underline underline-offset-2 font-medium"
                      >
                        {item.link.label} →
                      </a>
                    )}
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

export default FaqSection;
