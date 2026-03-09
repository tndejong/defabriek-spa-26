declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function track(event: string, data?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isDev) return;
  window.umami?.track(event, data);
}
