import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntity";
import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntity";

export class MessageRepository {
  async getAllMessages(uid: string): Promise<any> {
    const messageEntity = await MessageEntity.find({
      where: { user: uid },
    });

    if (messageEntity.length == 0) return "Não possui recados";

    if (!messageEntity) return undefined;
    return messageEntity;
  }
  async deleteMessage(uid: string): Promise<any> {
    const message = await MessageEntity.delete(uid);
    if (!message) return undefined;
    return message;
  }

  async updateMessage(data: any): Promise<any> {
    const message = await MessageEntity.findOne(data.uid);

    if (data.uid == "" || data.descricao == "" || data.detalhamento == "") {
      return {
        statusCode: 400,
        message: { error: "Preencha os campos" },
      };
    }

    if (!message)
      return {
        statusCode: 400,
        message: { error: "Esta message não foi encontrada" },
      };

    message.descricao = data.descricao;
    message.detalhamento = data.detalhamento;
    await message.save(message);

    return {
      statusCode: 200,
      message: { message: "Esta message foi atualizada" },
    };
  }

  async findUidMessages(uid: any): Promise<any> {
    const uidFind: any = await MessageEntity.findOne({ where: { uid } });
    if (!uidFind) return uidFind;

    return uidFind;
  }

  async createMessage(data: any): Promise<Object> {
    const userUid = await UserEntity.findOne(data.username);
    const createdMessage = await MessageEntity.create({
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      user: userUid.uid,
    }).save();


    return createdMessage;
  }
}
