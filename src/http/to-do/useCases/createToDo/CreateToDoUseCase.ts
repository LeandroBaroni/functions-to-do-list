import { singleton } from "tsyringe";
import { CreateToDoParams } from "./index";
import { ToDoRepository } from "src/core/repositories/ToDoRepository";

@singleton()
export class CreateToDoUseCase {
  constructor(private todoRepository: ToDoRepository){}
  async execute (data: CreateToDoParams) {
    try {
      const { description, priority, userId } = data;
      const res = await this.todoRepository.add({
        isCompleted: false,
        priority,
        description,
        userId
      })

      console.log(res)

      return res
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}