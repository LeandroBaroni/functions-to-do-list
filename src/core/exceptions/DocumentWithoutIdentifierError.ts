import { AppError } from "./AppError";

export class DocumentWithoutIdentifierError extends AppError {
  constructor() {
    super(
      'Document without identifier.',
      'application/documen-without-identifier'
    );
  }
}