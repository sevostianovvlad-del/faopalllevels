/* Offline shell and on-demand image cache. No analytics, accounts or server APIs. */
const CACHE='faop-nav-v5-complete-2026-10-27';
const CORE=['./','./index.html','./style.css','./app.js','./data.js','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./assets/icons/autism.svg','./assets/icons/blind.svg','./assets/icons/deaf.svg','./assets/icons/delay.svg','./assets/icons/hard-hearing.svg','./assets/icons/intellectual.svg','./assets/icons/low-vision.svg','./assets/icons/motor.svg','./assets/icons/speech.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('faop-nav-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{
   if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));}
   return res;
 }).catch(()=>req.mode==='navigate'?caches.match('./index.html').then(x=>x||Response.error()):Response.error())));
});
