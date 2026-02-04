// sw.js
const CACHE_NAME = 'shiba-studio-v' + new Date().getTime(); // 自動產生版本號
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/logo (2).jpg',
    // 加入其他你需要離線瀏覽的靜態資源
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // 強制跳過等待，準備更新
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 監聽來自頁面的更新指令
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
