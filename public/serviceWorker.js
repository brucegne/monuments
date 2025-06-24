const staticPWA = "dev-pypwa-v17"
const assets = [
    // "",
    // "/",
    "scaffold.js",
    "icons/512x512.png",
    "icons/16x16.png",
    "icons/24x24.png",
    "icons/32x32.png",
    "icons/64x64.png",
    "icons/128x128.png",
    "icons/256x256.png",
    "icons/headstone.png",
    "icons/grave2.png",
    "w3.css",
    "w3.js",
    "qrcode.js",
    "indigo.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPWA).then(cache => {
            cache.addAll(assets).then(r => {
                console.log("Cache assets downloaded");
            }).catch(err => console.log("Error caching item", err))
            console.log(`Cache ${staticPyPWA} opened.`);
        }).catch(err => console.log("Error opening cache", err))
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        }).catch(err => console.log("Cache fetch error: ", err))
    )
})
