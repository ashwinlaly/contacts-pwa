const staticContent = 'staticContent';
const dynamicContent = 'dynamicContent';
const assets = [
    "/",
    "/js/ui.js",
    "/js/app.js",
    "/index.html",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
];

// Service Worker Installing
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(staticContent).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("activate", e => {
    console.log("Service Activated")
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(staticRes => {
            return staticRes || fetch(e.request).then(dynamicRes => {
                caches.open(dynamicContent).then(cache => {
                    cache.put(e.request.url, dynamicRes.clone())
                    return dynamicRes
                })
            })
        })
    )
});