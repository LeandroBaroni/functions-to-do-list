import { AppError } from './AppError.js';

/**
 * Representa um erro específico para quando um documento não é encontrado.
 *
 * @class
 * @extends AppError
 *
 * @example
 * const erro = new DocumentNotFoundError('usuarios', '123');
 * console.log(erro.message); // "Document 'usuarios/123' was not found."
 * console.log(erro.code); // "application/document-not-found"
 *
 * @remarks
 * Esta classe é útil para padronizar erros de documentos não encontrados,
 * facilitando o tratamento específico desse tipo de erro na aplicação.
 */
export class DocumentNotFoundError extends AppError {
  /**
   * O nome da coleção onde o documento não foi encontrado.
   */
  readonly collection: string;

  /**
   * O ID do documento não encontrado.
   */
  readonly id: string;

  /**
   * @param collection - O nome da coleção onde o documento não foi encontrado.
   * @param id - O ID do documento não encontrado.
   */
  constructor(collection: string, id: string) {
    super(`Document '${collection}/${id}' was not found.`, 'application/document-not-found');
    this.collection = collection;
    this.id = id;
  }
}