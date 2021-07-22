import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesGateway } from '../gateways/messages.gateway';
import { UserDocument } from '../user/schemas/user.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatDocument } from './schemas/chat.shema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<ChatDocument>, private readonly messageGateway: MessagesGateway) {}

  create(userId: string, createChatDto: CreateChatDto): any {
    const message = new this.chatModel({
      content: createChatDto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      sender_id: userId,
      receiver_id: createChatDto.receiver_id,
      isSeen: false
    });

    message.save();
    this.messageGateway.server.emit('message', message);
    return message;
  }

  async getAllMessageForUser(userId: string, receiver_id: string): Promise<any> {
    const data = await this.chatModel
      .find({
        $or: [{ sender_id: userId }, { sender_id: receiver_id }, { receiver_id: userId }, { receiver_id }]
      })
      .exec();
    data.forEach((msg) => {
      msg.isSeen = true;
      msg.save();
    });

    return data;
  }

  async setSeenForAllMessages(receiver_id: string, sender_id: string): Promise<any> {
    const data = await this.chatModel.find({ sender_id, receiver_id, isSeen: false }).exec();

    return data;
  }

  async getAllMessages(user_id: string): Promise<any> {
    const data = await this.chatModel.find({ sender_id: user_id, receiver_id: user_id, isSeen: false }).exec();
    return data;
  }

  findAll(): any {
    return `This action returns all chat`;
  }

  findOne(id: number): any {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto): any {
    return `This action updates a #${id} chat`;
  }

  remove(id: number): any {
    return `This action removes a #${id} chat`;
  }
}
