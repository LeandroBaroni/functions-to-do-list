import { ToDoRepository } from "src/core/repositories/ToDoRepository";
import { singleton } from "tsyringe";
import { DeleteParams } from ".";
import { FirebaseDatabaseError } from "firebase-admin/database";
import { ApiError } from "src/core/exceptions/ApiError";

@singleton()
export class UpdateUseCase {
  constructor (private todoRepository: ToDoRepository) { }

  async execute ({ id }: DeleteParams) {
    try {
      await this.todoRepository.update({ id, isCompleted: true });
    } catch (error) {
      if (error instanceof FirebaseDatabaseError) {
        throw new ApiError(error.message, error.code);
      }
      throw error
    }
  }
}