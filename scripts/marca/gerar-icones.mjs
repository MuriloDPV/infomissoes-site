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
const grupo = (svg, id) => {
  const ini = svg.indexOf(`<g id="${id}"`);
  if (ini < 0) throw new Error(`camada ${id} não encontrada`);
  return svg.slice(ini, svg.indexOf('</g>', ini) + 4);
};

const BRANCO = '#ffffff';
const FUNDO = '#f4f8fc';
const AZUL = '#0199da';

// Recorte dos ícones: o "M" amarelo de "Missões" e a torre com os arcos de sinal (a torre faz o "i"),
// nas cores da logo para fundo claro e na mesma ordem das camadas. Da camada missoes só fica o "M":
// ela é cortada no meio do vão entre o "M" (termina em x 666) e o primeiro "s" (começa em x 783).
// Caixa do recorte na logo (2000x1128): x 268 a 795 e y 483 (topo dos arcos) a 876 (pé do "M").
const CORTE_M = 724;
const caixa = { x0: 268, y0: 483, x1: 795, y1: 876 };
const cx = (caixa.x0 + caixa.x1) / 2;
const cy = (caixa.y0 + caixa.y1) / 2;
const recorte =
  grupo(claro, 'tower') +
  grupo(claro, 'arcs') +
  `<clipPath id="so-o-m"><rect width="${CORTE_M}" height="1128"/></clipPath>` +
  `<g clip-path="url(#so-o-m)">${grupo(claro, 'missoes')}</g>`;

// Quadrado branco de lado `lado` (em unidades da logo) centrado no recorte, com cantos de raio `raio`.
// `desvio` desloca o quadrado um pouco, sem mudar o recorte.
const icone = (lado, raio, desvio = [0, 0]) => {
  const x = cx - lado / 2 + desvio[0];
  const y = cy - lado / 2 + desvio[1];
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${lado} ${lado}">` +
    `<rect x="${x}" y="${y}" width="${lado}" height="${lado}" rx="${raio}" fill="${BRANCO}"/>${recorte}</svg>`
  );
};
const png = (svg, t) => sharp(Buffer.from(svg), { density: 600 }).resize(t, t).png({ compressionLevel: 9 }).toBuffer();

// favicon.ico com PNGs dentro (16, 32 e 48), o formato que os navegadores de hoje leem.
const ico = (imagens) => {
  const cabecalho = Buffer.alloc(6 + 16 * imagens.length);
  cabecalho.writeUInt16LE(1, 2);
  cabecalho.writeUInt16LE(imagens.length, 4);
  let posicao = cabecalho.length;
  imagens.forEach(({ t, dados }, i) => {
    const e = 6 + 16 * i;
    cabecalho.writeUInt8(t, e);
    cabecalho.writeUInt8(t, e + 1);
    cabecalho.writeUInt16LE(1, e + 4);
    cabecalho.writeUInt16LE(32, e + 6);
    cabecalho.writeUInt32LE(dados.length, e + 8);
    cabecalho.writeUInt32LE(posicao, e + 12);
    posicao += dados.length;
  });
  return Buffer.concat([cabecalho, ...imagens.map((i) => i.dados)]);
};

// Favicon: pouca folga (o recorte ocupa 87% da largura) e cantos arredondados, para o "M" e a torre
// ficarem legíveis em 16px e o quadrado branco aparecer em aba clara e escura. O desvio (9/32 e 2/32
// de pixel em 16px) põe as hastes do "M" e a torre na grade de pixels: menos borrado em 16 e 32px.
const favicon = icone(606, 120, [10.7, 2.4]);
writeFileSync(publico('favicon.svg'), favicon);
writeFileSync(publico('favicon.ico'), ico(await Promise.all([16, 32, 48].map(async (t) => ({ t, dados: await png(favicon, t) })))));

// Celular: quadrado branco cheio, sem cantos (o iPhone arredonda sozinho), com um pouco mais de folga.
writeFileSync(publico('apple-touch-icon.png'), await png(icone(700, 0), 180));

// Android (manifesto, "any maskable"): quadrado cheio e o recorte inteiro dentro do círculo central
// de 80% (zona segura de ícone recortável). O ponto mais longe do centro fica a 329 unidades.
for (const t of [192, 512]) writeFileSync(publico(`icone-${t}.png`), await png(icone(840, 0), t));

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

console.log('Gerados em public/: favicon.svg, favicon.ico, apple-touch-icon.png, icone-192.png, icone-512.png, og-infomissoes.png');
