import { UserRepository } from "../../infra/repositories/user.repository";
interface UserParams {
  uid: string;
  username: any;
  password: string;
}
export class Login {
  async execute(params: UserParams): Promise<Object> {
    if (params.username == "" || params.password == "")
      return { statusCode: 400, message: { error: "Preencha os campos" } };

    const repository = new UserRepository();
    const user: any = await repository.findUsername(params.username);

    if (!user)
      return {
        statusCode: 400,
        message: { error: "Este username não foi encontrado!" },
      };

    if (user.password != params.password)
      return {
        statusCode: 400,
        message: { error: "O password está incorreto!" },
      };

    if (user.username == params.username && user.password == params.password)
      return { statusCode: 200, message: user.uid };

    return { statusCode: 200, message: "ok" };
  }
}
