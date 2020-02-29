/**
 *  Cache
 */
const CACHE_NAME = 'site-static';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/static/js/app.js',
    '/static/js/ui.js',
    '/static/css/styles.css',
    '/static/img/dish.png'
]
/**
 *  1. Install service worker
 */
self.addEventListener('install', evt => {
    console.log("service worker has been installed");
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("caching shell assets");
            cache.addAll(URLS_TO_CACHE);
        }
    ));
});

/**
 *  2. activate service worker
 */
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
});

/**
 *  3. fetch service worker
 */
self.addEventListener('fetch', evt => {
    console.log("service worker has been fetch: ", evt);
})