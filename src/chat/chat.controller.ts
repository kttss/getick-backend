import { Controller, Get, Post, Body, Put, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
@ApiTags('chat')
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createChatDto: CreateChatDto): any {
    const { userId } = req.user;
    return this.chatService.create(userId, createChatDto);
  }

  @Get('getMessages')
  @UseGuards(JwtAuthGuard)
  getAllMessageForConnectedUser(@Request() req: any, @Param('id') id: string): any {
    const { userId } = req.user;
    return this.chatService.getAllMessageForUser(userId, id);
  }

  @Get('readMesages/:id')
  @UseGuards(JwtAuthGuard)
  readAllMessages(@Request() req: any, @Param('id') id: string): any {
    const { userId } = req.user;
    return this.chatService.setSeenForAllMessages(userId, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any): any {
    const { userId } = req.user;
    return this.chatService.getAllMessages(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.chatService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto): any {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.chatService.remove(+id);
  }
}
