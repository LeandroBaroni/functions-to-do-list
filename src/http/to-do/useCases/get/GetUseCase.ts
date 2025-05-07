import { FirebaseDatabaseError } from "firebase-admin/database";
import { ApiError } from "src/core/exceptions/ApiError";
import { ToDo } from "src/core/models/ToDoItem";
import { ToDoRepository } from "src/core/repositories/ToDoRepository";
import { singleton } from "tsyringe";
import { GetParams } from "./index";

@singleton()
export class GetUseCase {
  constructor (private toDoRepository: ToDoRepository) { }

  async execute ({uid}: GetParams): Promise<ToDo[]> {
    try {
      const items = await this.toDoRepository.getByUserId(uid)

      return items;
    } catch (error) {
      if (error instanceof FirebaseDatabaseError) {
        throw new ApiError(error.message, error.code);
      }
      throw error
    }
  }
}