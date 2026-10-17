"""Vetoriza a logo oficial da Info Missões em camadas (um <g> por camada), sem redesenhar.

Uso: python -I scripts/marca/vetorizar-camadas.py <pasta assets/logo> <saida.svg> [escuro]

- Silhueta: pixels da logo oficial com alfa > 0,5 (o mesmo critério da logo vetorizada do kit).
- Camada de cada pixel: a camada PNG do kit com maior alfa naquele ponto. As bordas cinza das
  ruínas que o kit deixou nas camadas de letra (info/missoes) voltam para a camada cinza mais perto.
- Cor: a cor oficial da camada (cinza #363435, azul #0199da, amarelo #f7c12d).
  Versão para fundo escuro: o cinza vira #f6f7fa, como no kit.
- Traço: potrace com os mesmos parâmetros do kit (turdsize 6, alphamax 1, opttolerance 0,2).
- A bolinha da antena vira um grupo próprio dentro da torre (id="antena"), para a animação.
"""
import sys
import numpy as np
import potrace
from PIL import Image
from scipy import ndimage as ndi

base, saida = sys.argv[1], sys.argv[2]
escuro = len(sys.argv) > 3 and sys.argv[3] == 'escuro'

CAMADAS = ['ruins', 'tower', 'arcs', 'info', 'missoes', 'prov']
COR = {'ruins': 'cinza', 'tower': 'cinza', 'prov': 'cinza', 'arcs': 'azul', 'info': 'azul', 'missoes': 'amarelo'}
HEX = {'cinza': '#f6f7fa' if escuro else '#363435', 'azul': '#0199da', 'amarelo': '#f7c12d'}
PAL = {'cinza': [54, 52, 53], 'azul': [1, 153, 218], 'amarelo': [247, 193, 45]}

logo = np.asarray(Image.open(f'{base}/logo_infomissoes.png').convert('RGBA')).astype(np.float32)
H, W = logo.shape[:2]
rgb, alfa = logo[..., :3], logo[..., 3] / 255
tinta = alfa > 0.5

# Cor mais próxima de cada pixel (só para achar as bordas cinza fora do lugar)
nomes_cor = list(PAL)
dist = np.stack([((rgb - np.array(PAL[n])) ** 2).sum(2) for n in nomes_cor], -1)
cor_px = np.array(nomes_cor)[np.argmin(dist, -1)]

alfas = np.stack([np.asarray(Image.open(f'{base}/camadas/{n}.png').convert('RGBA'))[..., 3] for n in CAMADAS], -1)
rotulo = np.argmax(alfas, -1)  # índice em CAMADAS

# Núcleo de cada camada: alfa alto e a cor certa da camada.
# Azul e amarelo são saturados; o cinza (e o antisserrilhado dele) não.
saturacao = rgb.max(2) - rgb.min(2)
nucleo = {}
for i, n in enumerate(CAMADAS):
    nucleo[n] = (alfas[..., i] > 127) & (cor_px == COR[n])
    if COR[n] != 'cinza':
        nucleo[n] &= saturacao > 80

# Bordas cinza dentro de camadas de letra -> camada cinza mais perto (ruins/tower/prov)
cinzas = ['ruins', 'tower', 'prov']
letra = np.isin(rotulo, [CAMADAS.index('info'), CAMADAS.index('missoes')])
dists = []
for n in cinzas:
    d = ndi.distance_transform_edt(~nucleo[n])
    dists.append(d)
dists = np.stack(dists, -1)
d_letra = ndi.distance_transform_edt(~(nucleo['info'] | nucleo['missoes']))
# Pixel sem saturação (cinza das ruínas, inclusive as pontas finas) ou longe das letras não é letra.
fora = tinta & letra & ((saturacao <= 80) | (d_letra > 2))
perto_cinza = dists.min(-1)
trocar = fora & (perto_cinza <= d_letra + 0.5)
rotulo[trocar] = np.array([CAMADAS.index(n) for n in cinzas])[np.argmin(dists, -1)][trocar]
print('bordas cinza devolvidas para camadas cinza:', int(trocar.sum()), 'de', int(fora.sum()))

yy, xx = np.mgrid[0:H, 0:W]


def tracar(mask):
    bm = potrace.Bitmap(~mask)
    plist = bm.trace(turdsize=6, alphamax=1.0, opticurve=True, opttolerance=0.2)
    dd = []
    for curve in plist:
        s = curve.start_point
        dd.append(f'M{s.x:.2f},{s.y:.2f}')
        for seg in curve.segments:
            if seg.is_corner:
                dd.append(f'L{seg.c.x:.2f},{seg.c.y:.2f}L{seg.end_point.x:.2f},{seg.end_point.y:.2f}')
            else:
                dd.append(
                    f'C{seg.c1.x:.2f},{seg.c1.y:.2f} {seg.c2.x:.2f},{seg.c2.y:.2f} {seg.end_point.x:.2f},{seg.end_point.y:.2f}'
                )
        dd.append('Z')
    return ''.join(dd)


grupos = []
for i, n in enumerate(CAMADAS):
    m = tinta & (rotulo == i)
    cor = HEX[COR[n]]
    if n == 'tower':
        # Bolinha da antena (acima do pescoço, y < 567) separada do corpo da torre.
        # 2 px de sobreposição para não aparecer emenda.
        antena = m & (yy < 569)
        corpo = m & (yy >= 566)
        grupos.append(
            f'<g id="tower" fill="{cor}"><path id="antena" d="{tracar(antena)}"/><path d="{tracar(corpo)}"/></g>'
        )
    else:
        grupos.append(f'<g id="{n}" fill="{cor}"><path d="{tracar(m)}"/></g>')
    print(n, int(m.sum()), 'px')

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
    + ''.join(grupos)
    + '</svg>\n'
)
open(saida, 'w').write(svg)
print(saida, len(svg), 'bytes')
