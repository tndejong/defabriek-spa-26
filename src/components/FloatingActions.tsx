import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import type { Language } from '../App';
import { track } from '../lib/analytics';
import ChatWidget from './ChatWidget';
import VolunteerWidget from './VolunteerWidget';

interface FloatingActionsProps {
  language: Language;
}

const labels: Record<Language, { chat: string; volunteer: string }> = {
  nl: { chat: 'Vraag?', volunteer: 'Join us!' },
  en: { chat: 'Question?', volunteer: 'Join us!' },
  de: { chat: 'Frage?', volunteer: 'Join us!' },
};

// Must match the longest exit animation duration (ms)
const EXIT_DURATION = 160;

const FloatingActions: React.FC<FloatingActionsProps> = ({ language }) => {
  const [activePanel, setActivePanel] = useState<'chat' | 'volunteer' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = labels[language];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activePanel && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activePanel]);

  useEffect(() => {
    const handler = () => toggle('volunteer');
    window.addEventListener('open-volunteer-widget', handler);
    return () => window.removeEventListener('open-volunteer-widget', handler);
  }, []);

  const toggle = (panel: 'chat' | 'volunteer') => {
    // Clear any pending open
    if (timerRef.current) clearTimeout(timerRef.current);

    if (activePanel === panel) {
      // Same panel — just close
      setActivePanel(null);
      return;
    }

    if (activePanel !== null) {
      // Different panel open — close first, then open after exit animation
      setActivePanel(null);
      timerRef.current = setTimeout(() => {
        if (panel === 'chat') track('chat_widget_open');
        if (panel === 'volunteer') track('volunteer_widget_open');
        setActivePanel(panel);
      }, EXIT_DURATION);
    } else {
      // Nothing open — open immediately
      if (panel === 'chat') track('chat_widget_open');
      if (panel === 'volunteer') track('volunteer_widget_open');
      setActivePanel(panel);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Panels */}
      <ChatWidget language={language} isOpen={activePanel === 'chat'} onClose={() => setActivePanel(null)} />
      <VolunteerWidget language={language} isOpen={activePanel === 'volunteer'} onClose={() => setActivePanel(null)} />

      {/* Pill trigger buttons */}
      <div className="flex flex-col items-end gap-2 mt-1">
        {/* Join the club */}
        <motion.button
          onClick={() => toggle('volunteer')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full shadow-lg text-sm font-semibold transition-colors duration-200 ${
            activePanel === 'volunteer'
              ? 'bg-primary-700 text-white'
              : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <span>{t.volunteer}</span>
        </motion.button>

        {/* Vraag? */}
        <motion.button
          onClick={() => toggle('chat')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full shadow-lg text-sm font-medium transition-colors duration-200 border ${
            activePanel === 'chat'
              ? 'bg-neutral-800 text-white border-neutral-700'
              : 'bg-white/90 backdrop-blur text-neutral-700 border-neutral-200 hover:bg-white hover:border-neutral-300'
          }`}
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>{t.chat}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingActions;
