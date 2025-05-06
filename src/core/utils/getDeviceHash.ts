import { createHash } from 'node:crypto';

/**
 * Opções necessárias para gerar um hash do dispositivo.
 */
interface GetDeviceHashOptions {
  /** O User-Agent do cliente. */
  ua: string;
  /** O endereço IP do cliente. */
  ip: string;
  /** A origem da requisição, tipicamente a URL de onde a requisição foi feita. */
  origin: string;
}

/**
 * Gera um hash único para identificar um dispositivo específico.
 *
 * Esta função combina três elementos principais para criar uma identificação única:
 * 1. O User-Agent do cliente, que fornece informações sobre o navegador e sistema operacional.
 * 2. O endereço IP do cliente, que ajuda na identificação geográfica.
 * 3. A origem da requisição, que indica de onde a solicitação foi feita.
 *
 * O processo de geração do hash envolve:
 * 1. Concatenação das três informações em uma única string.
 * 2. Utilização do algoritmo SHAKE256 para gerar um hash criptográfico.
 * 3. Produção de um hash hexadecimal de 32 caracteres.
 *
 * Este hash pode ser usado para rastrear sessões de usuário, detectar atividades suspeitas
 * ou personalizar a experiência do usuário com base no dispositivo.
 *
 * @param options Um objeto contendo ua, ip e origin para gerar o hash.
 * @returns Um hash hexadecimal de 32 caracteres único para o dispositivo.
 */
export function getDeviceHash({ ua, ip, origin }: GetDeviceHashOptions): string {
  return createHash('shake256', { outputLength: 16 }).update(`${ua}:${ip}:${origin}`).digest('hex');
}