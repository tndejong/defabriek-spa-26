import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Euro, Clock, CreditCard, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import type { Language } from '../../App';

interface KostenSectionProps {
  language: Language;
}

const KostenSection: React.FC<KostenSectionProps> = ({ language }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const content = {
    nl: {
      title: 'Toegang & Prijzen',
      subtitle: 'Betaalbaar skaten voor iedereen',
      description: 'We geloven dat skaten voor iedereen toegankelijk moet zijn. Op dit moment werken we met prepaid kaarten.',
      prepaidCard: {
        name: 'Prepaid Kaart',
        price: '€70',
        description: 'Laad je kaart op en skate wanneer je wilt',
        features: [
          'Flexibel tegoed',
          'Geen abonnement nodig',
          'Geldig voor alle sessies',
          'Overdraagbaar aan vrienden'
        ],
        cta: 'Koop Prepaid Kaart',
        available: true
      },
      subscriptionPlans: [
        {
          name: 'Basis Abonnement',
          description: 'Voor casual skaters',
          features: [
            'Beperkte toegang',
            'Basis faciliteiten'
          ]
        },
        {
          name: 'Premium Abonnement',
          description: 'Voor frequente bezoekers',
          features: [
            'Onbeperkte toegang',
            'Privé opslagruimte',
            'Maandelijkse workshops'
          ]
        }
      ],
      comingSoon: 'Binnenkort beschikbaar',
      comingSoonText: 'We werken aan abonnementsformules. Blijf op de hoogte!',
      dialog: {
        title: 'Prepaid Kaart Aanvragen',
        description: 'Prepaid kaarten zijn verkrijgbaar bij de balie in het skatepark.',
        location: 'Kom langs bij de balie tijdens openingstijden om je prepaid kaart aan te schaffen.',
        button: 'Begrepen'
      }
    },
    en: {
      title: 'Access & Pricing',
      subtitle: 'Affordable skating for everyone',
      description: 'We believe skating should be accessible to everyone. Currently we work with prepaid cards.',
      prepaidCard: {
        name: 'Prepaid Card',
        price: '€70',
        description: 'Load your card and skate whenever you want',
        features: [
          'Flexible credit',
          'No subscription needed',
          'Valid for all sessions',
          'Transferable to friends'
        ],
        cta: 'Buy Prepaid Card',
        available: true
      },
      subscriptionPlans: [
        {
          name: 'Basic Subscription',
          description: 'For casual skaters',
          features: [
            'Limited access',
            'Basic facilities'
          ]
        },
        {
          name: 'Premium Subscription',
          description: 'For frequent visitors',
          features: [
            'Unlimited access',
            'Private storage',
            'Monthly workshops'
          ]
        }
      ],
      comingSoon: 'Coming Soon',
      comingSoonText: 'We are working on subscription plans. Stay tuned!',
      dialog: {
        title: 'Get Prepaid Card',
        description: 'Prepaid cards are available at the counter in the skatepark.',
        location: 'Visit the counter during opening hours to purchase your prepaid card.',
        button: 'Got it'
      }
    },
    de: {
      title: 'Zugang & Preise',
      subtitle: 'Bezahlbares Skaten für alle',
      description: 'Wir glauben, dass Skaten für jeden zugänglich sein sollte. Derzeit arbeiten wir mit Prepaid-Karten.',
      prepaidCard: {
        name: 'Prepaid-Karte',
        price: '€70',
        description: 'Laden Sie Ihre Karte auf und skaten Sie wann Sie wollen',
        features: [
          'Flexibles Guthaben',
          'Kein Abonnement nötig',
          'Gültig für alle Sessions',
          'Übertragbar an Freunde'
        ],
        cta: 'Prepaid-Karte Kaufen',
        available: true
      },
      subscriptionPlans: [
        {
          name: 'Basis-Abonnement',
          description: 'Für Gelegenheits-Skater',
          features: [
            'Begrenzter Zugang',
            'Grundausstattung'
          ]
        },
        {
          name: 'Premium-Abonnement',
          description: 'Für häufige Besucher',
          features: [
            'Unbegrenzter Zugang',
            'Privater Stauraum',
            'Monatliche Workshops'
          ]
        }
      ],
      comingSoon: 'Demnächst verfügbar',
      comingSoonText: 'Wir arbeiten an Abonnementplänen. Bleiben Sie dran!',
      dialog: {
        title: 'Prepaid-Karte Erhalten',
        description: 'Prepaid-Karten sind an der Theke im Skatepark erhältlich.',
        location: 'Besuchen Sie die Theke während der Öffnungszeiten, um Ihre Prepaid-Karte zu kaufen.',
        button: 'Verstanden'
      }
    }
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
            💰 {language === 'nl' ? 'Prijzen' : language === 'en' ? 'Pricing' : 'Preise'}
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

        {/* Prepaid Card - Available Now */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-16"
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-4 py-2">
              {language === 'nl' ? 'Nu Beschikbaar' : language === 'en' ? 'Available Now' : 'Jetzt Verfügbar'}
            </Badge>
          </div>

          <Card className="h-full glass transition-all duration-300 hover:shadow-2xl ring-2 ring-primary-500 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-neutral-800 mb-2">
                {text.prepaidCard.name}
              </CardTitle>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-5xl font-bold text-gradient">
                  {text.prepaidCard.price}
                </span>
              </div>
              <p className="text-neutral-600 text-sm">{text.prepaidCard.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {text.prepaidCard.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 leading-relaxed">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <Button 
                className="w-full mt-8 btn-primary" 
                size="lg"
                onClick={() => setDialogOpen(true)}
              >
                {text.prepaidCard.cta}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Prepaid Card Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <DialogTitle className="text-center text-2xl">
                {text.dialog.title}
              </DialogTitle>
              <DialogDescription className="text-center text-base pt-4">
                {text.dialog.description}
              </DialogDescription>
            </DialogHeader>
            <div className="bg-neutral-50 rounded-lg p-4 my-4">
              <p className="text-neutral-700 text-center">
                {text.dialog.location}
              </p>
            </div>
            <DialogFooter className="sm:justify-center">
              <Button 
                className="btn-primary px-8" 
                onClick={() => setDialogOpen(false)}
              >
                {text.dialog.button}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Coming Soon - Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Badge variant="secondary" className="bg-neutral-200 text-neutral-600 px-4 py-2 mb-6">
            <Clock className="w-4 h-4 mr-2 inline" />
            {text.comingSoon}
          </Badge>
          <p className="text-neutral-500 mb-8">{text.comingSoonText}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {text.subscriptionPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full bg-neutral-100 border-neutral-200 opacity-60 cursor-not-allowed">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-neutral-500 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-3xl font-bold text-neutral-400">
                      ---
                    </span>
                  </div>
                  <p className="text-neutral-500 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <Check className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-500 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full mt-8"
                    size="lg"
                    disabled
                    variant="outline"
                  >
                    {text.comingSoon}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-6">
            {language === 'nl' && 'Heb je vragen over onze prijzen?'}
            {language === 'en' && 'Have questions about our pricing?'}
            {language === 'de' && 'Haben Sie Fragen zu unseren Preisen?'}
          </p>
          <Button variant="outline" size="lg" className="btn-secondary">
            <Euro className="w-5 h-5 mr-2" />
            {language === 'nl' && 'Neem Contact Op'}
            {language === 'en' && 'Get in Touch'}
            {language === 'de' && 'Kontakt Aufnehmen'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default KostenSection;

