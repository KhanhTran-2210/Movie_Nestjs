import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TicketService {
  prisma = new PrismaClient();
  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket';
  }

  async findAll(showtime?: number): Promise<any> {
    if (showtime) {
      const data = await this.prisma.lichChieu.findUnique({
        where: { ma_lich_chieu: +showtime },
        include: {
          phim: true,
          RapPhim: true,
        },
      });
      if (!data) {
        return 'Showtime id is not exist';
      }
      return data;
    } else {
      const data = await this.prisma.lichChieu.findMany({
        include: {
          phim: true,
          RapPhim: true,
        },
      });
      return data;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
