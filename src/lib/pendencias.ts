// Lista o que falta em src/data/site.ts. Usado pelo `npm run todos`.
import type { Site } from '../data/site.ts';
import { cnpjValido, numeroBR, precoValido } from './contato.ts';

export type Pendencia = { campo: string; descricao: string };

export type Relatorio = {
  faltando: Pendencia[];
  invalidos: Pendencia[];
  aConfirmar: Pendencia[];
};

export function pendencias(site: Site): Relatorio {
  const faltando: Pendencia[] = [];
  const invalidos: Pendencia[] = [];
  const aConfirmar: Pendencia[] = [];

  const falta = (campo: string, descricao: string) => faltando.push({ campo, descricao });

  if (!site.logo) falta('logo', 'arquivo do logo em src/assets/marca/ (sem ele aparece o nome em texto)');
  if (!site.logoFundoEscuro)
    falta('logoFundoEscuro', 'logo para fundo escuro em src/assets/marca/ (sem ele o rodapé mostra o nome em texto)');
  if (!site.favicon) falta('favicon', 'arquivo do favicon em public/');

  if (!site.whatsapp) falta('whatsapp', 'número do WhatsApp com DDD (sem ele os botões de WhatsApp somem)');
  else if (!numeroBR(site.whatsapp))
    invalidos.push({ campo: 'whatsapp', descricao: `"${site.whatsapp}" não parece um número com DDD` });

  if (!site.telefone) falta('telefone', 'telefone com DDD');
  else if (!numeroBR(site.telefone))
    invalidos.push({ campo: 'telefone', descricao: `"${site.telefone}" não parece um número com DDD` });

  if (!site.endereco) {
    const somem = site.diferenciais.filter((d) => d.soComEndereco).map((d) => `o diferencial "${d.titulo}"`);
    falta('endereco', `endereço da loja (sem ele não aparecem a loja no contato${somem.map((s) => ` nem ${s}`).join('')})`);
  }
  if (!site.horario) falta('horario', 'horário de atendimento da loja (opcional)');

  if (!site.cnpj) falta('cnpj', 'CNPJ (aparece no rodapé)');
  else if (!cnpjValido(site.cnpj))
    invalidos.push({ campo: 'cnpj', descricao: `"${site.cnpj}" não tem 14 dígitos` });

  if (site.cidades.length === 0) falta('cidades', 'cidades atendidas (sem elas aparece um texto geral sobre a região)');

  for (const [categoria, planos] of Object.entries(site.planos)) {
    const campo = `planos.${categoria}`;
    if (planos.length === 0)
      falta(campo, 'planos: nome, download, upload e preço (sem eles a página mostra "Consulte os planos")');
    planos.forEach((p, i) => {
      const vazio = (['nome', 'download', 'upload', 'preco'] as const).filter((k) => !p[k]?.trim());
      if (vazio.length) invalidos.push({ campo: `${campo}[${i}]`, descricao: `faltam: ${vazio.join(', ')}` });
      else if (!precoValido(p.preco))
        invalidos.push({
          campo: `${campo}[${i}].preco`,
          descricao: `"${p.preco}" não está no formato "R$ 99,90" (nem é "sob consulta")`,
        });
    });
    if (planos.length > 3)
      invalidos.push({ campo, descricao: `${planos.length} planos; o layout foi feito para até 3` });
  }

  if (!site.fotos.destaque.arquivo) falta('fotos.destaque', 'foto do destaque, em pé (4:5)');
  if (!site.fotos.loja.arquivo) falta('fotos.loja', 'foto da fachada da loja, deitada (4:3)');

  aConfirmar.push({ campo: 'rotuloPortal', descricao: `nome do portal: "${site.rotuloPortal}"` });
  aConfirmar.push({ campo: 'diferenciais', descricao: 'textos dos diferenciais (rascunho)' });

  return { faltando, invalidos, aConfirmar };
}
