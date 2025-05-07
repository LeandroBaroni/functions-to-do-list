import { singleton } from "tsyringe";
import { DeleteParams } from "./index";
import { ToDoRepository } from "src/core/repositories/ToDoRepository";
import { FirebaseDatabaseError } from "firebase-admin/database";
import { ApiError } from "src/core/exceptions/ApiError";

@singleton()
export class DeleteUseCase {
  constructor(private todoRepository: ToDoRepository){}
  async execute ({ id }: DeleteParams): Promise<void> {
    try {
      await this.todoRepository.delete(id)
    } catch (error) {
      if (error instanceof FirebaseDatabaseError) {
        throw new ApiError(error.message, error.code);
      }
      throw error
    }
  }
}