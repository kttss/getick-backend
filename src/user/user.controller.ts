import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAll(@Req() request: Request, @Res() res: Response): any {
    this.userService.getAll().then((data) => {
      res.send(data);
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getOneById(@Param('id') id: string): any {
    return this.userService.find(id);
  }

  @Get(':id/:token')
  @ApiBearerAuth()
  enableUser(@Param('id') id: string, @Param('token') token: string): any {
    return this.userService.enableUser(id, token);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  createUser(@Body() user: CreateUserDto): any {
    this.userService.create(user);
    return 'Added';
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto): any {
    this.userService.updateUser(id, user);
    return 'Updated';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteUser(@Param('id') id: string): any {
    this.userService.deleteUser(id);
    return 'Deleted';
  }
}
