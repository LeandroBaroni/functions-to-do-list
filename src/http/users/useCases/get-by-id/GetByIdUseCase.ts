import { UserRepository } from "src/core/repositories/UserRepository";
import { singleton } from "tsyringe";
import { GetByIdParams } from "./index";
import { User } from "src/core/models/User";

@singleton()
export class GetByIdUsecase {
  constructor(private userRepository: UserRepository){}

  async execute ({ id }: GetByIdParams): Promise<User> {
    return this.userRepository.getById(id);
  }
}