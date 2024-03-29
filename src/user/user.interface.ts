import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role: string;
  enabled: string;
  lang: string;
  photo: string;
}
