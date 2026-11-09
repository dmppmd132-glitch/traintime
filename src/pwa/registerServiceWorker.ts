/**
 * Register the production service worker from the browser only.
 *
 * The current production site already serves a Workbox-generated /sw.js.
 * Use this helper only when the host application does not already register
 * that worker; registering it twice is unnecessary.
 */
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
      // PWA support is progressive enhancement; never block the app on it.
      console.warn('[PWA] Service worker registration failed', error)
    })
  })
}
