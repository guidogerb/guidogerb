// Name of the cache
const CACHE_NAME = 'guidogerb-cache-v1';

// Add any initial URLs you want to cache immediately
const INITIAL_CACHED_RESOURCES = [
    '/',
    '/index.html',
    '/offline.html',
    '/assets/main-HPYbcG_Q.js',
    '/assets/main-Dijg1YTW.css',
    '/icons/favicon.ico',
    '/manifest.json',
    '/manifest.webmanifest'
];

// Install event - cache initial resources with error handling
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Cache resources one by one to handle failures gracefully
            return Promise.allSettled(
                INITIAL_CACHED_RESOURCES.map(async (url) => {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${url}`);
                        }
                        await cache.put(url, response);
                        console.log(`Successfully cached: ${url}`);
                    } catch (error) {
                        console.warn(`Failed to cache: ${url}`, error);
                    }
                })
            );
        })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - network first with graceful fallback
self.addEventListener('fetch', (event) => {
    // Only handle same-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        // For cross-origin requests, just pass through to the network
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Only cache successful responses
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Clone the response before caching
                const responseToCache = response.clone();

                // Cache the fetched response
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
            .catch(async () => {
                // If network fails, try to get from cache
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If the request is for a page, try to serve index.html from cache
                if (event.request.mode === 'navigate') {
                    const cachedIndex = await caches.match('/index.html');
                    if (cachedIndex) {
                        return cachedIndex;
                    }
                    // Only fall back to offline.html if we can't serve the cached app
                    return caches.match('/offline.html');
                }

                // If nothing else matches
                return new Response('Network error happened', {
                    status: 404,
                    headers: { 'Content-Type': 'text/plain' },
                });
            })
    );
});
// Optional: Handle push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data?.text() || 'No content',
        icon: '/icons/favicon.ico', // Use favicon as fallback if other icons aren't available
        icons: '/icons/icons-192x192.png',
        badge: '/icons/badge-72x72.png',
    };

    event.waitUntil(
        self.registration.showNotification('GuidoGerb Publishing', options)
    );
});

