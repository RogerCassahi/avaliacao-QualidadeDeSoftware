import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntity";
import { User } from "../../domain/model/user";

export class UserRepository {
  async findUsername(username: string): Promise<User | Boolean> {
    const usernameFind = await UserEntity.findOne({ where: { username } });
    if (!usernameFind) return false;
    return usernameFind;
  }
  async createUser(data: User): Promise<String> {
    const createdUser = await UserEntity.create({
      username: data.username,
      password: data.password,
    }).save();

    return createdUser.username;
  }
}
