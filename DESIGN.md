# Design system — Info Missões (v3, acabamento editorial)

O provedor da cidade: confiável e fácil de usar. Elegância por contenção: muito espaço, poucas cores por tela, a tipografia fazendo o trabalho e uma imagem forte por página. Feito para ler no celular e por gente de qualquer idade.

Tokens: `src/styles/global.css` (bloco `@theme`). Os padrões do Tailwind foram limpos, então só existem os tokens abaixo. Nas páginas não entra valor solto (`text-[17px]`, `#hex`, `bg-red-500`).

## Linguagem visual: traço das ruínas + fibra de luz

- Sem fotos. A imagem de cada página é desenhada por código (SVG + CSS), com a identidade da própria logo.
- O traço das ruínas é a camada `ruins` da logo em camadas, usada como está (tirada do SVG no build, em `tracoRuinas`, `src/lib/dados.ts`): só o contorno, em traço fino. A logo em si nunca é redesenhada nem recolorida.
- Linhas de fibra: curvas finas e longas que atravessam a cena, como cabos. Um pulso de luz azul percorre o traço e as fibras, como o "traço de luz" dos Reels. Na versão escura, um ou outro ponto de luz amarelo nas fibras.
- Onde aparece:
  - /planos: abertura escura (noite) com as ruínas grandes; o título fica entre as paredes, sob o telhado, como na logo.
  - Início: versão clara e calma (marinho bem suave, a luz passa de vez em quando), à direita no desktop e no pé no celular, longe do título e dos botões.
  - /onde-atendemos: o mapa das cidades (ver Mapa).
  - 404: a mesma versão clara da Início.
- Nada de circuito, partículas aleatórias, grade neon ou "fundo tech" genérico.

## Cores

Oficiais (as mesmas da logo e dos posts aprovados):
- `marinho` #1a2d6d: títulos, botão primário
- `noite` #081029: rodapé, abertura de /planos, mapa
- `azul` #0199da: o pulso de luz, ícones e detalhes
- `amarelo` #f7c12d: acento único. Marca só o que importa: o marca-texto ("Missões", o número de cidades), os pontos de luz na arte escura, o sublinhado do link atual no rodapé e o foco em fundo escuro. Nunca é fundo de botão.
- `cinza` #363435: texto do corpo
- `fundo` #f4f8fc: fundo claro padrão
- `branco` #ffffff

Tons derivados (misturas do marinho com branco, fundo ou noite, nenhuma cor nova):
- `faixa` #e7ecf3: o segundo fundo claro (marinho 6% sobre o fundo), para faixas e cartões, como as faixas bege editoriais. `marinho-600` sobre ela dá 5,0:1.
- `marinho-100` #e4e6ed, `marinho-200` #cdd1df: linhas e divisórias
- `marinho-300` #a3abc5: rótulos e texto secundário no escuro (8,2:1 sobre noite)
- `marinho-600` #536292: texto secundário em fundo claro (5,6:1 sobre fundo, 6:1 sobre branco)
- `marinho-800` #12204e: hover do marinho, cartão no escuro

Exceção:
- `whatsapp` #25d366: verde oficial do WhatsApp. Só no botão flutuante, com o símbolo branco e o rótulo `noite` (9,5:1). Os outros botões de WhatsApp seguem a paleta.

Regras de contraste (todo texto passa em WCAG AA; o menor par usado é 5,0:1):
- `azul` não é cor de texto. É luz, ícone ou detalhe.
- `amarelo` nunca é texto sobre fundo claro. No marca-texto, o texto em cima é `marinho` (7,7:1).
- Na abertura escura, o título é branco e a frase `marinho-200` (12:1 sobre noite; mais de 7:1 mesmo em cima de um traço). O traço fica em branco 26% e não atrapalha a leitura.

## Superfícies

Cada seção escolhe uma superfície, e os componentes ajustam as cores sozinhos:
- `sup-clara`: branco
- `sup-suave`: fundo claro
- `sup-faixa`: o segundo fundo claro (os cartões em cima dela ficam brancos)
- `sup-marinho`: marinho
- `sup-noite`: noite

Cores semânticas para usar dentro delas: `text-sup-titulo`, `text-sup-suave`, `text-sup-icone`, `border-sup-linha`, `bg-sup`, `bg-sup-cartao`. Cada superfície também define o fundo do cartão em cima dela (`--sup-cartao`: faixa no claro, branco na faixa), o realce do hover (`--sup-cartao-realce`) e a divisória dentro do cartão (`--sup-cartao-linha`).

Ritmo das páginas (o cabeçalho e o rodapé noite são os mesmos em todas):
- Início: suave (destaque com a arte clara) → clara (já é cliente) → faixa (resumo dos planos, cartões brancos) → clara (diferenciais) → suave (chamada final).
- Planos: abertura escura → suave (cartões e aviso) → clara (comparativo).
- Onde atendemos: abertura suave (h1 e frase curta) → a seção continua no mesmo fundo (`secao--apos-abertura`), com a lista e o mapa escuro.
- Contato: abertura suave → cartões (o do WhatsApp escuro, os outros na faixa).
- 404: suave, com a arte clara.

## Tipografia

- Montserrat Variable, empacotada no site (só o subconjunto latino), com preload. É a fonte dos posts e a única do site.
- Escala: `text-rotulo` 13px (só rótulos), `text-sm` 16px (o menor texto de leitura), `text-base` 18px (corpo), `text-lg` 20px, `text-xl` 24px, `text-2xl` 28 a 36px, `text-3xl` 32 a 54px, `text-destaque` 40 a 84px.
- Pesos: destaque 800, títulos de seção 760, subtítulos 700, corpo 500. Títulos grandes com espaçamento levemente negativo (`tracking-titulo`, `tracking-destaque`).
- Rótulo (`.rotulo`): 13px, caixa alta, SemiBold, espaçamento `tracking-caixa` (0,09em), cor `sup-suave`. Para DOWNLOAD, UPLOAD, POR MÊS, CIDADES e os títulos das colunas do rodapé. Nunca para texto de leitura.
- Números (velocidade e preço) grandes e com algarismos tabulares (`.tabular`). No preço, o "R$" fica menor que o número.
- Marca-texto (`.marca-texto`): faixa amarela atrás da metade de baixo de uma palavra ou número, como nos posts. No máximo um por tela ("Missões" na Início, o "9" em Onde atendemos).
- Não tem sobretítulo acima de título.

## Informação em linhas

- `LinhasInfo`: rótulo em caixa alta à esquerda e o valor à direita, separados por divisória fina (como os cartões de lançamento editoriais). `destaque` deixa o valor grande (o preço).
- Cartão do plano: o nome grande e as linhas DOWNLOAD / UPLOAD / POR MÊS. Download e upload levam a seta para baixo e para cima, para não confundir.
- Comparativo: tabela limpa (colunas 300, 500 e 700 Mega; linhas Download, Upload e Preço por mês), nenhuma coluna destacada. No celular vira uma lista por plano com as mesmas linhas, sem rolagem lateral.
- Cidades: em linhas com divisória fina, com o marcador de sinal.

## Espaço, raio, sombra

- Espaços: escala do Tailwind (4px), mais `px-calha` (margem lateral fluida), `py-secao` e `py-secao-curta` (ritmo vertical), `spacing-toque` (52px) e `spacing-toque-lg` (60px).
- Larguras: `max-w-pagina` 76rem, `max-w-largo` 52rem, `max-w-texto` 40rem, `max-w-estreito` 30rem.
- Raios: `sm` 8px, `md` 10px (botões), `lg` 16px, `xl` 20px, `2xl` 28px (cartões, atalhos, mapa, fotos), `full`.
- Cartões sem borda e sem sombra: só o fundo de cartão da superfície. Sombras ficam para o que flutua: cabeçalho ao rolar (`topo`), painel do menu (`lg`) e WhatsApp flutuante.

## Botões

- `Botao`: variantes `primario` (marinho sólido; branco em fundo escuro), `secundario` (contorno) e `link` (texto com seta). Tamanhos `md` (52px) e `lg` (60px): nunca menores no celular.
- Sóbrio: no hover só a cor muda (camada de realce, 0,2s) e a seta → desliza. Sem elevação, sem sombra. Foco: anel de 2,5px com folga de 3px (marinho no claro, amarelo no escuro). `externo` abre em nova aba com `rel="noopener"` e aviso para leitor de tela.

## Logo

- Arquivos: `src/assets/marca/logo-infomissoes.svg` (fundo claro) e `logo-infomissoes-fundo-escuro.svg` (ruínas, torre e "PROVEDOR" em #f6f7fa, como no kit). Cerca de 19 KB cada.
- Feitos a partir da logo oficial do kit de posts, sem redesenhar: cada camada (ruins, tower, arcs, info, missoes, prov) foi vetorizada com potrace, nas cores oficiais. A bolinha da antena é um grupo próprio (`antena`) dentro da torre. Script: `scripts/marca/vetorizar-camadas.py` (+ `svgo.config.mjs`).
- Nunca redesenhar, distorcer ou recolorir as letras. Só recortar em camadas e animar. A camada `ruins` também é o traço de fundo das artes.
- Cabeçalho: versão clara, 46px de altura no celular e 60px no desktop. Rodapé: versão para fundo escuro.
- Favicon, ícone do celular, ícones do manifesto e imagem de compartilhamento (1200×630) saem das camadas: `node scripts/marca/gerar-icones.mjs` (gera em `public/`).
- Favicon: recorte da logo clara com o "M" amarelo de "Missões" e a torre com os arcos (a torre faz o "i"), nas cores e na ordem das camadas, sem redesenhar nem recolorir. Fundo: quadrado branco de cantos arredondados, para aparecer em aba clara e escura. O recorte ocupa 87% da largura e fica deslocado menos de 1/3 de pixel para cair na grade de 16px. Conferido no Chrome claro e escuro em 16 e 32px: o "M" e a torre dão para reconhecer.
- Arquivos: `favicon.svg` (o que o navegador usa), `favicon.ico` (16, 32 e 48, para o que não lê SVG), `apple-touch-icon.png` (180, quadrado branco cheio: o iPhone arredonda) e `icone-192.png`/`icone-512.png` do manifesto (quadrado cheio, recorte dentro do círculo de 80%, para servir como ícone recortável).

## Mapa (/onde-atendemos)

- `MapaCidades`: cada sede como um ponto de luz, na posição real, num cartão noite. As posições vêm de `src/data/sedes-ibge.ts` (IBGE, Cadastro de Localidades Selecionadas 2010, categoria CIDADE), copiadas sem alteração.
- As linhas ligam cada cidade à mais próxima (árvore de menor distância). São ilustrativas, não o traçado da rede, e o mapa diz isso na legenda.
- Os nomes ficam ao lado do ponto (direita, esquerda, embaixo ou em cima, o primeiro lado sem colisão).
- Cidade nova em `site.ts` sem posição em `sedes-ibge.ts`: o mapa some (o build avisa) e fica só a lista.

## Movimento

- Curvas: `ease-saida` (entradas), `ease-entrada` (saídas), `ease-suave` (ida e volta). Sem curvas de quique ou mola; o único "pulinho" é o do "Missões" na entrada da logo, feito por quadros-chave.
- Durações: `--duracao-rapida` 140ms, `--duracao-cor` 200ms (cor no hover), `--duracao-base` 220ms, `--duracao-lenta` 420ms, `--duracao-revelar` 700ms, `--atraso-sequencia` 70ms.
- Só `transform`, `opacity` e o traço em SVG (`stroke-dashoffset`) animam. Realces de hover aparecem por opacidade de uma camada. Nada de blur animado.
- Entrada ao rolar: atributo `data-revelar` (sobe 16px) ou `data-revelar="lado"`, com `style="--i:N"` para a sequência. O estado escondido só existe com `html.js`. Sem JS, tudo aparece.
- Não coloque `data-revelar` num elemento que tem transform de hover. Coloque no elemento em volta.
- `prefers-reduced-motion`: sem deslocamentos, só fades curtos. Pulsos de luz, pulso da antena e entrada da logo não acontecem.

### Arte (traço de luz)

- O pulso é um trecho curto do traço aceso (`stroke-dasharray` com `pathLength="100"`) que entra pelo começo, percorre o traço e sai pelo fim, depois uma pausa. Escura: ciclos de 8 a 12s. Clara: 13s, com a luz passando em menos da metade do ciclo.
- Poucos elementos animados: dois trechos das ruínas (cada um com um brilho largo e fraco por baixo), uma ou duas fibras, os pontos amarelos (só opacidade) e quatro linhas do mapa.
- Só anima com JS (`html.js`) e sem movimento reduzido. Para quando sai da tela: a seção tem `data-pausavel` (ou `data-destaque`) e o script põe `.is-pausado`.
- Parada (sem JS ou com movimento reduzido), a luz fica num ponto fixo de cada traço: a arte continua inteira e bonita.

### Troca de página

- View Transitions nativas entre documentos (`@view-transition { navigation: auto; }` em `global.css`), sem JavaScript e sem o ClientRouter do Astro.
- O cabeçalho (`view-transition-name: topo`) e o WhatsApp flutuante ficam parados: a imagem antiga some e a nova aparece na hora. O resto da página sai com fade e sobe 6px (160ms) e a nova entra com fade, subindo 12px (320ms).
- Navegador sem suporte: navegação normal. `prefers-reduced-motion`: a regra nem é ligada.

### Entrada da logo

- Só na primeira página aberta na sessão, seja qual for (`sessionStorage`, dentro de try/catch; se falhar, não anima), com JS e sem movimento reduzido.
- Ondas de sinal, como nos Reels: um ponto vira a antena, três ondas azuis saem dela. A 1ª revela as ruínas (círculo de recorte que cresce junto com a onda) e faz a torre crescer; a 2ª faz o "info" subir e o "Missões" dar um pulinho; a 3ª acende os arcos e sobe o "PROVEDOR DE INTERNET".
- Depois a cópia da logo voa até o lugar dela no cabeçalho (FLIP) enquanto a cobertura clara some. Total: 1,9s.
- Toque, clique, tecla ou rolagem pulam direto para o fim. A página carrega por baixo. No fim não sobra nenhum elemento por cima da logo.
- Peças: classe `intro` no `<html>` (ligada no `<head>` de `Base.astro`), script logo depois do cabeçalho (`Topo.astro`) e estilos em `global.css` ("ENTRADA DA LOGO"). Se o script falhar, a cobertura some sozinha em 3s.
- Depois de pousar: um pulso leve sai da antena do cabeçalho a cada 5,2s. Para fora da tela.

## Componentes (`src/components/ui/`)

- `Botao`: ver Botões.
- `Card`: bloco agrupado, `claro` (fundo de cartão da superfície) ou `marinho`. Cantos de 28px, sem borda e sem sombra.
- `CardPlano`: cartão do plano em linhas (ver Informação em linhas). `compacto` no resumo da Início.
- `LinhasInfo`: ver Informação em linhas.
- `ArteRuinas`: a arte de fundo (traço das ruínas, fibras e luz), `escuro` ou `claro`. Tamanho e posição pelas variáveis `--arte-largura`, `--arte-x` e `--arte-pe`. O pai precisa de position, overflow hidden e isolation.
- `MapaCidades`: ver Mapa.
- `Secao`: superfície, ritmo vertical e largura máxima.
- `CabecalhoSecao`: h2 (ou h1, com `nivel={1}`) com texto de apoio opcional.
- `Selo`: rótulo curto. Hoje sem uso (não há "mais escolhido").
- `WhatsAppFlutuante`: verde do WhatsApp (ver Exceção). Some sem número. Fica escondido enquanto algum botão grande de WhatsApp da página (`data-cta-whatsapp`) está na tela.
- `Icone`: ícones de traço 2px (estilo Lucide) mais a marca do WhatsApp. Ícone só onde ajuda a entender.
- `Foto`: só para fotos próprias da Info Missões (destaque e loja), quando houver. Sem arquivo, não gera nada no build.
- `Logo`: SVG em camadas direto no HTML (`animada` só no cabeçalho). Sem arquivo, mostra o nome em texto.
- `Pendente`: caixa tracejada "TODO", só em `npm run dev`.

## Rodapé

- Noite, logo para fundo escuro e quatro colunas: Páginas, Cidades, Contato e Área do Assinante. Títulos das colunas em rótulo.

## Não fazer

Fotos de banco ou de terceiros, ilustração genérica, clip-art, "fundo tech" (circuito, partículas, grade neon), blobs, gradiente chamativo, vidro, emoji como ícone, ícone dentro de círculo, sobretítulo acima de título, amarelo como fundo de botão, sombra pesada ou borda grossa em cartão, números ou promessas que não dá para comprovar, recriar ou recolorir a logo.
