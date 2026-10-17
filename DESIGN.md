# Design system — Info Missões (v2)

O provedor da cidade: confiável e fácil de usar. Fundo claro e calmo, títulos grandes, muito espaço, poucas cores por tela. Feito para ler no celular e por gente de qualquer idade.

Tokens: `src/styles/global.css` (bloco `@theme`). Os padrões do Tailwind foram limpos, então só existem os tokens abaixo. Nas páginas não entra valor solto (`text-[17px]`, `#hex`, `bg-red-500`).

## Cores

Oficiais (as mesmas da logo e dos posts aprovados):
- `marinho` #1a2d6d: títulos, botão primário, faixas fortes
- `noite` #081029: rodapé
- `azul` #0199da: ícones, ondas de sinal e detalhes
- `amarelo` #f7c12d: botão de destaque, marca-texto, foco em fundo escuro
- `cinza` #363435: texto do corpo
- `fundo` #f4f8fc: fundo claro padrão
- `branco` #ffffff

Tons derivados (misturas do marinho com branco ou com noite, nenhuma cor nova):
- `marinho-100` #e4e6ed, `marinho-200` #cdd1df: linhas e contornos
- `marinho-300` #a3abc5: texto secundário no rodapé (8:1 sobre noite)
- `marinho-600` #536292: texto secundário em fundo claro (5,6:1 sobre fundo, 6:1 sobre branco)
- `marinho-800` #12204e: hover do marinho

Exceção:
- `whatsapp` #25d366: verde oficial do WhatsApp. Só no botão flutuante, com o símbolo branco e o rótulo `noite` (9,5:1). Os outros botões de WhatsApp seguem a paleta.

Regras de contraste (todo texto passa em WCAG AA; o menor par usado é 5,6:1):
- `azul` não é cor de texto pequeno. Sobre branco dá 3,2:1 e sobre o fundo claro 3,0:1: só ícone, detalhe ou título de 24px ou mais sobre branco.
- `amarelo` nunca é texto sobre fundo claro. Amarelo é fundo, e o texto em cima dele é sempre `marinho` (7,7:1).

## Superfícies

Cada seção escolhe uma superfície, e os componentes ajustam as cores sozinhos:
- `sup-clara`: branco
- `sup-suave`: fundo claro
- `sup-marinho`: marinho
- `sup-noite`: noite

Cores semânticas para usar dentro delas: `text-sup-titulo`, `text-sup-suave`, `text-sup-icone`, `border-sup-linha`, `bg-sup`.

Ritmo das páginas (o cabeçalho e o rodapé noite são os mesmos em todas):
- Início: suave (destaque) → clara (já é cliente) → marinho (resumo dos planos) → clara (diferenciais) → suave (chamada final).
- Planos: abertura → suave (cartões e aviso) → clara (comparativo).
- Onde atendemos e Contato: abertura suave (h1 e frase curta) → a seção continua no mesmo fundo (`secao--apos-abertura`).
- 404: suave, com o código, o título e os caminhos de volta.

## Tipografia

- Montserrat Variable, empacotada no site (só o subconjunto latino), com preload. É a fonte dos posts.
- Escala: `text-sm` 16px (o menor tamanho permitido), `text-base` 18px (corpo), `text-lg` 20px, `text-xl` 24px, `text-2xl` 28 a 36px, `text-3xl` 32 a 54px, `text-destaque` 40 a 84px.
- Pesos: destaque 800, títulos de seção 760, subtítulos 700, corpo 500. Títulos com espaçamento negativo (`tracking-titulo`, `tracking-destaque`).
- Marca-texto (`.marca-texto`): faixa amarela atrás da metade de baixo de uma palavra, como nos posts. No máximo um por tela (hoje só "Missões", no destaque).

## Espaço, raio, sombra

- Espaços: escala do Tailwind (4px), mais `px-calha` (margem lateral fluida), `py-secao` e `py-secao-curta` (ritmo vertical), `spacing-toque` (52px) e `spacing-toque-lg` (60px).
- Larguras: `max-w-pagina` 76rem, `max-w-largo` 52rem, `max-w-texto` 40rem.
- Raios: `sm` 8px, `md` 12px (botões), `lg` 16px (cidades), `xl` 20px (atalhos), `2xl` 28px (cartões e blocos), `full`.
- Sombras com tom marinho e deslocamento para baixo: `sm`, `md`, `lg`, `botao` (elevação do hover), `topo`.

## Logo

- Arquivos: `src/assets/marca/logo-infomissoes.svg` (fundo claro) e `logo-infomissoes-fundo-escuro.svg` (ruínas, torre e "PROVEDOR" em #f6f7fa, como no kit). Cerca de 19 KB cada.
- Feitos a partir da logo oficial do kit de posts, sem redesenhar: cada camada (ruins, tower, arcs, info, missoes, prov) foi vetorizada com potrace, nas cores oficiais. A bolinha da antena é um grupo próprio (`antena`) dentro da torre. Script: `scripts/marca/vetorizar-camadas.py` (+ `svgo.config.mjs`).
- Nunca redesenhar, distorcer ou recolorir as letras. Só recortar em camadas e animar.
- Cabeçalho: versão clara, 46px de altura no celular e 60px no desktop. Rodapé: versão para fundo escuro.
- Favicon, ícone do celular, ícones do manifesto e imagem de compartilhamento (1200×630) saem das camadas: `node scripts/marca/gerar-icones.mjs` (gera em `public/`).

## Movimento

- Curvas: `ease-saida` (entradas), `ease-entrada` (saídas), `ease-suave` (ida e volta). Sem curvas de quique ou mola; o único "pulinho" é o do "Missões" na entrada da logo, feito por quadros-chave.
- Durações: `--duracao-rapida` 140ms, `--duracao-base` 220ms, `--duracao-lenta` 420ms, `--duracao-revelar` 700ms, `--atraso-sequencia` 70ms.
- Só `transform` e `opacity` animam (e o traço das ondas em SVG). Sombras e realces de hover aparecem por opacidade de uma camada.
- Entrada ao rolar: atributo `data-revelar` (sobe 16px) ou `data-revelar="lado"`, com `style="--i:N"` para a sequência. O estado escondido só existe com `html.js`. Sem JS, tudo aparece.
- Não coloque `data-revelar` num elemento que tem transform de hover. Coloque no elemento em volta.
- `prefers-reduced-motion`: sem deslocamentos, só fades curtos. Ondas, pulso e entrada da logo não acontecem.

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

### Ondas de sinal

- Componente `Ondas`: círculos finos em azul saindo de um ponto, como na antena da logo. Fundo do destaque (com um pulso de vez em quando, que para fora da tela) e da faixa de planos.
- Marcador de sinal (ícone `sinal`) nas cidades atendidas.
- Linha fina com um trecho azul no começo, em cima de cada diferencial.

## Componentes (`src/components/ui/`)

- `Botao`: variantes `primario` (marinho; branco em fundo escuro), `destaque` (amarelo com texto marinho), `secundario` (contorno) e `link` (texto com seta). Tamanhos `md` (52px) e `lg` (60px). Hover: sobe 2px, a sombra aparece e a seta desliza. Pressionado: encolhe um pouco. Foco: anel de 2,5px com folga de 3px (marinho no claro, amarelo no escuro). `externo` abre em nova aba com `rel="noopener"` e aviso para leitor de tela.
- `Card`: superfície elevada, `claro` ou `marinho`. `interativo` sobe 4px no hover.
- `Secao`: superfície, ritmo vertical e largura máxima.
- `CabecalhoSecao`: h2 (ou h1, com `nivel={1}`) com texto de apoio opcional. Não tem sobretítulo.
- `Ondas`: ver acima.
- `Selo`: rótulo curto, `amarelo`, `marinho` ou `suave`.
- `WhatsAppFlutuante`: verde do WhatsApp (ver Exceção). Some sem número. Fica escondido enquanto algum botão grande de WhatsApp da página (`data-cta-whatsapp`) está na tela.
- `Icone`: ícones de traço 2px (estilo Lucide) mais a marca do WhatsApp. Ícone só onde ajuda a entender.
- `Foto`: proporção reservada. Sem arquivo, não gera nada no build.
- `Logo`: SVG em camadas direto no HTML (`animada` só no cabeçalho). Sem arquivo, mostra o nome em texto.
- `Pendente`: caixa tracejada "TODO", só em `npm run dev`.

## Não fazer

Ilustração genérica, clip-art, blobs, gradiente chamativo, vidro, emoji como ícone, ícone dentro de círculo, sobretítulo acima de título, números ou promessas que não dá para comprovar, recriar ou recolorir a logo.
