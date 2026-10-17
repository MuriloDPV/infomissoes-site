// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://infomissoes.net.br',
  // Mantém a regra de espaços do HTML (o padrão do Astro 7 segue a regra do JSX,
  // que remove espaços entre elementos em linhas diferentes).
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
