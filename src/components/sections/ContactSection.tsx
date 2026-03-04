import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Instagram, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Language } from '../../App';

interface ContactSectionProps {
  language: Language;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const content = {
    nl: {
      title: 'Contact Ons',
      subtitle: 'We horen graag van je',
      description: 'Heb je vragen over onze lessen, wil je vrijwilliger worden, of heb je andere vragen? Neem gerust contact met ons op. We reageren meestal binnen 24 uur.',
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
          content: 'Hogebothofstraat 49, Enschede',
          description: 'Kom gewoon langs op openingsdagen!',
          link: null
        }
      ],
      form: {
        title: 'Verstuur naar Info@defabriek',
        firstName: 'Voornaam',
        lastName: 'Achternaam',
        email: 'Email adres',
        message: 'Vraag',
        submit: 'Verstuur',
        success: 'Bericht verzonden! We nemen zo snel mogelijk contact op.',
        error: 'Er ging iets mis. Probeer het later opnieuw of mail naar info@defabriek.org.'
      },
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you',
      description: 'Do you have questions about our lessons, want to become a volunteer, or have other questions? Feel free to contact us. We usually respond within 24 hours.',
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
          content: 'Hogebothofstraat 49, Enschede',
          description: 'Just drop in on opening days!',
          link: null
        }
      ],
      form: {
        title: 'Send to Info@defabriek',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        message: 'Question',
        submit: 'Send',
        success: 'Message sent! We will get back to you as soon as possible.',
        error: 'Something went wrong. Please try again later or email info@defabriek.org.'
      },
    },
    de: {
      title: 'Kontaktieren Sie uns',
      subtitle: 'Wir freuen uns von Ihnen zu hören',
      description: 'Haben Sie Fragen zu unseren Lektionen, möchten Sie Freiwilliger werden oder haben andere Fragen? Zögern Sie nicht, uns zu kontaktieren. Wir antworten normalerweise innerhalb von 24 Stunden.',
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
          content: 'Hogebothofstraat 49, Enschede',
          description: 'Einfach an Öffnungstagen vorbeikommen!',
          link: null
        }
      ],
      form: {
        title: 'An Info@defabriek senden',
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail-Adresse',
        message: 'Frage',
        submit: 'Senden',
        success: 'Nachricht gesendet! Wir melden uns so schnell wie möglich.',
        error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut oder mailen Sie an info@defabriek.org.'
      },
    }
  };

  const text = content[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          subject: 'Contactformulier',
          message: formData.message,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data?.details || data?.error || '');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      setSubmitStatus('error');
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorMessage(
        msg === 'The operation was aborted.' || (err instanceof Error && err.name === 'AbortError')
          ? 'Timeout – server reageert niet. Controleer of de server draait.'
          : msg
      );
    } finally {
      setIsSubmitting(false);
    }
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
                        {text.form.firstName}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {text.form.lastName}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>
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

                  {submitStatus === 'success' && (
                    <p className="text-green-600 text-sm font-medium">{text.form.success}</p>
                  )}
                  {submitStatus === 'error' && (
                    <div className="text-red-600 text-sm font-medium">
                      <p>{text.form.error}</p>
                      {errorMessage && (
                        <p className="mt-2 text-xs font-mono bg-red-50 p-2 rounded">{errorMessage}</p>
                      )}
                    </div>
                  )}
                  <Button type="submit" className="w-full btn-primary text-lg py-4" disabled={isSubmitting}>
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? (language === 'nl' ? 'Versturen...' : language === 'de' ? 'Senden...' : 'Sending...') : text.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;

