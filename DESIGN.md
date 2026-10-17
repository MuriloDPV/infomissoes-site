# Design system — Info Missões

O provedor da cidade: confiável e fácil de usar. Limpo e espaçoso, feito para ler no celular e por gente de qualquer idade.

Tokens: `src/styles/global.css` (bloco `@theme`). Os padrões do Tailwind foram limpos, então só existem os tokens abaixo. Nas páginas não entra valor solto (`text-[17px]`, `#hex`, `bg-red-500`).

## Cores

Marca:
- `azul` #1a2d6d: principal, títulos, fundos fortes
- `amarelo` #f1d214: destaque e fundo de botão primário
- `amarelo-claro` #f8f052: hover do amarelo, seleção de texto, brilho da fibra
- `branco` #ffffff
- `escuro` #0f172a: texto do corpo e rodapé

Tons derivados (misturas do azul/escuro com branco, nenhuma cor nova):
- `azul-50`, `azul-100`, `azul-200`, `azul-300`: fundos suaves e linhas
- `azul-600`: texto secundário em fundo claro (7,4:1)
- `azul-800`, `azul-900`: hover e fundo mais fundo
- `escuro-300`, `escuro-700`, `escuro-800`: texto secundário e linhas no rodapé

Regras:
- Amarelo nunca é cor de texto sobre branco. Amarelo é fundo, com texto `azul` (8,5:1) ou `escuro`.
- Todo texto passa em WCAG AA. Os pares usados ficam entre 6,8:1 e 17,9:1.

## Superfícies

Cada seção escolhe uma superfície, e os componentes ajustam as cores sozinhos:
- `sup-clara`: branco
- `sup-tinta`: azul-50
- `sup-azul`: azul
- `sup-amarela`: amarelo
- `sup-escura`: escuro

Cores semânticas para usar dentro delas: `text-sup-titulo`, `text-sup-suave`, `text-sup-icone`, `border-sup-linha`, `bg-sup`.

Ritmo da página: azul (destaque) → branco → tinta → branco → azul → amarelo → branco → escuro (rodapé).

## Tipografia

- Montserrat Variable, empacotada no site. Só o subconjunto latino (cobre o português), com preload.
- Escala: `text-sm` 16px (o menor tamanho permitido), `text-base` 18px (corpo), `text-lg` 20px, `text-xl` 24px, `text-2xl` 28 a 36px, `text-3xl` 32 a 48px, `text-destaque` 36 a 72px.
- Títulos em peso 800 com espaçamento `tracking-titulo`. Corpo em peso 500.

## Espaço, raio, sombra

- Espaços: escala do Tailwind (4px), mais `px-calha` (margem lateral fluida), `py-secao` e `py-secao-curta` (ritmo vertical) e `spacing-toque` (56px, altura mínima de toque).
- Larguras: `max-w-pagina` 76rem, `max-w-largo` 52rem, `max-w-texto` 40rem.
- Raios: `sm` 6px, `md` 12px (botões), `lg` 16px, `xl` 24px (cards e fotos), `full`.
- Sombras com tom azul e deslocamento: `sm`, `md`, `lg`, `topo`.
- Fotos: `aspect-retrato` (4:5) e `aspect-paisagem` (4:3).

## Movimento

- Curvas: `ease-saida` (entradas), `ease-entrada` (saídas), `ease-suave` (sinal da fibra).
- Durações: `--duracao-rapida` 150ms, `--duracao-base` 250ms, `--duracao-lenta` 450ms, `--duracao-revelar` 600ms, `--atraso-sequencia` 90ms.
- Só `transform` e `opacity` animam. Sombras e realces de hover aparecem por opacidade de uma camada.
- Entrada ao rolar: atributo `data-revelar` (sobe) ou `data-revelar="lado"`, com `style="--i:N"` para a sequência. O estado escondido só existe com `html.js`. Sem JS, tudo aparece.
- Não coloque `data-revelar` num elemento que tem transform de hover. Coloque no elemento em volta.
- `prefers-reduced-motion`: sem deslocamentos, só fades curtos. O sinal da fibra some e o cabeçalho muda sem transição.
- Detalhe marcante: fios de fibra em leque no fundo do destaque, com um pulso de luz amarela que passa de vez em quando. Pausa quando sai da tela.

## Componentes (`src/components/ui/`)

- `Botao`: variantes `primario` (amarelo), `secundario` (azul cheio no claro, contorno branco no azul) e `fantasma`. Tamanhos `md` (56px) e `lg` (64px). `externo` abre em nova aba com `rel="noopener"` e aviso para leitor de tela.
- `Card`: superfície elevada, `claro` ou `azul`. `interativo` sobe 4px no hover.
- `Secao`: superfície, ritmo vertical e largura máxima.
- `CabecalhoSecao`: h2 com texto de apoio opcional. Não tem sobretítulo.
- `Selo`: rótulo curto, `amarelo`, `azul` ou `suave`.
- `WhatsAppFlutuante`: some sem número. Entra quando o botão de WhatsApp do destaque sai da tela.
- `Icone`: ícones de traço 2px (estilo Lucide) mais a marca do WhatsApp. Ícone só onde ajuda a entender.
- `Foto`: proporção reservada. Sem arquivo, não gera nada no build.
- `Logo`: sem arquivo, mostra o nome em texto.
- `Pendente`: caixa tracejada "TODO", só em `npm run dev`.

## Não fazer

Ilustração genérica, blobs, gradiente roxo ou neon, vidro, emoji como ícone, ícone dentro de círculo, sobretítulo acima de título, números ou promessas que não dá para comprovar.
