/**
 *  1. Install service worker
 */
self.addEventListener('install', evt => {
    console.log("service worker has been installed");
    
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