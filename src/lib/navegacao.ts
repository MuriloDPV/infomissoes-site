// Páginas do site, na ordem do menu. O menu, o rodapé e o sitemap.xml saem desta lista.
// URLs sempre com barra final (/planos/), como o build gera.
export const paginas = [
  { href: '/', rotulo: 'Início' },
  { href: '/planos/', rotulo: 'Planos' },
  { href: '/onde-atendemos/', rotulo: 'Onde atendemos' },
  { href: '/contato/', rotulo: 'Contato' },
] as const;

/** `aria-current="page"` para o link da página aberta (recebe `Astro.url.pathname`). */
export function atual(href: string, caminho: string): 'page' | undefined {
  const normalizado = caminho.endsWith('/') ? caminho : `${caminho}/`;
  return normalizado === href ? 'page' : undefined;
}
