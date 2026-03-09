import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type {} from 'vite-react-ssg'

const eventSlugs = [
  'spion-x-de-fabriek-mei-2026',
  'faboleuze-avond-januari-2026',
  'battle-at-the-border-november-2025',
  'vrijwilligersavond-augustus-2025',
];

const blogSlugs = [
  'hoe-leer-je-skateboarden',
  'welk-skateboard-kopen-beginner',
  'beste-indoor-skateparken-nederland',
  'skatelessen-kinderen',
  'ollie-leren-stap-voor-stap',
  'indoor-vs-outdoor-skateboarden',
  'skateboarden-voor-volwassenen',
  'veilig-skateboarden-bescherming',
  'skateparken-enschede-overijssel',
  'kosten-skateboarden-beginners',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    includedRoutes(paths) {
      return [
        ...paths,
        ...eventSlugs.map((slug) => `/events/${slug}`),
        ...blogSlugs.map((slug) => `/blog/${slug}`),
      ];
    },
  },
})
