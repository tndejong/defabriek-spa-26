import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Language } from '../../App';

interface ContactSectionProps {
  language: Language;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const content = {
    nl: {
      title: 'Contact Ons',
      subtitle: 'We horen graag van je',
      description: 'Heb je vragen over onze lessen, wil je lid worden, of heb je andere vragen? Neem gerust contact met ons op. We reageren meestal binnen 24 uur.',
      contact: [
        {
          icon: Mail,
          title: 'Email',
          content: 'info@defabriek.org',
          description: 'Voor algemene vragen en informatie',
          link: 'mailto:info@defabriek.org'
        },
        {
          icon: Instagram,
          title: 'Instagram',
          content: '@skateparkdefabriek',
          description: 'Volg ons voor updates en foto\'s',
          link: 'https://www.instagram.com/skateparkdefabriek/'
        },
        {
          icon: Facebook,
          title: 'Facebook',
          content: 'SV De Fabriek',
          description: 'Like onze pagina voor nieuws',
          link: 'https://www.facebook.com/svdefabriek/'
        },
        {
          icon: MapPin,
          title: 'Locatie',
          content: 'Enschede, Nederland',
          description: 'Kom langs voor een bezoek!',
          link: null
        }
      ],
      form: {
        title: 'Stuur ons een bericht',
        name: 'Naam',
        email: 'Email',
        subject: 'Onderwerp',
        message: 'Bericht',
        submit: 'Verstuur Bericht'
      },
      faq: {
        title: 'Veelgestelde Vragen',
        items: [
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
            question: 'Kan ik lid worden zonder lessen te volgen?',
            answer: 'Natuurlijk! We hebben verschillende lidmaatschapsopties voor mensen die alleen gebruik willen maken van het park.'
          }
        ]
      }
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you',
      description: 'Do you have questions about our lessons, want to become a member, or have other questions? Feel free to contact us. We usually respond within 24 hours.',
      contact: [
        {
          icon: Mail,
          title: 'Email',
          content: 'info@defabriek.org',
          description: 'For general questions and information',
          link: 'mailto:info@defabriek.org'
        },
        {
          icon: Instagram,
          title: 'Instagram',
          content: '@skateparkdefabriek',
          description: 'Follow us for updates and photos',
          link: 'https://www.instagram.com/skateparkdefabriek/'
        },
        {
          icon: Facebook,
          title: 'Facebook',
          content: 'SV De Fabriek',
          description: 'Like our page for news',
          link: 'https://www.facebook.com/svdefabriek/'
        },
        {
          icon: MapPin,
          title: 'Location',
          content: 'Enschede, Netherlands',
          description: 'Come visit us!',
          link: null
        }
      ],
      form: {
        title: 'Send us a message',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
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
            question: 'Can I become a member without taking lessons?',
            answer: 'Of course! We have different membership options for people who only want to use the park.'
          }
        ]
      }
    },
    de: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Wir freuen uns von Ihnen zu hören',
      description: 'Haben Sie Fragen zu unseren Lektionen, möchten Sie Mitglied werden oder haben andere Fragen? Zögern Sie nicht, uns zu kontaktieren. Wir antworten normalerweise innerhalb von 24 Stunden.',
      contact: [
        {
          icon: Mail,
          title: 'Email',
          content: 'info@defabriek.org',
          description: 'Für allgemeine Fragen und Informationen',
          link: 'mailto:info@defabriek.org'
        },
        {
          icon: Instagram,
          title: 'Instagram',
          content: '@skateparkdefabriek',
          description: 'Folgen Sie uns für Updates und Fotos',
          link: 'https://www.instagram.com/skateparkdefabriek/'
        },
        {
          icon: Facebook,
          title: 'Facebook',
          content: 'SV De Fabriek',
          description: 'Liken Sie unsere Seite für Neuigkeiten',
          link: 'https://www.facebook.com/svdefabriek/'
        },
        {
          icon: MapPin,
          title: 'Standort',
          content: 'Enschede, Niederlande',
          description: 'Besuchen Sie uns!',
          link: null
        }
      ],
      form: {
        title: 'Senden Sie uns eine Nachricht',
        name: 'Name',
        email: 'Email',
        subject: 'Betreff',
        message: 'Nachricht',
        submit: 'Nachricht Senden'
      },
      faq: {
        title: 'Häufig Gestellte Fragen',
        items: [
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
            question: 'Kann ich Mitglied werden, ohne Lektionen zu nehmen?',
            answer: 'Natürlich! Wir haben verschiedene Mitgliedschaftsoptionen für Leute, die nur den Park nutzen möchten.'
          }
        ]
      }
    }
  };

  const text = content[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="section-padding bg-white">
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
            📞 Contact
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neutral-800 mb-8">
              {language === 'nl' && 'Contact Informatie'}
              {language === 'en' && 'Contact Information'}
              {language === 'de' && 'Kontaktinformationen'}
            </h3>

            <div className="space-y-6">
              {text.contact.map((item, index) => {
                const content = (
                  <div className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-primary-600 font-medium mb-1">
                        {item.content}
                      </p>
                      <p className="text-neutral-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.link ? (
                      <a href={item.link} target={item.link.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-neutral-800">
                  {text.form.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {text.form.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {text.form.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {text.form.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {text.form.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary text-lg py-4">
                    <Send className="w-5 h-5 mr-2" />
                    {text.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            {text.faq.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {text.faq.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <MessageCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                      <h4 className="font-semibold text-neutral-800 leading-relaxed">
                        {item.question}
                      </h4>
                    </div>
                    <p className="text-neutral-600 leading-relaxed pl-9">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

