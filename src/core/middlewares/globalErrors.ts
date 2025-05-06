import type { NextFunction, Request, Response } from 'express';

/**
 * Middleware para tratamento de erros globais da aplicação.
 *
 * Este middleware é responsável por capturar e tratar quaisquer erros não tratados
 * por middlewares anteriores. Suas principais funções são:
 *
 * 1. Fornecer uma resposta padrão para erros não tratados, garantindo que o cliente
 *    sempre receba uma resposta, mesmo em caso de falhas inesperadas.
 * 2. Padronizar a resposta de erro, retornando sempre um status 500 (Internal Server Error)
 *    com uma mensagem genérica e um código de erro específico.
 * 3. Passar o erro para o próximo middleware (se existir) para possível logging ou
 *    tratamento adicional.
 *
 * Este middleware deve ser o último na cadeia de tratamento de erros, atuando como
 * uma rede de segurança para capturar qualquer erro que possa ter escapado dos
 * tratamentos mais específicos.
 *
 * @param err Objeto de erro capturado, que pode ser de qualquer tipo.
 * @param _request Objeto de requisição `Express` (não utilizado neste middleware).
 * @param response Objeto de resposta `Express` usado para enviar a resposta de erro ao cliente.
 * @param nextFunction Função para passar o controle para o próximo middleware ou rota.
 */
export function globalErrors(err: Error, _request: Request, response: Response, nextFunction: NextFunction): void {
  response.status(500).json({
    code: 'application/internal-error',
    message: 'Internal server error.'
  });

  nextFunction(err);
}