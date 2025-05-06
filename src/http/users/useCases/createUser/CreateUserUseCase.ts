import { singleton } from "tsyringe";
import { CreateUserParams } from "./index";

@singleton()
export class CreateUserUseCase {
  execute (data: CreateUserParams) {
    console.log(data)
  }
}