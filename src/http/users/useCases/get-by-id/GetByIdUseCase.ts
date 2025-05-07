import { UserRepository } from "src/core/repositories/UserRepository";
import { singleton } from "tsyringe";
import { GetByIdParams } from "./index";
import { User } from "src/core/models/User";
import { FirebaseDatabaseError } from "firebase-admin/database";
import { ApiError } from "src/core/exceptions/ApiError";

@singleton()
export class GetByIdUsecase {
  constructor(private userRepository: UserRepository){}

  async execute ({ id }: GetByIdParams): Promise<User> {
    try {
      const user = await this.userRepository.getById(id);

      return user;
    } catch (error) {
      if (error instanceof FirebaseDatabaseError) {
        throw new ApiError(error.message, error.code, 401)
      }
      throw error      
    }
  }
}