import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SameContentEntities } from "./SameContentEntities";
import { UserEntity } from "./UserEntity";

@Entity({ name: "messages" })
export class MessageEntity extends SameContentEntities {
  @Column()
  descricao!: string;

  @Column()
  detalhamento!: string;

  @ManyToOne(() => UserEntity, (entity) => entity.messages)
  @JoinColumn({ name: "uid_user", referencedColumnName: "uid" })
  user!: UserEntity;
}
