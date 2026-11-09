// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://infomissoes.net.br',
  // Páginas como pasta (planos/index.html) e URLs com barra final (/planos/):
  // funciona em qualquer nginx sem configuração especial.
  trailingSlash: 'always',
  // CSS dentro do HTML: tira o arquivo de estilo que bloqueava a primeira pintura (~550 ms no PageSpeed, 09/11/2026).
  build: { format: 'directory', inlineStylesheets: 'always' },
  // Mantém a regra de espaços do HTML (o padrão do Astro 7 segue a regra do JSX,
  // que remove espaços entre elementos em linhas diferentes).
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
