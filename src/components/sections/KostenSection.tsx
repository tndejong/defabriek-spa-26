import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sparkles, ParkingCircle, CreditCard, HelpCircle, Check } from 'lucide-react';
import type { Language } from '../../App';

interface KostenSectionProps {
  language: Language;
}

const KostenSection: React.FC<KostenSectionProps> = ({ language }) => {
  const content = {
    nl: {
      badge: 'Prijzen',
      title: 'Entree kosten',
      subtitle: 'Vrijblijvend toegankelijk op openingsdagen',
      description: 'Op openingsdagen ben je altijd welkom – kom gewoon langs tegen een kleine entree. We hanteren verschillende prijzen per sport, omdat sommige sporten meer slijtage aan ons park veroorzaken.',
      perVisit: 'per bezoek',
      bestValue: 'Meest voordelig',
      save: 'Bespaar t.o.v. los',
      cards: [
        {
          emoji: '🛹',
          title: 'Skateboarden / Inlinen',
          price: '€ 7,-',
          perks: ['Alle obstacles', 'Geen reservering nodig', 'Vrijblijvend welkom'],
          highlight: false,
        },
        {
          emoji: '🚲',
          title: 'BMX / Steppen',
          price: '€ 8,-',
          perks: ['Alle obstacles', 'Geen reservering nodig', 'Vrijblijvend welkom'],
          highlight: false,
        },
        {
          emoji: '💳',
          title: 'Strippenkaart',
          subtitle: '12× toegang',
          price: '€ 70,-',
          priceNote: '≈ € 5,83 per bezoek',
          savings: '↓ Bespaar tot € 26 t.o.v. los',
          perks: ['Online bijgehouden via MySubs', 'Alle sporten', 'Nooit verlopen'],
          highlight: true,
          ctaLabel: 'Binnenkort online — vraag aan de balie',
          ctaUrl: '',
        },
      ],
      parking: {
        title: 'Parkeerkaartje beschikbaar',
        description: 'Goedkoper parkeren op het parkeerdek boven — vraag aan de balie.',
        price: '€ 2,-',
      },
      faqLabel: 'Veelgestelde vragen over tarieven',
      contactLabel: 'Nog vragen? Neem contact op',
    },
    en: {
      badge: 'Pricing',
      title: 'Entrance fees',
      subtitle: 'Freely accessible on opening days',
      description: 'On opening days you\'re always welcome – just drop in for a small entrance fee. We have different prices per sport, as some sports cause more wear to our park.',
      perVisit: 'per visit',
      bestValue: 'Best value',
      save: 'Save vs. single entry',
      cards: [
        {
          emoji: '🛹',
          title: 'Skateboarding / Inline skating',
          price: '€ 7',
          perks: ['All obstacles', 'No reservation needed', 'Always welcome'],
          highlight: false,
        },
        {
          emoji: '🚲',
          title: 'BMX / Scooters',
          price: '€ 8',
          perks: ['All obstacles', 'No reservation needed', 'Always welcome'],
          highlight: false,
        },
        {
          emoji: '💳',
          title: 'Prepaid card',
          subtitle: '12× entry',
          price: '€ 70',
          priceNote: '≈ € 5.83 per visit',
          savings: '↓ Save up to € 26 vs. single entry',
          perks: ['Tracked online via MySubs', 'All sports', 'Never expires'],
          highlight: true,
          ctaLabel: 'Coming soon — ask at the desk',
          ctaUrl: '',
        },
      ],
      parking: {
        title: 'Parking pass available',
        description: 'Cheaper parking on the deck above — ask at the desk.',
        price: '€ 2',
      },
      faqLabel: 'Frequently asked questions about pricing',
      contactLabel: 'Still have questions? Get in touch',
    },
    de: {
      badge: 'Preise',
      title: 'Eintrittspreise',
      subtitle: 'Unverbindlich zugänglich an Öffnungstagen',
      description: 'An Öffnungstagen sind Sie immer willkommen – kommen Sie einfach vorbei gegen einen kleinen Eintritt. Wir haben unterschiedliche Preise pro Sportart, da einige mehr Abnutzung verursachen.',
      perVisit: 'pro Besuch',
      bestValue: 'Bestes Angebot',
      save: 'Sparen gegenüber Einzeleintritt',
      cards: [
        {
          emoji: '🛹',
          title: 'Skateboarden / Inlineskaten',
          price: '€ 7',
          perks: ['Alle Hindernisse', 'Keine Reservierung nötig', 'Unverbindlich willkommen'],
          highlight: false,
        },
        {
          emoji: '🚲',
          title: 'BMX / Scooter',
          price: '€ 8',
          perks: ['Alle Hindernisse', 'Keine Reservierung nötig', 'Unverbindlich willkommen'],
          highlight: false,
        },
        {
          emoji: '💳',
          title: 'Streifenkarte',
          subtitle: '12× Eintritt',
          price: '€ 70',
          priceNote: '≈ € 5,83 pro Besuch',
          savings: '↓ Bis zu € 26 sparen',
          perks: ['Online verwaltet via MySubs', 'Alle Sportarten', 'Läuft nicht ab'],
          highlight: true,
          ctaLabel: 'Demnächst online — an der Kasse erfragen',
          ctaUrl: '',
        },
      ],
      parking: {
        title: 'Parkausweis erhältlich',
        description: 'Günstiger parken auf dem Parkdeck oben — an der Kasse erfragen.',
        price: '€ 2',
      },
      faqLabel: 'Häufig gestellte Fragen zu den Preisen',
      contactLabel: 'Noch Fragen? Kontakt aufnehmen',
    },
  };

  const text = content[language];

  return (
    <section id="kosten" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
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
            💰 {text.badge}
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

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {text.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                card.highlight
                  ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-2xl shadow-primary-200 scale-105'
                  : 'bg-white border border-neutral-100 shadow-lg'
              }`}
            >
              {card.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full shadow">
                    <Sparkles className="w-3 h-3" /> {text.bestValue}
                  </span>
                </div>
              )}

              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className={`text-lg font-bold mb-1 ${card.highlight ? 'text-white' : 'text-neutral-800'}`}>
                {card.title}
              </h3>
              {'subtitle' in card && (
                <p className={`text-sm mb-4 ${card.highlight ? 'text-primary-200' : 'text-neutral-500'}`}>
                  {card.subtitle}
                </p>
              )}

              <div className={`text-5xl font-black my-4 ${card.highlight ? 'text-white' : 'text-primary-600'}`}>
                {card.price}
              </div>

              {'priceNote' in card && (
                <p className="text-primary-200 text-sm mb-1">{card.priceNote}</p>
              )}
              {'savings' in card && (
                <p className="text-yellow-300 text-sm font-semibold mb-4">{card.savings}</p>
              )}

              <ul className="space-y-2 mt-2 mb-6 flex-1">
                {card.perks.map((perk, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${card.highlight ? 'text-primary-100' : 'text-neutral-600'}`}>
                    <Check className={`w-4 h-4 shrink-0 ${card.highlight ? 'text-yellow-300' : 'text-primary-500'}`} />
                    {perk}
                  </li>
                ))}
              </ul>

              {'ctaLabel' in card && (
                card.ctaUrl ? (
                  <a
                    href={card.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold py-3 px-6 rounded-xl hover:bg-yellow-50 transition-colors text-sm"
                  >
                    <CreditCard className="w-4 h-4" />
                    {card.ctaLabel}
                  </a>
                ) : (
                  <div className="mt-auto flex items-center justify-center gap-2 bg-white/20 text-white/60 font-medium py-3 px-6 rounded-xl text-sm cursor-not-allowed border border-white/20">
                    <CreditCard className="w-4 h-4" />
                    {card.ctaLabel}
                  </div>
                )
              )}
            </motion.div>
          ))}
        </div>

        {/* Parking banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-100 rounded-2xl px-6 py-5 shadow-sm mb-10 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <ParkingCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-neutral-800">{text.parking.title}</p>
              <p className="text-sm text-neutral-500">{text.parking.description}</p>
            </div>
          </div>
          <span className="text-2xl font-black text-blue-600 shrink-0">{text.parking.price}</span>
        </motion.div>

        {/* FAQ + Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="outline" size="lg" className="btn-secondary" asChild>
            <a href="#faq">
              <HelpCircle className="w-5 h-5 mr-2" />
              {text.faqLabel}
            </a>
          </Button>
          <Button variant="ghost" size="lg" className="text-neutral-500 hover:text-primary-600" asChild>
            <a href="#contact">{text.contactLabel}</a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default KostenSection;
