import { Connection, createConnection } from "typeorm";

export default class Database {
  private static connection: Connection | null;

  public async getConnection(): Promise<Connection> {
    if (!Database.connection) {
      await this.openConnection();
    }
    return Database.connection as Connection;
  }

  public async closeConnection(): Promise<void> {
    if (!Database.connection) return;
    try {
      await Database.connection.close();
      Database.connection = null;
    } catch (error) {
      console.log("ERRO AO FECHAR A CONEXÃO -->", error);
      throw new Error(`ERRO AO FECHAR A CONEXÃO  -> ${error}`);
    }
  }

  public async openConnection(): Promise<void> {
    if (Database.connection) return;
    try {
      Database.connection = await createConnection();
    } catch (error) {
      console.error("ERRO AO CONECTAR AO BANCO ->", error);
      throw new Error(`ERRO AO CONECTAR AO BANCO -> ${error}`);
    }
  }
}
