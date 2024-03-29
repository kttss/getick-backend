import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ticket')
@ApiBearerAuth()
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTicketDto: CreateTicketDto): any {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll(): any {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.ticketService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): any {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.ticketService.remove(+id);
  }
}
