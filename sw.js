/**
 *  Cache
 *  - static
 *  - dynamic
 */
const CACHE_NAME = 'site-static-v2';
const DYNAMIC_CACHE_NAME = 'site-dynamic-v1';

const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/static/js/app.js',
    '/static/js/ui.js',
    '/static/css/styles.css',
    '/static/img/dish.png',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
]
/**
 *  1. Install service worker
 * 
 *  - set cache
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
 * 
 *  - update cache
 */
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            console.log("keys: ", keys);
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(deletedKey => caches.delete(deletedKey))
            );
        })
    )
});

/**
 *  3. fetch service worker
 * 
 *  - get cache
 *  - set dynamic cache
 */
self.addEventListener('fetch', evt => {
    console.log("service worker has been fetch: ", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheResponse => {
            return cacheResponse || fetch(evt.request).then(fetchRes => {
                caches.open(DYNAMIC_CACHE_NAME).then(dynamicCache => {
                    console.log("DYNAMIC_CACHE: ", evt.request.url);
                    console.log("fetchRes: ", fetchRes);
                    dynamicCache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    )
})


