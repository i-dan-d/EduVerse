/**
 * Service Worker for EduGame
 * Provides basic caching for better performance
 */

const CACHE_NAME = 'edugame-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/js/app.js',
    '/js/core/engine.js',
    '/js/core/shuffle.js',
    '/js/core/storage.js',
    '/js/core/animations.js',
    '/js/core/achievements.js',
    '/js/core/analytics.js',
    '/js/core/ai.js',
    '/js/core/question-manager.js',
    '/js/modules/math.js',
    '/js/modules/physics.js',
    '/js/modules/chemistry.js',
    '/js/ui/manager.js',
    '/js/data/questions.js'
];

// Install event
self.addEventListener('install', function(event) {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('🔧 Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('🔧 Service Worker: Cache failed', error);
            })
    );
});

// Fetch event
self.addEventListener('fetch', function(event) {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version if available
                if (response) {
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then(function(response) {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
            .catch(function() {
                // Return a fallback if both cache and network fail
                return new Response('Game đang offline. Vui lòng kiểm tra kết nối mạng.', {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
            })
    );
});

// Activate event
self.addEventListener('activate', function(event) {
    console.log('🔧 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🔧 Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Message event
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('🔧 Service Worker: Loaded');

