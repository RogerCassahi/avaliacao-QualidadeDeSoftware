import { Request, Response } from "express";
import { Controller } from "../../../../../src/core/presentation/contracts/controller";
import { Login } from "../../domain/usecases/login";

export class LoginUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {

      const usecase = new Login();
      const result:any = await usecase.execute(req.body);
      return res.status(result.statusCode).json(result.message)
    
    }
  }

