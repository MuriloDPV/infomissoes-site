// Páginas do site, na ordem do menu. O menu, o rodapé e o sitemap.xml saem desta lista.
// URLs sempre com barra final (/planos/), como o build gera.
export const paginas = [
  { href: '/', rotulo: 'Início' },
  { href: '/planos/', rotulo: 'Planos' },
  { href: '/onde-atendemos/', rotulo: 'Onde atendemos' },
  { href: '/contato/', rotulo: 'Contato' },
] as const;

/**
 * `aria-current` do link (recebe `Astro.url.pathname`): "page" na página aberta e "true" nas páginas de dentro
 * dela (em /planos/empresas/, o link Planos fica marcado).
 */
export function atual(href: string, caminho: string): 'page' | 'true' | undefined {
  const normalizado = caminho.endsWith('/') ? caminho : `${caminho}/`;
  if (normalizado === href) return 'page';
  return href !== '/' && normalizado.startsWith(href) ? 'true' : undefined;
}
