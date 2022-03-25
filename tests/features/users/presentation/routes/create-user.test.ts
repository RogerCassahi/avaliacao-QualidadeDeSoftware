import request from "supertest";
import express from "express";
import { UserRoutes } from "../../../../../src/features/users/presentation/routes/routes";
import Database from "../../../../../src/core/infra/data/connections/database";

describe("/POST user", () => {
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
      .post("/cadastro")
      .send({
        username: "",
        password: "",
        confirmPassword: "",
      })
      .expect(400, { error: "Preencha os campos" });
  });

  test("Deve retornar 400 os passwords não estiverem iguais", async () => {
    await request(server)
      .post("/cadastro")
      .send({
        username: "any_name",
        password: "any_password",
        confirmPassword: "any_passwor",
      })
      .expect(400, { error: "Os password são diferentes" });
  });

  test("Deve retornar 201 se a conta for criada", async () => {
    await request(server)
      .post("/cadastro")
      .send({
        username: "any_name",
        password: "any_password",
        confirmPassword: "any_password",
      })
      .expect(201, { message: "Conta criada" });
  });
  
  test("Deve retornar 400 se o username já existir", async () => {
    await request(server)
      .post("/cadastro")
      .send({
        username: "any_name",
        password: "any_password",
        confirmPassword: "any_password",
      })
      .expect(400, { error: "Este username já existe" });
  });

});