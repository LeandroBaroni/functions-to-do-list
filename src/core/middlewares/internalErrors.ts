import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../exceptions/ApiError';
import { AppError } from '../exceptions/AppError';

/**
 * Middleware para tratamento de erros internos da aplicação.
 *
 * Esta função é responsável por capturar e processar diferentes tipos de erros,
 * fornecendo respostas apropriadas para cada caso. Ela lida com:
 *
 * 1. Erros de API (ApiError): Retorna o código de status e a mensagem específica do erro.
 * 2. Erros de Aplicação (AppError): Retorna um status 422 com o código e mensagem do erro.
 * 3. Erros de Validação (ZodError): Retorna um status 400 com detalhes sobre as falhas de validação.
 * 4. Erros do Firebase: Retorna um status 400 com informações específicas do erro.
 * 5. Outros erros não tratados: Passa o controle para o próximo middleware de erro.
 *
 * @param err O objeto de erro capturado durante a execução da aplicação.
 * @param _request O objeto de requisição `Express` (não utilizado neste middleware).
 * @param response O objeto de resposta `Express` usado para enviar a resposta ao cliente.
 * @param nextFunction A função para passar o controle para o próximo middleware.
 */
export function internalErrors(err: Error, _request: Request, response: Response, nextFunction: NextFunction): void {
  if (err instanceof ApiError) {
    response.status(err.statusCode).json({
      code: err.code,
      message: err.message
    });

    return;
  }

  if (err instanceof AppError) {
    response.status(422).json({
      code: err.code,
      message: err.message
    });

    return;
  }

  if (err instanceof ZodError) {
    response.status(400).json({
      code: 'application/validations-fail',
      message: 'Validation fails.',
      erros: err.format()
    });

    return;
  }

  if ('codePrefix' in err && 'errorInfo' in err) {
    response.status(400).json(err.errorInfo);
    return;
  }

  nextFunction(err);
}