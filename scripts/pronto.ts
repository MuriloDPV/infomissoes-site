// npm run pronto — diz se o site pode ir para o domínio.
// Falha (código de saída 1) se faltar WhatsApp ou telefone, ou se algum deles não for um número com DDD.
import { site } from '../src/data/site.ts';
import { numeroBR } from '../src/lib/contato.ts';

const problemas: string[] = [];

for (const [campo, nome] of [
  ['whatsapp', 'WhatsApp'],
  ['telefone', 'telefone'],
] as const) {
  const valor = site[campo];
  if (!valor) problemas.push(`falta o ${nome} (${campo})`);
  else if (!numeroBR(valor)) problemas.push(`o ${nome} "${valor}" não parece um número com DDD (${campo})`);
}

if (problemas.length > 0) {
  console.error('O site NÃO está pronto para ir ao domínio.\n');
  for (const p of problemas) console.error(`  - ${p}`);
  console.error('\nPreencha em src/data/site.ts e rode de novo. Para ver tudo o que falta: npm run todos');
  process.exitCode = 1;
} else {
  console.log('Pronto: WhatsApp e telefone preenchidos. O site pode ir para o domínio.');
  console.log('Para conferir o resto do que falta: npm run todos');
}
