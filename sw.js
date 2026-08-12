const CACHE="manifest-v3-1-ai";
const ASSETS=["./manifest.json","./icon.svg"];
self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(new URL(event.request.url).pathname.startsWith("/api/"))return;
  const req=event.request;
  if(req.mode==="navigate"){
    event.respondWith(fetch(req,{cache:"no-store"}).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(
    fetch(req).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(cache=>cache.put(req,copy));
      return resp;
    }).catch(()=>caches.match(req))
  );
});