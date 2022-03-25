import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1643189608759 implements MigrationInterface {
  private tableUsers: Table = new Table({
    name: "users",
    columns: [
      {
        name: "uid",
        type: "uuid",
        isPrimary: true,
        isNullable: false,
      },
      {
        name: "username",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "password",
        type: "varchar",
        length: "200",
        isNullable: false,
      },
      {
        name: "created_at",
        type: "timestamp",
        isNullable: false,
      },
      {
        name: "update_at",
        type: "timestamp",
        isNullable: false,
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.tableUsers);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true, true, true);
  }
}
