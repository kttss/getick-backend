import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Req() request: Request, @Res() res: Response): any {
    this.userService.getAll().then((data) => {
      res.send(data);
    });
  }

  @Get(':id')
  getOneById(@Param('id') id: string): any {
    return this.userService.find(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): any {
    this.userService.create(user);
    return 'Added';
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): any {
    this.userService.updateUser(id, user);
    return 'Updated';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): any {
    this.userService.deleteUser(id);
    return 'Deleted';
  }
}
