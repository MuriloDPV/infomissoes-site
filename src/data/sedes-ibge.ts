/**
 * Posição da sede de cada município atendido (latitude e longitude, graus decimais, SIRGAS 2000).
 * Usada só no mapa de /onde-atendemos/. Os nomes são os mesmos de `cidades` em site.ts.
 *
 * Fonte oficial: IBGE, Cadastro de Localidades Selecionadas 2010, arquivo BR_Localidades_2010_v1
 * (registros da categoria CIDADE, que é a sede do município), baixado em 17/10/2026 de
 * https://geoftp.ibge.gov.br/organizacao_do_territorio/estrutura_territorial/localidades/cadastro_de_localidades_selecionadas_2010/
 * Valores copiados sem alteração. `geocodigo` é o código do município no IBGE.
 *
 * Cidade nova em site.ts sem posição aqui: o mapa não aparece (e o build avisa), só a lista.
 */
export type Sede = { geocodigo: string; lat: number; lon: number };

export const sedesIbge: Record<string, Sede> = {
  Pirapó: { geocodigo: '4314555', lat: -28.0453158376278, lon: -55.2003099472118 },
  'Roque Gonzales': { geocodigo: '4316303', lat: -28.135366986895, lon: -55.0291861243459 },
  'Dezesseis de Novembro': { geocodigo: '4306353', lat: -28.2268764434985, lon: -55.0482085020399 },
  'São Nicolau': { geocodigo: '4319208', lat: -28.1821546933056, lon: -55.260100232028 },
  Rolador: { geocodigo: '4315958', lat: -28.256344217328, lon: -54.8194269754104 },
  'Santo Antônio das Missões': { geocodigo: '4317707', lat: -28.5080969775919, lon: -55.2245566426344 },
  Itacurubi: { geocodigo: '4310553', lat: -28.802205033087, lon: -55.2327232640516 },
  Bossoroca: { geocodigo: '4302501', lat: -28.7307243302239, lon: -54.9098109252545 },
  'São Luiz Gonzaga': { geocodigo: '4318903', lat: -28.4066469530094, lon: -54.9596595493639 },
};
