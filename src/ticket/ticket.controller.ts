import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingTicketDto } from './dto/booking-ticket.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @Get('get-showtime/:showtimeId')
  findAll(@Param('showtimeId') showtimeId: number): Promise<any> {
    return this.ticketService.findAll(showtimeId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  create(@Body() createTicketDto: CreateTicketDto): Promise<any> {
    return this.ticketService.create(createTicketDto);
  }
}
