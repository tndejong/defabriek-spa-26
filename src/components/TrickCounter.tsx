import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import type { Language } from '../App';

interface TrickCounterProps {
  language: Language;
  onUserCountChange?: (count: number) => void;
}

interface Toast {
  id: number;
  msg: string;
  x: number;
}

interface LeaderboardEntry {
  slug: string;
  username: string;
  count: number;
}

interface Milestone {
  emoji: string;
  text: string;
  size: 'normal' | 'big' | 'legendary';
}

const API_BASE = import.meta.env.VITE_API_URL ?? '';
const STORAGE_SLUG = 'trick_slug';
const STORAGE_USERNAME = 'trick_username';

function toSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Personal milestones (based on user's own count)
const personalMilestones: Record<number, Record<Language, Milestone>> = {
  1:   { nl: { emoji: '🛹', text: 'Eerste trick geland! Welcome to the crew!', size: 'normal' }, en: { emoji: '🛹', text: 'First trick landed! Welcome to the crew!', size: 'normal' }, de: { emoji: '🛹', text: 'Erster Trick! Welcome to the crew!', size: 'normal' } },
  10:  { nl: { emoji: '🔟', text: '10 tricks! Jij shredded!', size: 'normal' }, en: { emoji: '🔟', text: '10 tricks! You shred!', size: 'normal' }, de: { emoji: '🔟', text: '10 Tricks! Du shreddest!', size: 'normal' } },
  25:  { nl: { emoji: '💪', text: '25 tricks! Real skater energy!', size: 'normal' }, en: { emoji: '💪', text: '25 tricks! Real skater energy!', size: 'normal' }, de: { emoji: '💪', text: '25 Tricks! Echte Skater-Energy!', size: 'normal' } },
  50:  { nl: { emoji: '🔥', text: '50 tricks! Local legend!', size: 'big' }, en: { emoji: '🔥', text: '50 tricks! Local legend!', size: 'big' }, de: { emoji: '🔥', text: '50 Tricks! Lokale Legende!', size: 'big' } },
  100: { nl: { emoji: '👑', text: '100 tricks! Je bent onstopbaar!', size: 'legendary' }, en: { emoji: '👑', text: '100 tricks! Unstoppable!', size: 'legendary' }, de: { emoji: '👑', text: '100 Tricks! Unaufhaltbar!', size: 'legendary' } },
};

// Global milestones (based on total counter)
const globalMilestones: Record<number, Record<Language, Milestone>> = {
  100:  { nl: { emoji: '💯', text: '100 tricks samen geland!', size: 'normal' }, en: { emoji: '💯', text: '100 tricks landed together!', size: 'normal' }, de: { emoji: '💯', text: '100 Tricks zusammen!', size: 'normal' } },
  250:  { nl: { emoji: '🤯', text: '250 tricks! De fabriek shredded!', size: 'normal' }, en: { emoji: '🤯', text: '250 tricks! The factory shreds!', size: 'normal' }, de: { emoji: '🤯', text: '250 Tricks! Die Fabrik shredded!', size: 'normal' } },
  500:  { nl: { emoji: '🚀', text: '500 tricks! Waanzinnig!', size: 'big' }, en: { emoji: '🚀', text: '500 tricks! Insane!', size: 'big' }, de: { emoji: '🚀', text: '500 Tricks! Wahnsinn!', size: 'big' } },
  1000: { nl: { emoji: '👑', text: '1000 TRICKS! LEGENDARISCH!', size: 'legendary' }, en: { emoji: '👑', text: '1000 TRICKS! LEGENDARY!', size: 'legendary' }, de: { emoji: '👑', text: '1000 TRICKS! LEGENDÄR!', size: 'legendary' } },
  2500: { nl: { emoji: '🏆', text: '2500 tricks! Ongelofelijk!', size: 'legendary' }, en: { emoji: '🏆', text: '2500 tricks! Unbelievable!', size: 'legendary' }, de: { emoji: '🏆', text: '2500 Tricks! Unglaublich!', size: 'legendary' } },
  5000: { nl: { emoji: '🎖️', text: '5000 TRICKS! DE FABRIEK IS NIET TE STOPPEN!', size: 'legendary' }, en: { emoji: '🎖️', text: '5000 TRICKS! THE FACTORY CANNOT BE STOPPED!', size: 'legendary' }, de: { emoji: '🎖️', text: '5000 TRICKS! DIE FABRIK IST NICHT ZU STOPPEN!', size: 'legendary' } },
};

const CONFETTI_COLORS = ['#dc2626', '#f97316', '#eab308', '#16a34a', '#2563eb', '#9333ea', '#ec4899'];

const copy = {
  nl: {
    label: 'tricks geland in de fabriek',
    cta: 'Land een trick! 🛹',
    leaderboard: 'Leaderboard',
    yourTricks: 'jouw tricks',
    noTricks: 'Nog geen tricks geland 👀',
    promptTitle: 'Wie ben jij?',
    promptSub: 'Vul je naam in om je tricks bij te houden en op het leaderboard te komen.',
    placeholder: 'Jouw naam',
    confirm: "Let's go! 🤙",
    toast: ['Lekker bezig! 🔥', 'Sick move! 🤙', 'Beast mode! 💪', 'Props! 🛹', 'On fire! 🔥'],
  },
  en: {
    label: 'tricks landed at the factory',
    cta: 'Land a trick! 🛹',
    leaderboard: 'Leaderboard',
    yourTricks: 'your tricks',
    noTricks: 'No tricks landed yet 👀',
    promptTitle: 'Who are you?',
    promptSub: 'Enter your name to track your tricks and appear on the leaderboard.',
    placeholder: 'Your name',
    confirm: "Let's go! 🤙",
    toast: ['Nailed it! 🔥', 'Sick move! 🤙', 'Beast mode! 💪', 'Props! 🛹', 'On fire! 🔥'],
  },
  de: {
    label: 'Tricks in der Fabrik gelandet',
    cta: 'Trick landen! 🛹',
    leaderboard: 'Leaderboard',
    yourTricks: 'deine Tricks',
    noTricks: 'Noch keine Tricks gelandet 👀',
    promptTitle: 'Wer bist du?',
    promptSub: 'Gib deinen Namen ein, um deine Tricks zu verfolgen und im Leaderboard zu erscheinen.',
    placeholder: 'Dein Name',
    confirm: "Los geht's! 🤙",
    toast: ['Sehr geil! 🔥', 'Sick move! 🤙', 'Beast mode! 💪', 'Props! 🛹', 'On fire! 🔥'],
  },
};

let toastId = 0;
const medals = ['🥇', '🥈', '🥉'];

// Confetti particle — each is randomised once at mount via useMemo
interface ParticleConfig { angle: number; dist: number; color: string; size: number; rotDir: number; }

const ConfettiBurst: React.FC<{ count: number }> = ({ count }) => {
  const particles = useMemo<ParticleConfig[]>(() =>
    Array.from({ length: count }, () => ({
      angle: Math.random() * 360,
      dist: 60 + Math.random() * 110,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 7 + Math.random() * 7,
      rotDir: Math.random() > 0.5 ? 1 : -1,
    })), [count]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.dist;
        const ty = Math.sin(rad) * p.dist;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            animate={{ opacity: 0, x: tx, y: ty, scale: 0.2, rotate: p.rotDir * (180 + Math.random() * 360) }}
            transition={{ duration: 0.9 + Math.random() * 0.6, ease: 'easeOut', delay: Math.random() * 0.15 }}
            style={{ backgroundColor: p.color, width: p.size, height: p.size, borderRadius: Math.random() > 0.5 ? '50%' : 3 }}
            className="absolute shrink-0"
          />
        );
      })}
    </div>
  );
};

const TrickCounter: React.FC<TrickCounterProps> = ({ language, onUserCountChange }) => {
  const t = copy[language];

  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bump, setBump] = useState(false);

  const [slug, setSlug] = useState<string>(() => typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_SLUG) || '' : '');
  const [username, setUsername] = useState<string>(() => typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_USERNAME) || '' : '');
  const [userCount, setUserCount] = useState<number | null>(null);

  const [showPrompt, setShowPrompt] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [pendingClick, setPendingClick] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [milestone, setMilestone] = useState<Milestone | null>(null);
  const milestoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerMilestone = useCallback((m: Milestone) => {
    // Don't restart the timer if a milestone is already showing — let it finish
    if (milestoneTimer.current) return;
    setMilestone(m);
    const duration = m.size === 'legendary' ? 6000 : m.size === 'big' ? 4500 : 3500;
    milestoneTimer.current = setTimeout(() => {
      setMilestone(null);
      milestoneTimer.current = null;
    }, duration);
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/leaderboard`);
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch { /* silently fail */ }
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/counter`)
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0));
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (showPrompt) setTimeout(() => inputRef.current?.focus(), 50);
  }, [showPrompt]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const doIncrement = useCallback(async (s: string, u: string) => {
    if (loading) return;
    setLoading(true);

    const msg = t.toast[Math.floor(Math.random() * t.toast.length)];
    const id = ++toastId;
    const x = Math.round((Math.random() - 0.5) * 60);
    setToasts((prev) => [...prev, { id, msg, x }]);
    setTimeout(() => removeToast(id), 1800);

    try {
      const res = await fetch(`${API_BASE}/api/counter/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: s, username: u }),
      });
      const data = await res.json();

      const newCount: number = data.count;
      const newUserCount: number | null = data.userCount ?? null;

      setCount(newCount);
      if (newUserCount !== null) {
        setUserCount(newUserCount);
        onUserCountChange?.(newUserCount);
      }
      setBump(true);
      setTimeout(() => setBump(false), 400);
      fetchLeaderboard();

      // Check personal milestone first (takes priority)
      if (newUserCount !== null && personalMilestones[newUserCount]) {
        triggerMilestone(personalMilestones[newUserCount][language]);
      } else if (globalMilestones[newCount]) {
        triggerMilestone(globalMilestones[newCount][language]);
      }
    } catch { /* silently fail */ }
    finally { setLoading(false); }
  }, [loading, t, language, removeToast, fetchLeaderboard, triggerMilestone]);

  const handleClick = () => {
    if (slug) { doIncrement(slug, username); }
    else { setPendingClick(true); setShowPrompt(true); }
  };

  const handleConfirmName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    const s = toSlug(trimmed);
    localStorage.setItem(STORAGE_SLUG, s);
    localStorage.setItem(STORAGE_USERNAME, trimmed);
    setSlug(s);
    setUsername(trimmed);
    setShowPrompt(false);
    if (pendingClick) { setPendingClick(false); doIncrement(s, trimmed); }
  };

  const myRank = leaderboard.findIndex((e) => e.slug === slug);
  const displayCount = count === null ? '—' : count.toLocaleString();

  const milestoneStyle = {
    normal:    'from-primary-500 to-primary-700',
    big:       'from-orange-500 to-red-600',
    legendary: 'from-yellow-400 via-orange-500 to-red-600',
  };

  return (
    <div className="relative flex flex-col md:flex-row gap-8 w-full">

      {/* LEFT — counter + button */}
      <div className="flex flex-col items-center justify-center gap-5 md:w-56 shrink-0">
        <motion.div
          animate={bump ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <span className="text-7xl md:text-8xl font-black text-primary-600 tabular-nums leading-none">
            {displayCount}
          </span>
          <span className="mt-2 text-sm text-neutral-500 font-medium tracking-wide text-center">
            {t.label}
          </span>
        </motion.div>

        {slug && userCount !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-200 rounded-full px-3 py-1 text-center"
          >
            {username}: {userCount} tricks geland
          </motion.div>
        )}

        {/* Button + floating toasts */}
        <div className="relative flex justify-center">
          <motion.button
            onClick={handleClick}
            disabled={loading}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
            className="px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-base shadow-lg disabled:opacity-60 transition-colors"
          >
            {t.cta}
          </motion.button>
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.span
                key={toast.id}
                initial={{ opacity: 1, y: 0, x: toast.x }}
                animate={{ opacity: 0, y: -64, x: toast.x }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
                className="absolute bottom-full mb-2 whitespace-nowrap text-sm font-bold text-primary-700 pointer-events-none select-none"
              >
                {toast.msg}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-neutral-200 self-stretch" />
      <div className="block md:hidden h-px w-full bg-neutral-200" />

      {/* RIGHT — leaderboard */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary-500 shrink-0" />
          <span className="text-sm font-bold text-neutral-700 tracking-wide uppercase">
            {t.leaderboard}
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-100 bg-white/70 backdrop-blur overflow-hidden divide-y divide-neutral-100">
          {leaderboard.length === 0 ? (
            <p className="text-center text-xs text-neutral-400 py-5">{t.noTricks}</p>
          ) : (
            leaderboard.map((entry, i) => (
              <motion.div
                key={entry.slug}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-3 px-4 py-2.5 ${entry.slug === slug ? 'bg-primary-50' : ''}`}
              >
                <span className="w-5 text-center text-sm shrink-0">{medals[i] ?? i + 1}</span>
                <span className={`flex-1 text-sm font-medium truncate ${entry.slug === slug ? 'text-primary-700 font-bold' : 'text-neutral-700'}`}>
                  {entry.username}
                </span>
                <span className="text-sm font-bold tabular-nums text-neutral-500 shrink-0">
                  {entry.count.toLocaleString()}
                </span>
              </motion.div>
            ))
          )}
          {myRank === -1 && slug && (
            <div className="flex items-center gap-3 px-4 py-2.5 bg-primary-50 border-t border-primary-100">
              <span className="w-5 text-center text-xs text-neutral-400 shrink-0">—</span>
              <span className="flex-1 text-sm font-bold text-primary-700 truncate">{username}</span>
              <span className="text-sm font-bold tabular-nums text-primary-500 shrink-0">0</span>
            </div>
          )}
        </div>
      </div>

      {/* Milestone easter egg overlay */}
      <AnimatePresence>
        {milestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl overflow-hidden pointer-events-none"
          >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl" />

            {/* Confetti */}
            <ConfettiBurst count={milestone.size === 'legendary' ? 48 : milestone.size === 'big' ? 32 : 20} />

            {/* Card */}
            <motion.div
              initial={{ scale: 0.7, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative z-10 bg-gradient-to-br ${milestoneStyle[milestone.size]} rounded-2xl px-8 py-7 flex flex-col items-center gap-3 shadow-2xl max-w-xs text-center`}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                className={milestone.size === 'legendary' ? 'text-7xl' : 'text-5xl'}
              >
                {milestone.emoji}
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className={`text-white font-black leading-tight ${milestone.size === 'legendary' ? 'text-2xl' : 'text-lg'}`}
              >
                {milestone.text}
              </motion.p>
              {milestone.size === 'legendary' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1] }}
                  transition={{ delay: 0.5, duration: 1, repeat: 2 }}
                  className="text-white/80 text-xs font-semibold tracking-widest uppercase"
                >
                  🏆 achievement unlocked 🏆
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Username prompt overlay */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-white/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-neutral-900 text-base">{t.promptTitle}</p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{t.promptSub}</p>
                </div>
                <button
                  onClick={() => { setShowPrompt(false); setPendingClick(false); }}
                  className="text-neutral-400 hover:text-neutral-600 ml-3 mt-0.5 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmName()}
                placeholder={t.placeholder}
                maxLength={30}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <motion.button
                onClick={handleConfirmName}
                disabled={!nameInput.trim()}
                whileTap={{ scale: 0.96 }}
                className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 text-sm disabled:opacity-40 transition-colors"
              >
                {t.confirm}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrickCounter;
