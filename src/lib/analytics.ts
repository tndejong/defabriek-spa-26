declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number | boolean>) => void;
    };
  }
}

const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export function track(event: string, data?: Record<string, string | number | boolean>) {
  if (isDev) return;
  window.umami?.track(event, data);
}
