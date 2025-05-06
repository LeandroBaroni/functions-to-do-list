import { singleton } from "tsyringe";
import { CreateToDoParams } from "./index";

@singleton()
export class CreateToDoUseCase {
  execute (data: CreateToDoParams) {
    console.log(data)
  }
}