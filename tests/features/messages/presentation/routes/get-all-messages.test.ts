import request from "supertest";
import express from "express";
import { MessageRoutes } from "../../../../../src/features/messages/presentation/routes/routes";

import Database from "../../../../../src/core/infra/data/connections/database";
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository";

const findUidUser:any = async() => {
  const repository = new UserRepository()
  const userUid = await repository.findUsername("any_name")
  return userUid
}

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

  test("Deve retornar 200 com as mensagens do username", async () => {
    const User = findUidUser()
    await request(server)
      .get("/message")
      .send({
        user: User.uid,
      })
      .expect(200)
      .expect((res) => {
          expect(res.body).toBeTruthy()
      })
  });
});
