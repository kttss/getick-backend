import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatDocument } from './schemas/chat.shema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<ChatDocument>) {}

  create(userId: string, createChatDto: CreateChatDto): any {
    const message = new this.chatModel({
      content: createChatDto.content,
      createdAt: new Date(),
      sender_id: userId,
      receiver_id: createChatDto.receiver_id,
      isSeen: false
    });

    message.save();
    return 'message saved';
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
