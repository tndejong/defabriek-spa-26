import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Share, MoreHorizontal, Plus } from 'lucide-react';
import type { Language } from '../App';

interface PwaInstallPromptProps {
  language: Language;
}

type Platform = 'android' | 'ios' | 'other';

const STORAGE_KEY = 'pwa-prompt-dismissed';

type IosStep = { label: string; icon: 'dots' | 'share' | 'more' | 'plus' };

const content: Record<Language, {
  title: string;
  subtitle: string;
  installBtn: string;
  dismiss: string;
  iosLabel: string;
  iosSteps: IosStep[];
}> = {
  nl: {
    title: 'Voeg toe aan thuisscherm',
    subtitle: 'Bekijk openingstijden en nieuws altijd snel via je thuisscherm.',
    installBtn: 'Installeer app',
    dismiss: 'Misschien later',
    iosLabel: 'Volg deze stappen in Safari:',
    iosSteps: [
      { label: 'Tik op de drie puntjes (⋯) rechtsboven', icon: 'dots' },
      { label: 'Tik op "Deel"', icon: 'share' },
      { label: 'Tik op "Toon meer"', icon: 'more' },
      { label: 'Tik op "Zet op beginscherm"', icon: 'plus' },
    ],
  },
  en: {
    title: 'Add to home screen',
    subtitle: 'Quickly check opening hours and news right from your home screen.',
    installBtn: 'Install app',
    dismiss: 'Maybe later',
    iosLabel: 'Follow these steps in Safari:',
    iosSteps: [
      { label: 'Tap the three dots (⋯) top right', icon: 'dots' },
      { label: 'Tap "Share"', icon: 'share' },
      { label: 'Tap "Show more"', icon: 'more' },
      { label: 'Tap "Add to Home Screen"', icon: 'plus' },
    ],
  },
  de: {
    title: 'Zum Startbildschirm hinzufügen',
    subtitle: 'Öffnungszeiten und Neuigkeiten jederzeit schnell abrufen.',
    installBtn: 'App installieren',
    dismiss: 'Vielleicht später',
    iosLabel: 'Folge diesen Schritten in Safari:',
    iosSteps: [
      { label: 'Tippe auf die drei Punkte (⋯) oben rechts', icon: 'dots' },
      { label: 'Tippe auf „Teilen"', icon: 'share' },
      { label: 'Tippe auf „Mehr anzeigen"', icon: 'more' },
      { label: 'Tippe auf „Zum Home-Bildschirm"', icon: 'plus' },
    ],
  },
};

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as { standalone?: boolean }).standalone === true)
  );
}

type DeferredPrompt = Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> };

const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ language }) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<Platform>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPrompt | null>(null);

  useEffect(() => {
    if (isStandalone()) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const detected = detectPlatform();
    setPlatform(detected);

    if (detected === 'ios') {
      // iOS Safari heeft geen beforeinstallprompt – toon handmatige instructies
      setTimeout(() => setVisible(true), 3000);
      return;
    }

    // Android + desktop Chrome/Edge: gebruik het globaal opgevangen event
    const tryShow = () => {
      const prompt = (window as Window & { __pwaPrompt?: DeferredPrompt }).__pwaPrompt;
      if (prompt) {
        setDeferredPrompt(prompt);
        setTimeout(() => setVisible(true), 3000);
      }
    };

    // Probeer direct (event al gevangen vóór mount)
    tryShow();

    // Luister ook nog voor het geval het event later binnenkomt
    const handler = (e: Event) => {
      e.preventDefault();
      const prompt = e as DeferredPrompt;
      setDeferredPrompt(prompt);
      setTimeout(() => setVisible(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted' || outcome === 'dismissed') {
      dismiss();
    }
  };

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const t = content[language];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-[70] bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
          >
            {/* Header strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-primary-700" />

            <div className="p-5">
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shrink-0">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800 text-sm leading-tight">{t.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">De Fabriek – Skatepark</p>
                  </div>
                </div>
                <button
                  onClick={dismiss}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 -mt-1 -mr-1 rounded-lg hover:bg-neutral-100"
                  aria-label="Sluiten"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {t.subtitle}
              </p>

              {platform === 'ios' ? (
                <div className="mb-4">
                  <p className="text-xs font-medium text-neutral-500 mb-2">{t.iosLabel}</p>
                  <ol className="space-y-2">
                    {t.iosSteps.map((step, i) => (
                      <li key={i} className="flex items-center gap-2.5 bg-neutral-50 rounded-xl px-3 py-2">
                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-xs text-neutral-700 flex-1 leading-snug">{step.label}</span>
                        <span className="shrink-0 text-neutral-400">
                          {step.icon === 'dots'  && <MoreHorizontal className="w-4 h-4" />}
                          {step.icon === 'share' && <Share className="w-4 h-4 text-blue-500" />}
                          {step.icon === 'more'  && <MoreHorizontal className="w-4 h-4" />}
                          {step.icon === 'plus'  && <Plus className="w-4 h-4 text-green-500" />}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <button
                  onClick={handleInstall}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 mb-3"
                >
                  {t.installBtn}
                </button>
              )}

              <button
                onClick={dismiss}
                className="w-full text-xs text-neutral-400 hover:text-neutral-600 transition-colors py-1"
              >
                {t.dismiss}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PwaInstallPrompt;
