import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository } from "../../infra/repository/message.repository";

export class CreateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const { descricao, detalhamento, user } = req.body;

    if (descricao == "" || detalhamento == "" || user == "")
      return res.status(400).json({ error: "Preencha os campos" });

    const repository = new MessageRepository();
    await repository.createMessage(req.body);
    return res.status(201).json({ message: "Message criada" });
  }
}
