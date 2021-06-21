import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
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

  @Prop()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: UserRoles;

  @Prop({ required: true })
  lang: string;

  @Prop()
  enabled: boolean;

  @Prop()
  isDeleted: boolean;
}

export enum UserRoles {
  Developer = 'Developer',
  Tester = 'Tester',
  CP = 'Cp'
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserPassportDocument = UserPassport & Document;
@Schema()
/* tslint:disable:max-classes-per-file */
export class UserPassport extends TimestampDocument {
  @Prop({ required: true })
  user_id: ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop({ required: true })
  isUsed: boolean;
}

export const UserPassportSchema = SchemaFactory.createForClass(UserPassport);
