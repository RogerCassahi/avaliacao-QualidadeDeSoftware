import request from "supertest";
import express from "express";
import { UserRoutes } from "../../../../../src/features/users/presentation/routes/routes";
import Database from "../../../../../src/core/infra/data/connections/database";

describe("/POST resources", () => {
  let server: express.Express;
  const database = new Database();

  beforeAll(async () => {
    server = express();
    server.use(express.json());
    server.use(new UserRoutes().init());
    await database.openConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  test("Deve retornar 400 se algum valor estiver vazio", async () => {
    await request(server)
      .post("/login")
      .send({
        username: "",
        password: "",
      })
      .expect(400, { error: "Preencha os campos" });
     
  });

  test("Deve retornar 400 se o username não for encontrado", async () => {
    await request(server)
      .post("/login")
      .send({
        username: "any",
      })
      .expect(400, { error: "Este username não foi encontrado!" });
  });

  test("Deve retornar 400 se o password não estiver correto", async () => {
    await request(server)
      .post("/login")
      .send({
        username: "any_name",
        password: "12",
      })
      .expect(400, { error: "O password está incorreto!" });
  });

  test("Deve retornar 200 e o uuid do user se o login estiver correto", async () => {
    await request(server)
      .post("/login")
      .send({
        username: "any_name",
        password: "any_password",
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy();
      });
  });
});
