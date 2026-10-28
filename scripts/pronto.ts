// npm run pronto — diz se o site pode ir para o domínio.
// Falha (código de saída 1) se faltar WhatsApp ou telefone, se algum deles não for um número com DDD,
// ou se algum plano estiver com dado errado (campo vazio, preço fora do formato, mais de 3 numa categoria).
import { site } from '../src/data/site.ts';
import { numeroBR } from '../src/lib/contato.ts';
import { pendencias } from '../src/lib/pendencias.ts';

const problemas: string[] = [];

for (const [campo, nome] of [
  ['whatsapp', 'WhatsApp'],
  ['telefone', 'telefone'],
] as const) {
  const valor = site[campo];
  if (!valor) problemas.push(`falta o ${nome} (${campo})`);
  else if (!numeroBR(valor)) problemas.push(`o ${nome} "${valor}" não parece um número com DDD (${campo})`);
}

for (const i of pendencias(site).invalidos.filter((i) => i.campo.startsWith('planos')))
  problemas.push(`${i.campo}: ${i.descricao}`);

const { casa, empresa, interior } = site.planos;
const resumoPlanos = `Planos: ${casa.length} para casa, ${empresa.length} para empresa e ${interior.length} para o interior.`;

if (problemas.length > 0) {
  console.error('O site NÃO está pronto para ir ao domínio.\n');
  for (const p of problemas) console.error(`  - ${p}`);
  console.error('\nPreencha em src/data/site.ts e rode de novo. Para ver tudo o que falta: npm run todos');
  process.exitCode = 1;
} else {
  console.log('Pronto: WhatsApp e telefone preenchidos e planos sem erro. O site pode ir para o domínio.');
  console.log(resumoPlanos);
  console.log('Para conferir o resto do que falta: npm run todos');
}
