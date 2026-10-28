// Categorias de planos: uma página para cada (/planos/, /planos/empresas/, /planos/interior/).
// O seletor das páginas de planos, o bloco "Soluções para cada perfil" da Início e o sitemap.xml saem desta lista.
// Os planos de cada categoria ficam em src/data/site.ts (site.planos.casa, .empresa e .interior).
import { site, type Plano, type Planos } from '../data/site.ts';
import { porExtenso, SOB_CONSULTA } from './contato.ts';

export type ChaveCategoria = keyof Planos;

export type Categoria = {
  chave: ChaveCategoria;
  href: string;
  /** Nome no seletor e no cartão da Início. */
  rotulo: string;
  /** Nome no seletor no celular (o leitor de tela ouve sempre o `rotulo`). */
  curto: string;
  /** Como a internet chega. O interior é via rádio: nunca "fibra". */
  tecnologia: string;
  icone: 'casa' | 'loja' | 'sinal';
  /** Frase depois da mensagem padrão do WhatsApp, no botão de cada plano. */
  mensagem: (p: Plano) => string;
  /** Texto do botão de cada plano (com WhatsApp). */
  acao: string;
};

export const categorias: Categoria[] = [
  {
    chave: 'casa',
    href: '/planos/',
    rotulo: 'Para sua casa',
    curto: 'Casa',
    tecnologia: '100% fibra óptica',
    icone: 'casa',
    mensagem: (p) => `Tenho interesse no plano ${p.nome}.`,
    acao: 'Quero este plano',
  },
  {
    chave: 'empresa',
    href: '/planos/empresas/',
    rotulo: 'Para sua empresa',
    curto: 'Empresa',
    tecnologia: '100% fibra óptica',
    icone: 'loja',
    mensagem: (p) => `Quero uma proposta do plano ${p.nome}.`,
    acao: 'Pedir proposta no WhatsApp',
  },
  {
    chave: 'interior',
    href: '/planos/interior/',
    rotulo: 'Interior',
    curto: 'Interior',
    tecnologia: 'Internet via rádio',
    icone: 'sinal',
    mensagem: (p) => `Quero saber se o plano ${p.nome} chega na minha localidade.`,
    acao: 'Consultar no WhatsApp',
  },
];

export const categoria = (chave: ChaveCategoria) => categorias.find((c) => c.chave === chave)!;

/** Os planos de uma categoria, até 3 (o layout foi feito para até 3). */
export const planosDa = (chave: ChaveCategoria) => site.planos[chave].slice(0, 3);

/** As condições que aparecem numa categoria (cada condição diz as suas em `categorias`). */
export const condicoesDa = (chave: ChaveCategoria) => site.condicoesPlanos.filter((c) => c.categorias.includes(chave));

/** Número e unidade juntos na mesma linha ("300 Mega", "R$ 99,90"). */
const semQuebra = (texto: string) => texto.replace(/(\d|R\$) /g, '$1 ');

/** Uma frase para o cartão da Início: a tecnologia, os planos e, com um plano só, o preço. */
export function resumo(c: Categoria): string {
  const planos = planosDa(c.chave);
  if (planos.length === 0) return `${c.tecnologia}. Consulte os planos.`;
  if (planos.length > 1) return semQuebra(`${c.tecnologia}, com planos de ${porExtenso(planos.map((p) => p.nome))}.`);
  const [p] = planos;
  const preco = p.preco === SOB_CONSULTA ? 'e preço sob consulta' : `por ${p.preco} por mês`;
  return semQuebra(`${c.tecnologia}, com o plano ${p.nome} ${preco}.`);
}
