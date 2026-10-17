# Site Info Missões

Site institucional estático (Astro + Tailwind). O build gera HTML, CSS e fontes em `dist/`, sem servidor Node, sem segredos e sem nada de terceiros.

Precisa de Node 22.22 ou mais novo.

## Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:4321. No modo dev, cada dado que falta aparece como uma caixa tracejada "TODO".

## Build

```bash
npm run build
npm run preview
```

`npm run build` gera `dist/`. `npm run preview` mostra o build como ele vai para o ar: sem TODO, e com o que falta escondido ou trocado por um texto neutro.

## Dados do negócio

Ficam todos num arquivo só: `src/data/site.ts`. Ali estão o nome do portal, o WhatsApp, o telefone, o endereço, o CNPJ, as cidades, os planos, o logo, o favicon, as fotos e os textos dos diferenciais.

- Logo: coloque o arquivo em `src/assets/marca/` e escreva só o nome em `logo` (e a versão para fundo escuro em `logoFundoEscuro`). Em SVG com camadas, a logo do cabeçalho anima na primeira visita.
- Fotos: coloque em `src/assets/fotos/` e escreva só o nome em `fotos.destaque` (4:5, em pé) ou `fotos.loja` (4:3, deitada).
- Favicon: coloque em `public/` e escreva só o nome em `favicon`.

Se um dado preenchido estiver errado (número sem DDD, arquivo que não existe), o build para com erro em vez de publicar link ou imagem quebrada.

## O que falta

```bash
npm run todos
```

Lista no terminal os dados que ainda faltam em `src/data/site.ts`.

Sem endereço da loja, somem o item "Loja" do contato e o diferencial "Loja para atender você".

## Pronto para o domínio?

```bash
npm run pronto
```

Rode antes de publicar no domínio. Falha (código de saída 1) se faltar o WhatsApp ou o telefone em `src/data/site.ts`, ou se algum deles não for um número com DDD, e avisa que o site não está pronto. Com os dois preenchidos, sai com 0.

## Logo, favicon e imagem de compartilhamento

A logo em camadas (`src/assets/marca/`) foi vetorizada da logo oficial do kit de posts por `scripts/marca/vetorizar-camadas.py` (Python com numpy, pillow, scipy e potracer; depois `svgo` com `scripts/marca/svgo.config.mjs`). Favicon, ícones do celular e a imagem de compartilhamento saem dela:

```bash
node scripts/marca/gerar-icones.mjs
```

## Design

Tokens, componentes, regras de uso e a animação de entrada da logo estão em `DESIGN.md`.
