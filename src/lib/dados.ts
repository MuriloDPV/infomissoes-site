// Dados derivados de src/data/site.ts para os componentes.
// No build, dado preenchido mas inválido (número, arquivo) para o build com erro,
// em vez de virar link ou imagem quebrada.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';
import { site, type Foto } from '../data/site.ts';
import { linkTelefone, linkWhatsApp, numeroBR } from './contato.ts';

export const DEV = import.meta.env.DEV;

function validar(condicao: boolean, mensagem: string) {
  if (condicao) return;
  if (DEV) console.warn(`[site.ts] ${mensagem}`);
  else throw new Error(`[site.ts] ${mensagem}`);
}

validar(!site.whatsapp || !!numeroBR(site.whatsapp), `whatsapp inválido: "${site.whatsapp}"`);
validar(!site.telefone || !!numeroBR(site.telefone), `telefone inválido: "${site.telefone}"`);

export const whatsapp = linkWhatsApp(site.whatsapp);
export const whatsappMensagem = (mensagem: string) => linkWhatsApp(site.whatsapp, mensagem);
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
const marcas = import.meta.glob<{ default: ImageMetadata }>('/src/assets/marca/*.{svg,png,webp,avif,jpg,jpeg}', {
  eager: true,
});

function arquivo(lista: typeof fotos, pasta: string, nome: string | null, campo: string) {
  if (!nome) return null;
  const img = lista[`/src/assets/${pasta}/${nome}`]?.default ?? null;
  validar(!!img, `${campo}: arquivo não encontrado em src/assets/${pasta}/${nome}`);
  return img;
}

export const imagemFoto = (foto: Foto, campo: string) => arquivo(fotos, 'fotos', foto.arquivo, campo);
export const logo = arquivo(marcas, 'marca', site.logo, 'logo');

const faviconExiste = !!site.favicon && existsSync(join(process.cwd(), 'public', site.favicon));
validar(!site.favicon || faviconExiste, `favicon: arquivo não encontrado em public/${site.favicon}`);
export const favicon = faviconExiste ? `/${site.favicon}` : null;
