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
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    '/static/src/fallback.html'
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
        }).catch(err => {
            console.log("caching install open error");
        })
    );
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
                    .filter(key => (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME))
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
    console.log("evt.request: ", evt.request);
    evt.respondWith(
        caches.match(evt.request).then(cacheResponse => {
            /**
             *   라우팅 되는 페이지의 캐시 저장 
             * 
             *   - StaticCache와 DynamicCache에 따라 다르게 페이지 리턴함.
             *   - (1)정적인 페이지의 경우 cacheResponse가 존재한다.
             *   - (2)동적인 페이지의 경우(라우팅되는 페이지를 뜻함, static/src/*.html) cacheResponse가 존재하지 않는다.
             *   - 위의 2가지 경우로 다르게 페이지를 로드하도록 한다.
             *   - (2)번의 경우 dynamicCache에 url을 추가하도록 함.
             */
            console.log("cacheResponse: ", cacheResponse);
            return cacheResponse || fetch(evt.request).then(fetchRes => {
                return caches.open(DYNAMIC_CACHE_NAME).then(dynamicCache => {
                    dynamicCache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            })
        }).catch(() => caches.match('/static/src/fallback.html'))
    )
});