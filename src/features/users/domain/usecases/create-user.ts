import { UserRepository } from "../../infra/repositories/user.repository";

interface UserCreateParams {
  username: any;
  password: string;
  confirmPassword: string;
}

export class CreateUser {
  async execute(params: UserCreateParams): Promise<Object> {
    if (
      params.username == "" ||
      params.password == "" ||
      params.confirmPassword == ""
    )
      return { statusCode: 400, message: { error: "Preencha os campos" } };

    if (params.password != params.confirmPassword) {
      return {
        statusCode: 400,
        message: { error: "Os password são diferentes" },
      };
    }

    const repository = new UserRepository();
    const user: any = await repository.findUsername(params.username);

    if (!user) {
      await repository.createUser(params);
      return { statusCode: 201, message: { message: "Conta criada" } };
    }

    return { statusCode: 400, message: { error: "Este username já existe" } };
  }
}
