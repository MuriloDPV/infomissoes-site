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

## Páginas

- `/` Início: destaque, "Já é cliente?", resumo dos planos, diferenciais e chamada para o WhatsApp.
- `/planos/`: os planos completos, o comparativo, o aviso das condições e o link para as cidades.
- `/onde-atendemos/`: as cidades e o convite "A fibra chega na sua rua?".
- `/contato/`: WhatsApp, Instagram, e telefone e loja quando preenchidos.
- `404.html`, `sitemap.xml` e `robots.txt` também saem do build.

As páginas viram pastas (`planos/index.html`) e os links usam barra final (`/planos/`), então qualquer nginx serve sem configuração especial. Para a 404 aparecer, aponte `error_page 404 /404.html;`. O menu, o rodapé e o `sitemap.xml` saem da lista de `src/lib/navegacao.ts`.

## Dados do negócio

Ficam todos num arquivo só: `src/data/site.ts`. Ali estão o nome do portal, o WhatsApp, o telefone, o endereço, o CNPJ, as cidades, os planos, o logo, o favicon, as fotos e os textos dos diferenciais.

- Logo: coloque o arquivo em `src/assets/marca/` e escreva só o nome em `logo` (e a versão para fundo escuro em `logoFundoEscuro`). Em SVG com camadas, a logo do cabeçalho anima na primeira visita.
- Fotos: só fotos próprias da Info Missões. Coloque em `src/assets/fotos/` e escreva só o nome em `fotos.destaque` (4:5, em pé) ou `fotos.loja` (4:3, deitada). As imagens de fundo do site não são fotos: são desenhadas por código a partir da logo (ver `DESIGN.md`).
- Mapa das cidades: a posição de cada sede fica em `src/data/sedes-ibge.ts` (IBGE, Cadastro de Localidades 2010). Cidade nova em `site.ts` precisa da posição lá, senão o mapa some e fica só a lista.
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

Tokens, componentes, regras de uso, a arte desenhada por código (traço das ruínas + fibra de luz) e a animação de entrada da logo estão em `DESIGN.md`.
