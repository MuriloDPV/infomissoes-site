// Funções puras de formatação/validação. Usadas pelo site e pelo `npm run todos`.

export function digitos(texto: string): string {
  return texto.replace(/\D/g, '');
}

/**
 * Número brasileiro completo (55 + DDD + número) ou null se não for válido.
 * Aceita fixo (DDD + 8 dígitos começando com 2 a 5) ou celular (DDD + 9 dígitos começando com 9).
 */
export function numeroBR(texto: string | null): string | null {
  if (!texto) return null;
  const d = digitos(texto);
  const completo = d.startsWith('55') && d.length >= 12 ? d : `55${d}`;
  return /^55[1-9][1-9](?:[2-5]\d{7}|9\d{8})$/.test(completo) ? completo : null;
}

export function linkWhatsApp(numero: string | null, mensagem?: string): string | null {
  const n = numeroBR(numero);
  if (!n) return null;
  return `https://wa.me/${n}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''}`;
}

export function linkTelefone(numero: string | null): string | null {
  const n = numeroBR(numero);
  return n ? `tel:+${n}` : null;
}

/** Valor de um preço no padrão brasileiro ("R$ 85,90" → "85,90") ou null se não estiver nesse formato. */
export function valorPreco(texto: string | null | undefined): string | null {
  const m = /^R\$\s?((?:\d{1,3}(?:\.\d{3})+|\d+),\d{2})$/.exec(texto?.trim() ?? '');
  return m ? m[1] : null;
}

/** Junta itens como no texto: "a, b e c" (ou "a, b ou c"). */
export function porExtenso(itens: string[], conjuncao: 'e' | 'ou' = 'e'): string {
  return itens.length <= 1 ? (itens[0] ?? '') : `${itens.slice(0, -1).join(', ')} ${conjuncao} ${itens.at(-1)}`;
}

export function cnpjValido(texto: string | null): boolean {
  return !!texto && digitos(texto).length === 14;
}
