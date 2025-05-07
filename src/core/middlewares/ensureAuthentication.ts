import type { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { ApiError } from './../exceptions/ApiError';

/**
 * Middleware para verificar a autenticação do usuário.
 *
 * Este middleware realiza as seguintes operações:
 * 1. Verifica a presença do cabeçalho de autorização na requisição.
 * 2. Valida o formato do token (deve ser "Bearer <token>").
 * 3. Verifica a validade do token usando a função verifyIdToken do Firebase.
 * 4. Se o token for válido, adiciona as informações do usuário decodificadas à requisição.
 *
 * Casos de erro tratados:
 * - Token ausente: Retorna erro 'JWT token is missing'
 * - Formato incorreto: Retorna erro 'Token malformatted'
 * - Token inválido: Retorna erro 'Invalid token'
 *
 * @param request Objeto de requisição `Express`, contendo os cabeçalhos e outros dados da requisição.
 * @param _response Objeto de resposta `Express` (não utilizado diretamente neste middleware).
 * @param nextFunction Função para passar o controle para o próximo middleware ou rota.
 *
 * @throws Lança um erro `ApiError` em caso de falha na autenticação, com mensagem e código apropriados.
 */
export async function ensureAuthentication(
  request: Request,
  _response: Response,
  nextFunction: NextFunction
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) {
    nextFunction(new ApiError('JWT token is missing', 'application/token-missing'));
    return;
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    nextFunction(new ApiError('Token malformatted.', 'application/token-malformatted', 406));
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    nextFunction(new ApiError('Token malformatted.', 'application/token-malformatted', 406));
    return;
  }

  try {
    request.user = await getAuth().verifyIdToken(token);
  } catch {
    nextFunction(new ApiError('Invalid token', 'application/invalid-token', 401));
    return;
  }

  nextFunction();
}