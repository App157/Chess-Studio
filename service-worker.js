const CACHE_NAME = "studio-cache-v1"; // can stay same
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Update cache if file changed
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});