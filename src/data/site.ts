/**
 * TODOS os dados do negócio ficam neste arquivo.
 *
 * Regras:
 * - Campo desconhecido fica `null` (ou lista vazia) com um comentário TODO.
 * - Em `npm run dev` o site mostra uma caixa tracejada "TODO" onde o dado vai.
 * - No build, o que estiver faltando some ou vira um texto neutro e verdadeiro.
 * - `npm run todos` lista no terminal o que ainda falta.
 *
 * Arquivos de imagem:
 * - Logo: coloque em src/assets/marca/ e informe só o nome do arquivo. Em SVG com camadas
 *   (grupos ruins, tower, arcs, info, missoes, prov), a logo do cabeçalho ganha a animação de entrada.
 * - Fotos: coloque em src/assets/fotos/ e informe só o nome do arquivo.
 * - Favicon: coloque em public/ e informe só o nome do arquivo.
 */

export type Plano = {
  /** Nome do plano. Aparece no cartão e na mensagem do WhatsApp ("Tenho interesse no plano ..."). */
  nome: string;
  /** Velocidade de download, como deve aparecer. */
  download: string;
  /** Velocidade de upload, como deve aparecer. null = ainda não informado: a linha de upload não aparece. */
  upload: string | null;
  /**
   * Preço por mês: "R$", espaço e o valor com vírgula e dois centavos.
   * Ou 'sob consulta': o cartão mostra "Preço sob consulta" (nunca "R$ Consulte").
   */
  preco: `R$ ${string}` | 'sob consulta';
  /** Opcional. Padrão: 'por mês'. */
  periodo?: string;
  /** Opcional. Itens incluídos no plano (só o que for verdade). Sem itens, a lista não aparece. */
  beneficios?: string[];
  /** Opcional. Texto de um selo de destaque no cartão. */
  selo?: string;
};

export type Foto = {
  /** Nome do arquivo em src/assets/fotos/. */
  arquivo: string | null;
  /** Descrição da foto para leitores de tela. */
  alt: string;
};

export type Planos = {
  /** Para sua casa (residencial): página /planos/ e o resumo da Início. */
  casa: Plano[];
  /** Para sua empresa (empresarial): página /planos/empresas/. */
  empresa: Plano[];
  /** Interior (rural): página /planos/interior/. */
  interior: Plano[];
};

export type Condicao = {
  icone: 'infinito' | 'wifi';
  texto: string;
  /** Em quais categorias a condição aparece. O interior é via rádio: nada de fibra nem ONU nele. */
  categorias: (keyof Planos)[];
};

export type Diferencial = {
  icone: 'casa' | 'local' | 'loja' | 'celular';
  titulo: string;
  texto: string;
  /** Só aparece se `endereco` estiver preenchido. */
  soComEndereco?: boolean;
};

export type Site = {
  nome: string;
  url: string;
  rotuloPortal: string;
  artigoPortal: 'a' | 'o';
  urlPortal: string;
  instagram: string;
  logo: string | null;
  logoFundoEscuro: string | null;
  favicon: string | null;
  whatsapp: string | null;
  /** Nome do WhatsApp principal nos cartões de contato. */
  rotuloWhatsapp: string;
  /** WhatsApp do plantão (só mensagem, não atende ligação). */
  plantao: string | null;
  mensagemWhatsapp: string;
  telefone: string | null;
  endereco: string | null;
  horario: string | null;
  cnpj: string | null;
  /** Razão social que aparece no rodapé junto com o CNPJ. */
  razaoSocial: string | null;
  cidades: string[];
  planos: Planos;
  /** Condições dos planos, cada uma nas suas categorias. Aparecem uma vez, embaixo dos cartões. */
  condicoesPlanos: Condicao[];
  avisoPlanos: string;
  fotos: { destaque: Foto; loja: Foto };
  diferenciais: Diferencial[];
};

export const site: Site = {
  nome: 'Info Missões',
  url: 'https://infomissoes.net.br',

  // A CONFIRMAR: nome do botão/portal do cliente. Muda em todo o site de uma vez.
  rotuloPortal: 'Área do Assinante',
  // Artigo do nome acima, para as frases ficarem certas: 'a' (a Área, a Central) ou 'o' (o Portal).
  artigoPortal: 'a',
  // Portal da 7az (2ª via, PIX e faturas).
  urlPortal: 'https://infomissoes.pix.7az.com.br/login',

  instagram: 'https://instagram.com/infomissoesnet',

  // Logo oficial em camadas (src/assets/marca/). Sem logo, aparece o nome em texto.
  logo: 'logo-infomissoes.svg',
  // Versão para fundo escuro (ruínas em branco), usada no rodapé.
  logoFundoEscuro: 'logo-infomissoes-fundo-escuro.svg',

  // Favicon em public/ ("M" de Missões e a torre com o sinal, recortados da logo).
  favicon: 'favicon.svg',

  // WhatsApp com DDD, como aparece na página. Aceita fixo (DDD + 8 dígitos) ou celular (DDD + 9 dígitos).
  // Sem número, os botões de WhatsApp somem. É o número de TODOS os botões de WhatsApp do site.
  // Atendimento de São Luiz Gonzaga (Murilo, 29/10/2026).
  whatsapp: '(55) 98409-1659',
  rotuloWhatsapp: 'Atendimento São Luiz Gonzaga',

  // Plantão: só WhatsApp, NÃO atende ligação (Murilo, 29/10/2026). Aparece no contato e no rodapé.
  plantao: '(55) 3365-1025',

  // Mensagem que já vem escrita quando a pessoa abre o WhatsApp por qualquer botão do site.
  mensagemWhatsapp: 'Olá! Vim pelo site da Info Missões.',

  // Telefone para ligação. Tirado do site em 29/10/2026 (Murilo): o 3365-1025 é só WhatsApp (plantão).
  telefone: null,

  // Endereço da loja (Google Maps, 28/10/2026).
  endereco: 'Av. Senador Pinheiro Machado, 2840 - Centro, São Luiz Gonzaga/RS',

  // Horário da loja (Google Maps, 28/10/2026). A CONFIRMAR o sábado.
  horario: 'Segunda a sexta, 8h às 12h e 13h30 às 18h · Sábado, 8h às 18h',

  // CNPJ da matriz (Receita: INFO MISSOES NET LTDA, Roque Gonzales/RS).
  cnpj: '08.853.712/0001-65',
  razaoSocial: 'Info Missões Net Ltda',

  // Cidades atendidas, na ordem em que aparecem no site.
  cidades: [
    'Pirapó',
    'Roque Gonzales',
    'Dezesseis de Novembro',
    'São Nicolau',
    'Rolador',
    'Santo Antônio das Missões',
    'Itacurubi',
    'Bossoroca',
    'São Luiz Gonzaga',
    // Nova em 29/10/2026 (Murilo).
    'São Borja',
  ],

  // Planos por categoria, na ordem em que aparecem (até 4 em cada). Só o que a Info Missões informou:
  // NUNCA inventar velocidade, preço, benefício, selo ou condição.
  planos: {
    // Para sua casa: 100% fibra óptica. 1 Giga confirmado pelo Murilo em 29/10/2026 (post de 24/04 no Instagram).
    casa: [
      { nome: '300 Mega', download: '300 Mega', upload: '300 Mega', preco: 'R$ 85,90' },
      { nome: '500 Mega', download: '500 Mega', upload: '250 Mega', preco: 'R$ 99,90' },
      { nome: '700 Mega', download: '700 Mega', upload: '400 Mega', preco: 'R$ 120,90' },
      // Upload do 1 Giga: 500 Mega, como estava no site antigo ("1 GIGA: até 1024 Mbps / até 500 Mbps"), visto em 29/10/2026.
      { nome: '1 Giga', download: '1 Giga', upload: '500 Mega', preco: 'R$ 179,90' },
    ],
    // Para sua empresa: 100% fibra óptica. Preço sob consulta (botão "Pedir proposta no WhatsApp").
    empresa: [{ nome: '600 Mega Empresarial', download: '600 Mega', upload: '600 Mega', preco: 'sob consulta' }],
    // Interior: via RÁDIO, não é fibra (não escrever "fibra" neste plano).
    interior: [{ nome: '20 Mega Rural', download: '20 Mega', upload: '10 Mega', preco: 'R$ 99,90' }],
  },

  // Condições dos planos. `categorias` diz em quais páginas cada uma aparece (casa, empresa, interior).
  condicoesPlanos: [
    { icone: 'infinito', texto: 'Sem franquia de dados.', categorias: ['casa', 'empresa', 'interior'] },
    {
      icone: 'wifi',
      texto: 'Roteador Wi-Fi com ONU integrada em comodato, sem custo adicional enquanto durar a assinatura.',
      // ONU é equipamento de fibra: não vale para o interior (via rádio).
      categorias: ['casa', 'empresa'],
    },
  ],

  // Aviso fixo que aparece embaixo dos planos.
  avisoPlanos: 'Consulte as condições de instalação no WhatsApp.',

  fotos: {
    // TODO: foto do destaque (proporção 4:5, em pé). Ex.: equipe instalando, técnico, cidade.
    destaque: { arquivo: null, alt: 'Equipe da Info Missões' },
    // TODO: foto da fachada da loja (proporção 4:3, deitada).
    loja: { arquivo: null, alt: 'Fachada da loja da Info Missões' },
  },

  // A CONFIRMAR: textos curtos e honestos. Sem números nem promessas que não dá para comprovar.
  diferenciais: [
    {
      icone: 'casa',
      titulo: 'Fibra óptica',
      texto: 'A internet chega até a sua casa por cabo de fibra óptica.',
    },
    {
      icone: 'local',
      titulo: 'Gente da região',
      texto: 'Somos das Missões. Quem atende você conhece a sua cidade.',
    },
    {
      icone: 'loja',
      titulo: 'Loja para atender você',
      texto: 'Prefere resolver pessoalmente? Venha conversar na nossa loja.',
      // Sem endereço da loja, este diferencial não aparece no site.
      soComEndereco: true,
    },
  ],
};
