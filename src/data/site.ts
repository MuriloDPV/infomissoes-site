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
  /** Velocidade de upload, como deve aparecer. */
  upload: string;
  /** Preço por mês: "R$", espaço e o valor com vírgula e dois centavos. */
  preco: string;
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
  mensagemWhatsapp: string;
  telefone: string | null;
  endereco: string | null;
  horario: string | null;
  cnpj: string | null;
  cidades: string[];
  planos: Plano[];
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
  // Sem número, os botões de WhatsApp somem.
  whatsapp: '(55) 3365-1025',

  // Mensagem que já vem escrita quando a pessoa abre o WhatsApp por qualquer botão do site.
  mensagemWhatsapp: 'Olá! Vim pelo site da Info Missões.',

  // Telefone com DDD, no mesmo formato do WhatsApp. É o mesmo número (fixo, atende ligação).
  telefone: '(55) 3365-1025',

  // TODO: endereço da loja: rua, número, bairro e cidade/UF.
  endereco: null,

  // TODO (opcional): horário de atendimento da loja: dias e horas.
  horario: null,

  // TODO: CNPJ, com 14 dígitos (com ou sem pontuação).
  cnpj: null,

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
  ],

  // Planos, na ordem em que aparecem (até 3). Só o que a Info Missões informou:
  // NUNCA inventar velocidade, preço, benefício, selo ou condição.
  planos: [
    { nome: '300 Mega', download: '300 Mega', upload: '300 Mega', preco: 'R$ 85,90' },
    { nome: '500 Mega', download: '500 Mega', upload: '250 Mega', preco: 'R$ 99,90' },
    { nome: '700 Mega', download: '700 Mega', upload: '400 Mega', preco: 'R$ 120,90' },
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
