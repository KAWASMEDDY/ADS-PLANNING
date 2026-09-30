// Service worker minimal : permet l'installation sur l'écran d'accueil et l'ouverture de la coque de l'appli sans réseau.
// Les données du planning sont toujours lues en ligne.
var CACHE = 'ads-planning-v1';
var SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-192.png', './logo.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).catch(function () {}));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () { return caches.match(req).then(function (r) { return r || caches.match('./index.html'); }); })
  );
});
