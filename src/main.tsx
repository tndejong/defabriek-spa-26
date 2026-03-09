import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes'

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registratie mislukt – geen blocker
    })
  })
}

export const createRoot = ViteReactSSG({ routes })
