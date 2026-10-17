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
 * - Logo: coloque em src/assets/marca/ e informe só o nome do arquivo.
 * - Fotos: coloque em src/assets/fotos/ e informe só o nome do arquivo.
 * - Favicon: coloque em public/ e informe só o nome do arquivo.
 */

export type Plano = {
  /** Nome do plano, ex.: 'Plano Casa'. */
  nome: string;
  /** Velocidade como deve aparecer, ex.: '500 Mega'. */
  velocidade: string;
  /** Preço como deve aparecer, ex.: 'R$ 99,90'. */
  preco: string;
  /** Opcional. Padrão: 'por mês'. */
  periodo?: string;
  /** Itens incluídos no plano (só o que for verdade). */
  beneficios: string[];
  /** Opcional. Texto do selo de destaque, ex.: 'Mais procurado'. */
  selo?: string;
};

export type Foto = {
  /** Nome do arquivo em src/assets/fotos/, ex.: 'loja.jpg'. */
  arquivo: string | null;
  /** Descrição da foto para leitores de tela. */
  alt: string;
};

export type Diferencial = {
  icone: 'casa' | 'local' | 'loja' | 'celular';
  titulo: string;
  texto: string;
};

export type Site = {
  nome: string;
  url: string;
  rotuloPortal: string;
  artigoPortal: 'a' | 'o';
  urlPortal: string;
  instagram: string;
  logo: string | null;
  favicon: string | null;
  whatsapp: string | null;
  telefone: string | null;
  endereco: string | null;
  horario: string | null;
  cnpj: string | null;
  cidades: string[];
  planos: Plano[];
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

  // TODO: arquivo do logo em src/assets/marca/, ex.: 'logo.svg'. Sem logo, aparece o nome em texto.
  logo: null,

  // TODO: arquivo do favicon em public/, ex.: 'favicon.svg' ou 'favicon.png'.
  favicon: null,

  // TODO: WhatsApp com DDD, ex.: '(55) 99999-9999'. Sem número, os botões de WhatsApp somem.
  whatsapp: null,

  // TODO: telefone com DDD, ex.: '(55) 3333-3333'.
  telefone: null,

  // TODO: endereço da loja, ex.: 'Rua Exemplo, 123, Centro, Santo Ângelo/RS'.
  endereco: null,

  // TODO (opcional): horário de atendimento da loja, ex.: 'Segunda a sexta, das 8h às 18h'.
  horario: null,

  // TODO: CNPJ, ex.: '00.000.000/0001-00'.
  cnpj: null,

  // TODO: cidades atendidas, ex.: ['Santo Ângelo', 'São Luiz Gonzaga'].
  cidades: [],

  // TODO: até 3 planos. NUNCA inventar velocidade, preço ou benefício.
  // Exemplo de formato:
  // { nome: 'Plano Casa', velocidade: '500 Mega', preco: 'R$ 99,90', beneficios: ['Instalação ...'], selo: 'Mais procurado' }
  planos: [],

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
    },
    {
      icone: 'celular',
      titulo: 'Conta pela internet',
      texto: '2ª via, PIX e faturas pela internet, sem sair de casa.',
    },
  ],
};
