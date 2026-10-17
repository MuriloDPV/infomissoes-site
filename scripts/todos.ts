// npm run todos — lista os dados que ainda faltam em src/data/site.ts.
// Roda direto no Node (que entende TypeScript simples), sem dependências.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '../src/data/site.ts';
import { pendencias, type Pendencia } from '../src/lib/pendencias.ts';

const raiz = join(import.meta.dirname, '..');
const { faltando, invalidos, aConfirmar } = pendencias(site);

// Arquivos informados mas que não existem
const arquivos: [string | null, string, string][] = [
  [site.logo, join('src', 'assets', 'marca'), 'logo'],
  [site.favicon, 'public', 'favicon'],
  [site.fotos.destaque.arquivo, join('src', 'assets', 'fotos'), 'fotos.destaque'],
  [site.fotos.loja.arquivo, join('src', 'assets', 'fotos'), 'fotos.loja'],
];
for (const [nome, pasta, campo] of arquivos) {
  if (nome && !existsSync(join(raiz, pasta, nome)))
    invalidos.push({ campo, descricao: `arquivo não encontrado: ${join(pasta, nome)}` });
}

const listar = (titulo: string, itens: Pendencia[]) => {
  if (itens.length === 0) return;
  console.log(`\n${titulo} (${itens.length}):`);
  for (const i of itens) console.log(`  - ${i.campo}: ${i.descricao}`);
};

console.log('Info Missões: dados pendentes em src/data/site.ts');
listar('Faltando', faltando);
listar('Com problema', invalidos);
listar('A confirmar', aConfirmar);

if (faltando.length + invalidos.length === 0) console.log('\nNada faltando.');
console.log('');

// Sai com erro só se algum dado preenchido estiver errado (útil antes do build).
process.exitCode = invalidos.length > 0 ? 1 : 0;
