import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository } from "../../infra/repository/message.repository";

export class UpdateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {

    const repository = new MessageRepository();
    const result = await repository.updateMessage(req.body);


    return res.status(result.statusCode).json(result.message)
  }
}
