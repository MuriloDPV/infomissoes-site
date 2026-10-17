// robots.txt: libera tudo e aponta o sitemap.xml (endereço tirado de site.ts).
import type { APIRoute } from 'astro';
import { site } from '../data/site.ts';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
