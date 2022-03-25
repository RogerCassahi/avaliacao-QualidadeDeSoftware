import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository } from "../../infra/repository/message.repository";

export class DeleteMessagesController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {

    const repository = new MessageRepository();
    const result = await repository.deleteMessage(req.body.uid);

    return res.status(200).json({error:'Message deletada'});
  }
}
