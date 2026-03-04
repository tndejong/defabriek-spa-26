import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import type { Language } from '../App';

interface ChatWidgetProps {
  language: Language;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

const content = {
  nl: {
    trigger: 'Stel een vraag',
    title: 'Snel contact',
    subtitle: 'We reageren zo snel mogelijk!',
    namePlaceholder: 'Jouw naam',
    emailPlaceholder: 'E-mailadres',
    messagePlaceholder: 'Jouw vraag of bericht...',
    submit: 'Verstuur',
    submitting: 'Versturen...',
    successTitle: 'Bericht verstuurd!',
    successText: 'We nemen zo snel mogelijk contact met je op.',
    errorText: 'Er ging iets mis. Probeer het opnieuw.',
    newMessage: 'Nieuw bericht',
  },
  en: {
    trigger: 'Ask a question',
    title: 'Quick contact',
    subtitle: 'We\'ll reply as soon as possible!',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Email address',
    messagePlaceholder: 'Your question or message...',
    submit: 'Send',
    submitting: 'Sending...',
    successTitle: 'Message sent!',
    successText: 'We\'ll get back to you as soon as possible.',
    errorText: 'Something went wrong. Please try again.',
    newMessage: 'New message',
  },
  de: {
    trigger: 'Frage stellen',
    title: 'Schnellkontakt',
    subtitle: 'Wir antworten so schnell wie möglich!',
    namePlaceholder: 'Dein Name',
    emailPlaceholder: 'E-Mail-Adresse',
    messagePlaceholder: 'Deine Frage oder Nachricht...',
    submit: 'Senden',
    submitting: 'Senden...',
    successTitle: 'Nachricht gesendet!',
    successText: 'Wir melden uns so schnell wie möglich bei dir.',
    errorText: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    newMessage: 'Neue Nachricht',
  },
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const t = content[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: 'Chat widget bericht',
          message: form.message,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', message: '' });
    setStatus('idle');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <img src="/images/logo.png" alt="De Fabriek" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{t.title}</p>
                  <p className="text-primary-200 text-xs">{t.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="font-semibold text-neutral-800 mb-1">{t.successTitle}</p>
                    <p className="text-sm text-neutral-500 mb-5">{t.successText}</p>
                    <button
                      onClick={reset}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {t.newMessage}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder:text-neutral-400 transition"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder:text-neutral-400 transition"
                    />
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t.messagePlaceholder}
                      className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder:text-neutral-400 resize-none transition"
                    />

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {t.errorText}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Send className="w-4 h-4" />
                      {status === 'submitting' ? t.submitting : t.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => { setIsOpen(prev => !prev); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-primary-600 hover:bg-primary-700 text-white pl-4 pr-5 py-3 rounded-full shadow-lg transition-colors duration-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-sm font-medium">{t.trigger}</span>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
