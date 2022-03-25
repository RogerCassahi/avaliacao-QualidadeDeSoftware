import { Column, Entity, OneToMany } from "typeorm";
import { MessageEntity } from "./MessageEntity";
import { SameContentEntities } from "./SameContentEntities";

@Entity({ name: "users" })
export class UserEntity extends SameContentEntities {
  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => MessageEntity, (entity) => entity.user)
  messages?: MessageEntity[];
}
