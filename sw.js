const CACHE_NAME = "jsvm-cache-v1";

const urlsToCache = [
  "/JSVMdevtestforpersonalusenobodyelseusethis/index.html",
  "/JSVMdevtestforpersonalusenobodyelseusethis/manifest.json",
  "/JSVMdevtestforpersonalusenobodyelseusethis/icon-192.png",
  "/JSVMdevtestforpersonalusenobodyelseusethis/icon-512.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() =>
        caches.match("/JSVMdevtestforpersonalusenobodyelseusethis/index.html")
      );
    })
  );
});