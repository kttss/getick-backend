import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User, UserDocument, UserPassportDocument } from './schemas/user.schema';
import { IUser } from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('UserPassport') private readonly userPassortModel: Model<UserPassportDocument>,
    private readonly mailService: MailService
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = new this.userModel({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: passwordHash,
      role: user.role,
      enabled: false,
      createdAt: new Date(),
      lang: 'en'
    });
    newUser.save();

    const hour = 1000 * 60 * 60;
    const _date = new Date();

    const newUserPassport = new this.userPassortModel({
      user_id: newUser.id,
      token: await bcrypt.hash(String(new Date()), salt),
      isUsed: false,
      expirationDate: new Date(_date.getTime() + hour)
    });

    newUserPassport.save();

    return this.mailService.sendUserConfirmation(newUser, newUserPassport.token);
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

  async enableUser(id: string, token: string): Promise<any> {
    const item = await this.userPassortModel.findOne({ user_id: id }).exec();
    const user = await this.userModel.findById(id);
    console.log('e', user);
    if (!item.isUsed && item.token === token) {
      user.enabled = true;
      user.save();
      item.isUsed = true;
      item.save();

      return 'enabled';
    } else {
      throw new ForbiddenException('token alreay used');
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    let user: any;
    try {
      user = await this.userModel.findOne({ email }).exec();
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
