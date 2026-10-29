# Site Info Missões

Site institucional da [Info Missões](https://infomissoes.net.br), provedor de internet por fibra óptica no Rio Grande do Sul, criado por **Murilo dos Passos Vieira** ([@MuriloDPV](https://github.com/MuriloDPV)).

No ar em https://infomissoes.net.br.

Site estático (Astro + Tailwind). O build gera HTML, CSS e fontes em `dist/`, sem servidor Node, sem segredos e sem nada de terceiros.

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

- `/` Início: destaque, as cidades atendidas logo no começo, resumo dos planos para casa, contato (atendimento e plantão), "Já é cliente?", "Soluções para cada perfil" (casa, empresa e interior, cada um levando à sua página) e diferenciais.
- `/planos/` Para sua casa: os planos para casa, as condições, o aviso, o link para as cidades e o comparativo (só no desktop).
- `/planos/empresas/` Para sua empresa: o plano empresarial (preço sob consulta, botão de proposta), um texto curto para comércios e empresas e as condições.
- `/planos/interior/` Interior: o plano rural via rádio, um texto curto sobre consultar se o sinal chega na localidade e as condições.
- As três páginas de planos têm no topo o seletor Para sua casa / Para sua empresa / Interior: parece abas, mas são links (funciona sem JS).
- `/onde-atendemos/`: as cidades e o convite "A fibra chega na sua rua?".
- `/contato/`: WhatsApp do atendimento, plantão (só WhatsApp), Instagram, e telefone e loja quando preenchidos.
- `404.html`, `sitemap.xml` e `robots.txt` também saem do build.

As páginas viram pastas (`planos/index.html`) e os links usam barra final (`/planos/`), então qualquer nginx serve sem configuração especial. Para a 404 aparecer, aponte `error_page 404 /404.html;`. O menu, o rodapé e o `sitemap.xml` saem da lista de `src/lib/navegacao.ts`; as páginas de planos (o seletor, o bloco da Início e o resto do `sitemap.xml`), de `src/lib/planos.ts`, que também tem a mensagem do WhatsApp e o texto do botão de cada categoria.

## Dados do negócio

Ficam todos num arquivo só: `src/data/site.ts`. Ali estão o nome do portal, o WhatsApp, o telefone, o endereço, o CNPJ, as cidades, os planos, o logo, o favicon, as fotos e os textos dos diferenciais.

- Planos: ficam em `planos`, separados por categoria: `casa` (residencial, fibra), `empresa` (empresarial, fibra) e `interior` (rural, via rádio). Até 3 em cada. O preço é `'R$ 99,90'` ou `'sob consulta'` (o site mostra "Preço sob consulta" e o botão de proposta). As condições (sem franquia, roteador em comodato) ficam em `condicoesPlanos` e aparecem uma vez, embaixo dos cartões; cada uma diz em `categorias` em quais páginas aparece (o roteador com ONU é de fibra, então não vai para o interior). O aviso da instalação fica em `avisoPlanos` e aparece nas três.
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

Rode antes de publicar no domínio. Falha (código de saída 1) se faltar o WhatsApp ou o telefone em `src/data/site.ts`, se algum deles não for um número com DDD, ou se algum plano estiver com dado errado (campo vazio, preço fora do formato, mais de 3 numa categoria), e avisa que o site não está pronto. Com tudo certo, sai com 0 e mostra quantos planos há em cada categoria.

## Logo, favicon e imagem de compartilhamento

A logo em camadas (`src/assets/marca/`) foi vetorizada da logo oficial do kit de posts por `scripts/marca/vetorizar-camadas.py` (Python com numpy, pillow, scipy e potracer; depois `svgo` com `scripts/marca/svgo.config.mjs`). Favicon, ícones do celular e a imagem de compartilhamento saem dela:

```bash
node scripts/marca/gerar-icones.mjs
```

## Design

Tokens, componentes, regras de uso, a arte desenhada por código (traço das ruínas + fibra de luz) e a animação de entrada da logo estão em `DESIGN.md`.

## Autor

Criado e desenvolvido por **Murilo dos Passos Vieira** ([@MuriloDPV](https://github.com/MuriloDPV)).
