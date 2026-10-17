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

export function cnpjValido(texto: string | null): boolean {
  return !!texto && digitos(texto).length === 14;
}
