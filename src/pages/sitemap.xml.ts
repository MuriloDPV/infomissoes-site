// sitemap.xml: as páginas do menu (src/lib/navegacao.ts) e, logo depois de /planos/, as outras páginas de
// planos (src/lib/planos.ts), com o endereço completo e a barra final.
import type { APIRoute } from 'astro';
import { site } from '../data/site.ts';
import { paginas } from '../lib/navegacao.ts';
import { categorias } from '../lib/planos.ts';

export const GET: APIRoute = () => {
  const hrefs = new Set(
    paginas.flatMap((p) => (p.href === '/planos/' ? [p.href, ...categorias.map((c) => c.href)] : [p.href]))
  );
  const urls = [...hrefs].map((href) => `  <url><loc>${new URL(href, site.url).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
