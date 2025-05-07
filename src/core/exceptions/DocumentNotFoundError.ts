import { AppError } from './AppError.js';

export class DocumentNotFoundError extends AppError {
  readonly collection: string;
  readonly id: string;

  constructor(collection: string, id: string) {
    super(`Document '${collection}/${id}' was not found.`, 'application/document-not-found');
    this.collection = collection;
    this.id = id;
  }
}