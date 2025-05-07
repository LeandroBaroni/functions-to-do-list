export class AppError {
  public readonly message: string;

  readonly code: string;

  constructor(message: string, code: string) {
    this.message = message;
    this.code = code;
  }
}