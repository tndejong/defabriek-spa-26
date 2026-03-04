import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Language } from '../App';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const content = {
    nl: {
      title: 'De Fabriek',
      description: 'Het hart van Enschede\'s skategemeenschap. Samen skaten, leren en groeien.',
      quickLinks: 'Snelle Links',
      contact: 'Contact',
      followUs: 'Volg Ons',
      socialText: 'Blijf verbonden met onze community',
      copyright: '© 2024 Skateboardvereniging De Fabriek. Alle rechten voorbehouden.',
      address: 'Hogebothofstraat 49, Enschede'
    },
    en: {
      title: 'De Fabriek',
      description: 'The heart of Enschede\'s skate community. Skate, learn and grow together.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      socialText: 'Stay connected with our community',
      copyright: '© 2024 Skateboardvereniging De Fabriek. All rights reserved.',
      address: 'Hogebothofstraat 49, Enschede'
    },
    de: {
      title: 'De Fabriek',
      description: 'Das Herz der Skate-Community Enschede. Gemeinsam skaten, lernen und wachsen.',
      quickLinks: 'Schnellzugriff',
      contact: 'Kontakt',
      followUs: 'Folgen Sie Uns',
      socialText: 'Bleiben Sie mit unserer Community verbunden',
      copyright: '© 2024 Skateboardvereniging De Fabriek. Alle Rechte vorbehalten.',
      address: 'Hogebothofstraat 49, Enschede'
    }
  };

  const text = content[language];

  const quickLinks = [
    { label: { nl: 'Park', en: 'Park', de: 'Park' }, href: '#park' },
    { label: { nl: 'Lessen', en: 'Lessons', de: 'Lektionen' }, href: '#lessen' },
    { label: { nl: 'Team', en: 'Team', de: 'Team' }, href: '#team' },
    { label: { nl: 'Contact', en: 'Contact', de: 'Kontakt' }, href: '#contact' },
    { label: { nl: 'Sponsors', en: 'Sponsors', de: 'Sponsoren' }, href: '#sponsors' },
  ];

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="text-2xl font-bold text-white">{text.title}</span>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                {text.description}
              </p>
              <Badge variant="secondary" className="bg-primary-600 text-white">
                🏆 Enschede's #1 Skatepark
              </Badge>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{text.quickLinks}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{text.contact}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-neutral-300">
                  <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span>{text.address}</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a href="mailto:info@defabriek.org" className="hover:text-primary-400 transition-colors">
                    info@defabriek.org
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{text.followUs}</h3>
              <p className="text-neutral-300 mb-6">{text.socialText}</p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-neutral-800 border-neutral-700 hover:bg-primary-600 hover:border-primary-600"
                  asChild
                >
                  <a href="https://www.instagram.com/skateparkdefabriek/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-neutral-800 border-neutral-700 hover:bg-primary-600 hover:border-primary-600"
                  asChild
                >
                  <a href="https://www.facebook.com/svdefabriek/" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800">
          <div className="container-max px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-neutral-400 text-sm"
              >
                {text.copyright}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-6 mt-4 md:mt-0"
              >
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                  Terms of Service
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

