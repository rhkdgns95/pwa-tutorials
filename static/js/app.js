/** Check service-worker supported browser */
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log("service worker register", reg))
        .catch((err) => console.log('service worker not register', err))
} else { // No Supported service-worker
    console.log("service worker not register");
}