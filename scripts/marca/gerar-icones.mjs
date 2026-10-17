// Gera favicon, ícones do celular e a imagem de compartilhamento (Open Graph) a partir das
// camadas da logo em src/assets/marca/. Só recorta e posiciona camadas; não redesenha nada.
// Uso: node scripts/marca/gerar-icones.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const raiz = join(import.meta.dirname, '..', '..');
const ler = (nome) => readFileSync(join(raiz, 'src', 'assets', 'marca', nome), 'utf8');
const publico = (nome) => join(raiz, 'public', nome);

const claro = ler('logo-infomissoes.svg');
const escuro = ler('logo-infomissoes-fundo-escuro.svg');
const grupo = (svg, id) => {
  const ini = svg.indexOf(`<g id="${id}"`);
  if (ini < 0) throw new Error(`camada ${id} não encontrada`);
  return svg.slice(ini, svg.indexOf('</g>', ini) + 4);
};

const MARINHO = '#1a2d6d';
const FUNDO = '#f4f8fc';
const AZUL = '#0199da';

// Torre com sinal (versão para fundo escuro) sobre marinho. Centro da torre: x 707, y 677.
const torre = grupo(escuro, 'tower') + grupo(escuro, 'arcs');
const icone = (lado, raio) => {
  const x = 707 - lado / 2;
  const y = 677 - lado / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${lado} ${lado}">` +
    `<rect x="${x}" y="${y}" width="${lado}" height="${lado}" rx="${raio}" fill="${MARINHO}"/>${torre}</svg>`
  );
};

// Favicon: cantos arredondados, torre grande. Celular/manifesto: quadrado cheio, com folga
// (o sistema arredonda os cantos e recorta em círculo).
const favicon = icone(450, 96);
const cheio = icone(580, 0);
writeFileSync(publico('favicon.svg'), favicon);
await sharp(Buffer.from(favicon), { density: 300 }).resize(32, 32).png().toFile(publico('favicon-32.png'));
await sharp(Buffer.from(cheio), { density: 300 }).resize(180, 180).png().toFile(publico('apple-touch-icon.png'));
for (const t of [192, 512]) {
  await sharp(Buffer.from(cheio), { density: 400 }).resize(t, t).png().toFile(publico(`icone-${t}.png`));
}

// Open Graph 1200x630: fundo claro, logo inteira no centro e ondas de sinal bem leves saindo da antena.
const largura = 760;
const escala = largura / 2000;
const x0 = (1200 - largura) / 2;
const y0 = (630 - 1128 * escala) / 2;
const ax = x0 + 707.5 * escala;
const ay = y0 + 543 * escala;
const ondas = [150, 260, 390, 540, 710]
  .map((r, i) => `<circle cx="${ax}" cy="${ay}" r="${r}" fill="none" stroke="${AZUL}" stroke-width="2" opacity="${(0.16 - i * 0.025).toFixed(3)}"/>`)
  .join('');
const corpoLogo = claro.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const og =
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">` +
  `<rect width="1200" height="630" fill="${FUNDO}"/>${ondas}` +
  `<g transform="translate(${x0} ${y0}) scale(${escala})">${corpoLogo}</g></svg>`;
await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(publico('og-infomissoes.png'));

console.log('Gerados em public/: favicon.svg, favicon-32.png, apple-touch-icon.png, icone-192.png, icone-512.png, og-infomissoes.png');
