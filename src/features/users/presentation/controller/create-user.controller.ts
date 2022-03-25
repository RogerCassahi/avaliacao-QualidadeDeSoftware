import { Request, Response } from "express";
import { Controller } from "../../../../../src/core/presentation/contracts/controller";
import { CreateUser } from "../../domain/usecases/create-user";

export class CreateUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {

      const usecase = new CreateUser();
      const result:any = await usecase.execute(req.body);
      return res.status(result.statusCode).json(result.message)
    
    }
  }

