import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

export class SameContentEntities extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "update_at" })
  updateAt?: Date;

  @BeforeInsert()
  beforeCreate() {
    this.uid = uuid();
    this.updateAt = new Date();
    this.createdAt = new Date();
  }
  @BeforeUpdate()
  beforeUpdate() {
    this.updateAt = new Date();
  }
}
