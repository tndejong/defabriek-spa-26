import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check } from 'lucide-react';
import type { Language } from '../App';
import { track } from '../lib/analytics';

interface VolunteerWidgetProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

const content = {
  nl: {
    title: 'Doe mee met De Fabriek',
    volunteerTab: '🛹 Word vrijwilliger',
    shareTab: '📤 Deel de site',
    volunteerSubtitle: 'Jonge gedreven skatepark vrijwilligers gezocht! We doen zowel parkonderhoud als schoonmaak als meebeslissen over de toekomst van ons skatepark.',
    namePlaceholder: 'Jouw naam',
    agePlaceholder: 'Jouw leeftijd',
    sendBtn: 'Stuur aanmelding',
    mailSubject: 'Aanmelding vrijwilliger – De Fabriek',
    mailBodyTemplate: (name: string, age: string) =>
      `Hoi!\n\nIk wil graag vrijwilliger worden bij Skatepark De Fabriek.\n\nMijn naam is ${name || '[naam]'} en ik ben ${age || '[leeftijd]'} jaar oud.\n\nGroeten,\n${name || '[naam]'}`,
    shareSubtitle: 'Laat vrienden het skatepark ontdekken.',
    shareText: 'Gaaf skatepark in Enschede – check De Fabriek! 🛹',
    shareBtn: 'Deel via apps',
    copyBtn: 'Kopieer link',
    copied: 'Gekopieerd!',
  },
  en: {
    title: 'Get involved with De Fabriek',
    volunteerTab: '🛹 Become a volunteer',
    shareTab: '📤 Share the site',
    volunteerSubtitle: 'Young and driven skatepark volunteers wanted! We do park maintenance, cleaning and have a say in the future of our skatepark.',
    namePlaceholder: 'Your name',
    agePlaceholder: 'Your age',
    sendBtn: 'Send application',
    mailSubject: 'Volunteer application – De Fabriek',
    mailBodyTemplate: (name: string, age: string) =>
      `Hi!\n\nI would love to become a volunteer at Skatepark De Fabriek.\n\nMy name is ${name || '[name]'} and I am ${age || '[age]'} years old.\n\nKind regards,\n${name || '[name]'}`,
    shareSubtitle: 'Let your friends discover the skatepark.',
    shareText: 'Awesome skatepark in Enschede – check De Fabriek! 🛹',
    shareBtn: 'Share via apps',
    copyBtn: 'Copy link',
    copied: 'Copied!',
  },
  de: {
    title: 'Mach mit bei De Fabriek',
    volunteerTab: '🛹 Werde Freiwilliger',
    shareTab: '📤 Seite teilen',
    volunteerSubtitle: 'Junge, engagierte Skatepark-Freiwillige gesucht! Wir machen Parkpflege, Reinigung und entscheiden gemeinsam über die Zukunft unseres Skateparks.',
    namePlaceholder: 'Dein Name',
    agePlaceholder: 'Dein Alter',
    sendBtn: 'Anmeldung senden',
    mailSubject: 'Freiwilligen-Anmeldung – De Fabriek',
    mailBodyTemplate: (name: string, age: string) =>
      `Hallo!\n\nIch möchte gerne Freiwilliger bei Skatepark De Fabriek werden.\n\nMein Name ist ${name || '[Name]'} und ich bin ${age || '[Alter]'} Jahre alt.\n\nMit freundlichen Grüßen,\n${name || '[Name]'}`,
    shareSubtitle: 'Lass deine Freunde den Skatepark entdecken.',
    shareText: 'Toller Skatepark in Enschede – schau dir De Fabriek an! 🛹',
    shareBtn: 'Über Apps teilen',
    copyBtn: 'Link kopieren',
    copied: 'Kopiert!',
  },
};

const SITE_URL = 'https://defabriek.org';

const VolunteerWidget: React.FC<VolunteerWidgetProps> = ({ language, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'share'>('volunteer');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [copied, setCopied] = useState(false);
  const [canShare] = useState(() => typeof navigator !== 'undefined' && !!navigator.share);

  const t = content[language];

  const handleMailto = () => {
    track('volunteer_apply', { language });
    const subject = encodeURIComponent(t.mailSubject);
    const body = encodeURIComponent(t.mailBodyTemplate(name, age));
    window.open(`mailto:info@defabriek.org?subject=${subject}&body=${body}`, '_blank');
  };

  const handleShare = async () => {
    track('site_share', { method: 'native' });
    try {
      await navigator.share({ title: 'De Fabriek – Skatepark', text: t.shareText, url: SITE_URL });
    } catch { /* geannuleerd */ }
  };

  const handleCopy = async () => {
    track('site_share', { method: 'copy_link' });
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* fallback */ }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 22, stiffness: 300 } }}
          exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.15, ease: 'easeIn' } }}
          className="w-80 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-primary-700" />
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <p className="font-bold text-neutral-800 text-sm">{t.title}</p>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded-lg hover:bg-neutral-100" aria-label="Sluiten">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex mx-5 mb-4 bg-neutral-100 rounded-xl p-1 gap-1">
            {(['volunteer', 'share'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-all duration-200 ${activeTab === tab ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
                {tab === 'volunteer' ? t.volunteerTab : t.shareTab}
              </button>
            ))}
          </div>

          <div className="px-5 pb-5">
            <AnimatePresence mode="wait">
              {activeTab === 'volunteer' ? (
                <motion.div key="volunteer" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }}>
                  <p className="text-xs text-neutral-500 mb-3 leading-relaxed">{t.volunteerSubtitle}</p>
                  <div className="space-y-2 mb-3">
                    <input type="text" placeholder={t.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all bg-white/80" />
                    <input type="number" placeholder={t.agePlaceholder} value={age} onChange={(e) => setAge(e.target.value)} min={8} max={99}
                      className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all bg-white/80" />
                  </div>
                  <div className="bg-neutral-50 rounded-xl px-3 py-2 mb-3 text-xs text-neutral-500 leading-relaxed whitespace-pre-wrap border border-neutral-100">
                    {t.mailBodyTemplate(name, age)}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleMailto}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all">
                    {t.sendBtn}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="share" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
                  <p className="text-xs text-neutral-500 mb-4 leading-relaxed">{t.shareSubtitle}</p>
                  {canShare ? (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleShare}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />{t.shareBtn}
                    </motion.button>
                  ) : (
                    <>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCopy}
                        className={`w-full py-2.5 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'}`}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? t.copied : t.copyBtn}
                      </motion.button>
                      <p className="text-center text-xs text-neutral-400 mt-3 font-mono">{SITE_URL}</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VolunteerWidget;
