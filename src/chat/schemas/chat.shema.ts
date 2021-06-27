import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimestampDocument } from '../../shared/classes/mongo/document.class';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat extends TimestampDocument {
  @Prop({ required: true })
  sender_id: ObjectId;

  @Prop({ required: true })
  receiver_id: ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  isSeen: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
