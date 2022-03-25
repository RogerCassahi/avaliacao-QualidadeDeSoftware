import request from "supertest";
import express from "express";
import { MessageRoutes } from "../../../../../src/features/messages/presentation/routes/routes";
import Database from "../../../../../src/core/infra/data/connections/database";
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository";
import { MessageEntity } from "../../../../../src/core/infra/data/database/entities/MessageEntity";

const findUidUser: any = async () => {
  const repository = new UserRepository();
  const userUid = await repository.findUsername("any_name");
  return userUid;
};

const createMessage: any = async () => {
  const user = await findUidUser("any_name");
  const message = await MessageEntity.create({
    descricao: "any_text3",
    detalhamento: "any_text3",
    user: user.uid,
  }).save();

  return message.uid;
};

describe("/POST message", () => {
  let server: express.Express;
  const database = new Database();

  beforeAll(async () => {
    server = express();
    server.use(express.json());
    server.use(new MessageRoutes().init());
    await database.openConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });
  test("Deve retornar 400 se algum valor estiver vazio ", async () => {
    await request(server)
      .put("/message")
      .send({
        uid: "",
        descricao: "",
        detalhamento: "",
      })
      .expect(400, { error: "Preencha os campos" });
  });
  test("Deve retornar 400 se a message não for encontrada ", async () => {
    await request(server)
      .put("/message")
      .send({
        uid: "1234",
        descricao: "teste",
        detalhamento: "teste",
      })
      .expect(400, { error: "Esta message não foi encontrada" });
  });

  test("Deve retornar 200 e informar que a message foi atualizada", async () => {
    const uidMessage = await createMessage();
    await request(server)
      .put("/message")
      .send({
        uid: uidMessage.uid,
        descricao: "teste3",
        detalhamento: "teste3",
      })
      .expect(200, { message: "Esta message foi atualizada" });
  });
});
