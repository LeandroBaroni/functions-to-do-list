import { singleton } from 'tsyringe';
import { CreateRequest, UpdateRequest, UserRecord, getAuth } from 'firebase-admin/auth';

interface ParamsCreate extends CreateRequest {
  email: string;
  password: string;
}

interface ParamsUpdate extends UpdateRequest {
  id: string;
}

@singleton()
export class AuthService {
  fireAuth = getAuth();

  async create(data: ParamsCreate): Promise<string> {
    const { uid } = await this.fireAuth.createUser(data);
    return uid;
  }

  async delete(id: string): Promise<void> {
    await this.fireAuth.deleteUser(id);
  }

  async update({ id, ...data }: ParamsUpdate): Promise<void> {
    await this.fireAuth.updateUser(id, data);
  }

  getUserByEmail(email: string): Promise<UserRecord> {
    return this.fireAuth.getUserByEmail(email);
  }

  async revokeRefreshTokens(id: string): Promise<void> {
    await this.fireAuth.revokeRefreshTokens(id);
  }

  generatePasswordResetLink(email: string): Promise<string> {
    return this.fireAuth.generatePasswordResetLink(email);
  }
}