const CACHE_NAME = "chuck-norris-pwa-v2";  // Change "v1" to "v2"
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css",
    "https://code.jquery.com/jquery-1.11.1.min.js",
    "https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cache) => cache !== CACHE_NAME)
                    .map((cache) => caches.delete(cache))
            );
        })
    );
});
