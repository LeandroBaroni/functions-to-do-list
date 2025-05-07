import { singleton } from "tsyringe";
import { CreateUserParams } from "./index";
import { AuthService } from "src/core/services/auth.service";
import { UserRepository } from "src/core/repositories/UserRepository";
import { FirebaseAuthError } from "firebase-admin/auth";
import { ApiError } from "src/core/exceptions/ApiError";
import { FirebaseDatabaseError } from "firebase-admin/database";

@singleton()
export class CreateUserUseCase {
  constructor(private authService: AuthService, private userRepository: UserRepository) {}

  async execute ({email,name,password}: CreateUserParams): Promise<string>{
    let id = null;

    try {
      const id = await this.authService.create({ email, password, displayName: name })

      await this.userRepository.set({ id, name, email });

      return id;
    } catch (error) {
      if (id) {
        await this.authService.delete(id);
      }
      if (error instanceof FirebaseAuthError) {
        throw new ApiError(error.message, error.code, 401)
      }
      if (error instanceof FirebaseDatabaseError) {
        throw new ApiError(error.message, error.code, 401)
      }

      throw error;
    }
  }
}