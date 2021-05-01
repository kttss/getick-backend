import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User, UserDocument } from './schemas/user.schema';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role
    });

    return newUser.save();
  }

  async find(id: string): Promise<IUser> {
    let user: any;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async updateUser(userId: string, user: UpdateUserDto): Promise<void> {
    const currentUser = await this.find(userId);

    //  currentUser.firstname = user.firs tname;
    currentUser.lastname = user.lastname;
    currentUser.username = user.username;
    currentUser.email = user.email;

    try {
      currentUser.save();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async deleteUser(userId: string): Promise<any> {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  async getAll(): Promise<any> {
    const users = await this.userModel.find().exec();
    const data = users.map((user) => ({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email
    }));
    return data;
  }
}
