self.addEventListener("install", (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Claim clients so the SW starts controlling pages ASAP
  event.waitUntil(self.clients.claim());
});

// Simple fetch handler that always tries network first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});