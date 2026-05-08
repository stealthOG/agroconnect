const CACHE_NAME    = 'agroconnect-v1';
const API_PREFIX    = '/api/';

/* Static assets to pre-cache on install */
const PRECACHE = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/layout.css',
  '/css/components.css',
];

/* ── Install: pre-cache shell ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: purge old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch strategy ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* API calls — network first, no caching */
  if (url.pathname.startsWith(API_PREFIX) || url.hostname !== self.location.hostname) {
    event.respondWith(fetch(request).catch(() => new Response(
      JSON.stringify({ success: false, error: 'You are offline' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )));
    return;
  }

  /* Static assets — cache first, then network */
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        /* Only cache successful GET requests for same-origin assets */
        if (request.method === 'GET' && response.ok && url.hostname === self.location.hostname) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        /* Offline fallback: serve index.html for navigation requests */
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

/* ── Background sync: flush queued API calls ── */
self.addEventListener('sync', event => {
  if (event.tag === 'ac-sync-cart') {
    event.waitUntil(flushCartQueue());
  }
});

async function flushCartQueue() {
  /* Cart sync is handled optimistically in AC_STATE.addToCart —
     this sync event is a signal to re-try any pending writes */
  const clients = await self.clients.matchAll();
  clients.forEach(c => c.postMessage({ type: 'SYNC_COMPLETE', tag: 'ac-sync-cart' }));
}

/* ── Push notifications (future) ── */
self.addEventListener('push', event => {
  if (!event.data) return;
  const { title, body, icon, data } = event.data.json();
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon:  icon || '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      data,
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(self.clients.openWindow(url));
});
