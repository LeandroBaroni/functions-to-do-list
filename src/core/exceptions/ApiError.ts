import { AppError } from './AppError.js';

export class ApiError extends AppError {
  /**
   * O código de status HTTP associado ao erro de API.
   */
  readonly statusCode: number;

  /**
   * @param message - A mensagem descritiva do erro de API.
   * @param code - O código único associado ao tipo de erro de API.
   * @param statusCode - O código de status HTTP (padrão é 400).
   */
  constructor(message: string, code: string, statusCode = 400) {
    super(message, code);
    this.statusCode = statusCode;
  }
}