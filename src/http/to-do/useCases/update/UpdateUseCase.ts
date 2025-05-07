import { ToDoRepository } from "src/core/repositories/ToDoRepository";
import { singleton } from "tsyringe";
import { DeleteParams } from ".";

@singleton()
export class UpdateUseCase {
  constructor (private todoRepository: ToDoRepository) { }

  async execute ({ id }: DeleteParams) {
    await this.todoRepository.update({ id, isCompleted: true });
  }
}