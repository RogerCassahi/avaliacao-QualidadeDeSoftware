import request from "supertest";
import express from "express";
import { MessageRoutes } from "../../../../../src/features/messages/presentation/routes/routes";
import Database from "../../../../../src/core/infra/data/connections/database";

describe("/POST message", () => {
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

  test("Deve retornar 400 se algum valor estiver vazio", async () => {
    await request(server)
      .post("/message")
      .send({
        descricao: "",
        detalhamento: "",
        user: "",
      })
      .expect(400, { error: "Preencha os campos" });
  });

  test("Deve retornar 201 se a message for criada", async () => {
    await request(server)
      .post("/message")
      .send({
        descricao: "teste",
        detalhamento: "teste",
        user: "any_name",
      })
      .expect(201, { message: "Message criada" });
  });
});
