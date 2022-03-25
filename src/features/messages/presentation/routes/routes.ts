import { Router } from "express";
import { CreateMessageController } from "../controller/create.controller";
import { DeleteMessagesController } from "../controller/delete.controller";
import { GetAllMessagesController } from "../controller/get-all-messages.controller";
import { UpdateMessageController } from "../controller/update-message.controller";
export class MessageRoutes {
  public init(): Router {
    const routes = Router();
    routes.post("/message", new CreateMessageController().handle);
    routes.get("/message", new GetAllMessagesController().handle);
    routes.delete("/message", new DeleteMessagesController().handle);
    routes.put("/message", new UpdateMessageController().handle);


    return routes;
  }
}
