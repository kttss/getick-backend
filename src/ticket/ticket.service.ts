import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  create(createTicketDto: CreateTicketDto): any {
    return 'This action adds a new ticket';
  }

  findAll(): any {
    return `This action returns all ticket`;
  }

  findOne(id: number): any {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto): any {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number): any {
    return `This action removes a #${id} ticket`;
  }
}
