const primaryCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/bundle.js',
  '/assets/images/icons/icon.svg'
];

self.addEventListener('install', (evt) => {
  caches.open(primaryCacheName).then(cache => cache.addAll(assets));
});
