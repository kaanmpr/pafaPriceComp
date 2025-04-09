const CACHE_NAME = 'peyzaj-karsilastirma-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/recharts/2.1.16/Recharts.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.21.2/babel.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css',
  './icon-192x192.png',
  './icon-512x512.png'
];

// Önbelleğe alma aşaması
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Önbellek açıldı');
        return cache.addAll(urlsToCache);
      })
  );
});

// Önbelleği kullanma aşaması
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Önbellekte varsa, önbellekten döndür
        if (response) {
          return response;
        }

        // Yoksa ağdan al
        return fetch(event.request).then(
          response => {
            // Yanıt geçerli değilse, sadece yanıtı döndür
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Yanıtı önbelleğe ekle
            let responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });

            return response;
          }
        );
      })
  );
});

// Eski önbellekleri temizleme
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});