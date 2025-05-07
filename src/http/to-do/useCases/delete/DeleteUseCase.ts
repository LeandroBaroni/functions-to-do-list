import { singleton } from "tsyringe";
import { DeleteParams } from "./index";
import { ToDoRepository } from "src/core/repositories/ToDoRepository";

@singleton()
export class DeleteUseCase {
  constructor(private todoRepository: ToDoRepository){}
  async execute ({ id }: DeleteParams): Promise<void> {
    await this.todoRepository.delete(id)
  }
}