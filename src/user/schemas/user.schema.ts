import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimestampDocument } from '../../shared/classes/mongo/document.class';

export type UserDocument = User & Document;

@Schema()
export class User extends TimestampDocument {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: UserRoles;

  @Prop()
  enabled: boolean;
}

export enum UserRoles {
  Developer = 'Developer',
  Tester = 'Tester',
  CP = 'Cp'
}

export const UserSchema = SchemaFactory.createForClass(User);
