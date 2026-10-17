// sitemap.xml: as páginas do menu (src/lib/navegacao.ts), com o endereço completo e a barra final.
import type { APIRoute } from 'astro';
import { site } from '../data/site.ts';
import { paginas } from '../lib/navegacao.ts';

export const GET: APIRoute = () => {
  const urls = paginas.map((p) => `  <url><loc>${new URL(p.href, site.url).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
