import { singleton } from "tsyringe";
import { CreateToDoParams } from "./index";
import { ToDoRepository } from "src/core/repositories/ToDoRepository";

@singleton()
export class CreateToDoUseCase {
  constructor(private todoRepository: ToDoRepository){}
  async execute (data: CreateToDoParams) {
    try {
      const { description, priority, uid } = data;
      const id = await this.todoRepository.add({
        isCompleted: false,
        priority,
        description,
        userId: uid
      })

      return { id, uid };
    } catch (error) {
      throw error;
    }
  }
}