import request from "supertest";
import express from "express";
import { MessageRoutes } from "../../../../../src/features/messages/presentation/routes/routes";
import Database from "../../../../../src/core/infra/data/connections/database";

describe("/Del message", () => {
  let server: express.Express;
  const database = new Database();

  beforeAll(async() => {
    server = express();
    server.use(express.json());
    server.use(new MessageRoutes().init());
    await database.openConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  test("Deve retornar 200 se alguma message for deletada", async () => {
    await request(server)
      .delete("/message")
      .send({
       uid:"f31e3b7f-bf80-447f-815b-5044eef89c20"
      })
      .expect(200, { error: "Message deletada" });
  });

 
});
