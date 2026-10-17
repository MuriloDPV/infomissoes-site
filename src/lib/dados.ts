// Dados derivados de src/data/site.ts para os componentes.
// No build, dado preenchido mas inválido (número, arquivo) para o build com erro,
// em vez de virar link ou imagem quebrada.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';
import { site, type Foto } from '../data/site.ts';
import { linkTelefone, linkWhatsApp, numeroBR, valorPreco } from './contato.ts';

export const DEV = import.meta.env.DEV;

function validar(condicao: boolean, mensagem: string) {
  if (condicao) return;
  if (DEV) console.warn(`[site.ts] ${mensagem}`);
  else throw new Error(`[site.ts] ${mensagem}`);
}

validar(!site.whatsapp || !!numeroBR(site.whatsapp), `whatsapp inválido: "${site.whatsapp}"`);
validar(!site.telefone || !!numeroBR(site.telefone), `telefone inválido: "${site.telefone}"`);
site.planos.forEach((p, i) =>
  validar(!!valorPreco(p.preco), `planos[${i}].preco fora do formato "R$ 99,90": "${p.preco}"`)
);

/** Link do WhatsApp com a mensagem padrão de site.ts já escrita. */
export const whatsapp = linkWhatsApp(site.whatsapp, site.mensagemWhatsapp);
/** Mesmo link, com uma frase a mais depois da mensagem padrão. */
export const whatsappMensagem = (complemento: string) =>
  linkWhatsApp(site.whatsapp, [site.mensagemWhatsapp, complemento].filter(Boolean).join(' '));
export const telefone = linkTelefone(site.telefone);

/** Nome do portal com artigo/preposição certos para usar em frases. */
const feminino = site.artigoPortal === 'a';
export const portal = {
  nome: site.rotuloPortal,
  url: site.urlPortal,
  a: `${feminino ? 'a' : 'o'} ${site.rotuloPortal}`,
  na: `${feminino ? 'na' : 'no'} ${site.rotuloPortal}`,
  pela: `${feminino ? 'pela' : 'pelo'} ${site.rotuloPortal}`,
};

const fotos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/fotos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});
const marcas = import.meta.glob<{ default: ImageMetadata }>('/src/assets/marca/*.{png,webp,avif,jpg,jpeg}', {
  eager: true,
});
// SVG da marca entra como texto, para ir direto no HTML (a logo do cabeçalho anima por camadas).
const marcasSvg = import.meta.glob<string>('/src/assets/marca/*.svg', { query: '?raw', import: 'default', eager: true });

function arquivo(lista: typeof fotos, pasta: string, nome: string | null, campo: string) {
  if (!nome) return null;
  const img = lista[`/src/assets/${pasta}/${nome}`]?.default ?? null;
  validar(!!img, `${campo}: arquivo não encontrado em src/assets/${pasta}/${nome}`);
  return img;
}

export type Marca = { svg: string } | { imagem: ImageMetadata };

function marca(nome: string | null, campo: string): Marca | null {
  if (!nome) return null;
  const svg = marcasSvg[`/src/assets/marca/${nome}`];
  if (svg) return { svg };
  const imagem = arquivo(marcas, 'marca', nome, campo);
  return imagem ? { imagem } : null;
}

export const imagemFoto = (foto: Foto, campo: string) => arquivo(fotos, 'fotos', foto.arquivo, campo);
export const logo = marca(site.logo, 'logo');
export const logoFundoEscuro = marca(site.logoFundoEscuro, 'logoFundoEscuro');

const existe = (nome: string) => existsSync(join(process.cwd(), 'public', nome));
const faviconExiste = !!site.favicon && existe(site.favicon);
validar(!site.favicon || faviconExiste, `favicon: arquivo não encontrado em public/${site.favicon}`);
export const favicon = faviconExiste ? `/${site.favicon}` : null;

// Ícones gerados junto com o favicon (scripts/marca/gerar-icones.mjs). Só entram no HTML se existirem.
const publico = (nome: string) => (existe(nome) ? `/${nome}` : null);
export const icones = {
  png: publico('favicon-32.png'),
  celular: publico('apple-touch-icon.png'),
  manifesto: publico('site.webmanifest'),
};
export const imagemCompartilhar = publico('og-infomissoes.png');
