// Desliga o service worker do site antigo (React) e limpa o cache dele.
// Pode ficar aqui: quem nunca visitou o site antigo nunca baixa este arquivo.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const chaves = await caches.keys();
    await Promise.all(chaves.map((c) => caches.delete(c)));
    await self.registration.unregister();
    const janelas = await self.clients.matchAll({ type: 'window' });
    janelas.forEach((j) => j.navigate(j.url));
  })());
});
