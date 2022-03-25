import {
  MigrationInterface,
  Table,
  TableForeignKey,
  QueryRunner
} from "typeorm";
export class CreateTableMessages1643189614922 implements MigrationInterface {
  private tableMessages: Table = new Table({
        name: "messages",
        columns: [
          {
            name: "uid",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "descricao",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "detalhamento",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "uid_user",
            type: "uuid",
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
        foreignKeys: [
          new TableForeignKey({
            name: "user_messages",
            columnNames: ["uid_user"],
            referencedTableName: "users",
            referencedColumnNames: ["uid"],
          }),
        ],
      })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.tableMessages);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("messages", true, true, true);
  }
}
