import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}
