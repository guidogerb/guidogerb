// public/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

const CACHE_PREFIX = 'chatbot-cache';
let CURRENT_CACHE;

// Initialize workbox
workbox.setConfig({
    debug: false // Set to true for development
});

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                maxEntries: 30,
            }),
        ],
    })
);

// Cache CSS and JavaScript Files
workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

// Cache Images
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

// Asset manifest handling
async function getManifest() {
    try {
        const response = await fetch('/asset-manifest.json');
        if (!response.ok) throw new Error('Failed to fetch asset manifest');
        return response.json();
    } catch (error) {
        console.error('Error loading asset manifest:', error);
        throw error;
    }
}

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        (async () => {
            try {
                const manifest = await getManifest();
                CURRENT_CACHE = `${CACHE_PREFIX}-${manifest.version}`;

                // Clean up old caches
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames
                        .filter(cacheName =>
                            cacheName.startsWith(CACHE_PREFIX) &&
                            cacheName !== CURRENT_CACHE
                        )
                        .map(cacheName => caches.delete(cacheName))
                );

                await self.clients.claim();
            } catch (error) {
                console.error('Cache setup failed:', error);
            }
        })()
    );
});

// Offline fallback
workbox.routing.registerRoute(
    ({request}) => request.mode === 'navigate',
    async ({event}) => {
        try {
            return await workbox.strategies.NetworkFirst({
                cacheName: 'pages',
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
                        maxEntries: 25,
                    }),
                ],
            }).handle({event});
        } catch (error) {
            return caches.match('/index.html');
        }
    }
);

// Handle updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
