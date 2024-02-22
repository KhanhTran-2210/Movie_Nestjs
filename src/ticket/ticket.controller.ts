import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingTicketDto } from './dto/booking-ticket.dto';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('/booking')
  bookingTicket(@Body() bookingTicketDto: BookingTicketDto): Promise<any> {
    return this.ticketService.bookingTicket(bookingTicketDto);
  }
  @ApiQuery({
    name: 'showtime',
    required: false,
    description: 'Showtime id is here',
  })
  @Get('get-showtime')
  findAll(@Query('showtime') showtime?: number): Promise<any> {
    return this.ticketService.findAll(showtime);
  }
  @Post('/create')
  create(@Body() createTicketDto: CreateTicketDto): Promise<any> {
    return this.ticketService.create(createTicketDto);
  }
}
