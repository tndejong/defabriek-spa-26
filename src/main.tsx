import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Vang beforeinstallprompt zo vroeg mogelijk op, vóór React rendert,
// zodat het niet gemist wordt door een late useEffect.
type DeferredPrompt = Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> };
declare global {
  interface Window { __pwaPrompt?: DeferredPrompt }
}
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__pwaPrompt = e as DeferredPrompt;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registratie mislukt – geen blocker
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

