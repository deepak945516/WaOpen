const STATIC_CACHE = 'static-cache-v1'
const DYNAMIC_CACHE = 'dynamic-cache-v1'

const STATIC_FILES_TO_CHACHE = [
    'index.html',
    'app.js',
    'common.css',
    'index.css',
    'WaOpen.png',
    'manifest.json'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function (cache) {
                console.log('[SW]: Static Caching Started')
                cache.addAll(STATIC_FILES_TO_CHACHE)
            })
    )
})

self.addEventListener('activate', function (event) {
    console.log('[SW]: Activated')

    const allCaches = [STATIC_CACHE, DYNAMIC_CACHE]

    event.waitUntil(
        caches.keys()
            .then(function (cachedFileNames) {
                // Returns the list of old cached file names
                return cachedFileNames.filter(cachedFileName => !allCaches.includes(cachedFileName))
            })
            .then(function (cachedFileNamesToDelete) {
                return Promise.all(cachedFileNamesToDelete.map(cachedFileNameToDelete => {
                    return caches.delete(cachedFileNameToDelete)
                }))
            })
            .then(() => self.clients.claim())
    )
})

// CACHE ONLY
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (cachedResponse) {
//                 if (cachedResponse) {
//                     return cachedResponse
//                 }

//                 return caches.open(DYNAMIC_CACHE).then(cache => {
//                     return fetch(event.request)
//                         .then(response => {
//                             // Put a copy of the response in the runtime cache.
//                             return cache.put(event.request, response.clone())
//                                 .then(() => { return response });
//                         });
//                 });
//             })
//             .catch(function (error) {
//                 console.log('[SW]: ', error)
//             })
//     )
// })
