import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaClient } from '@prisma/client';
import { BookingTicketDto } from './dto/booking-ticket.dto';

@Injectable()
export class TicketService {
  prisma = new PrismaClient();
  async bookingTicket(bookingTicketDto: BookingTicketDto): Promise<any> {
    const { maLichChieu, danhSachVe } = bookingTicketDto;
    const screening = await this.prisma.lichChieu.findFirst({
      where: {
        ma_lich_chieu: maLichChieu,
      },
    });
    if (!screening) {
      return `Showtime id ${maLichChieu} is not exist`;
    }
    for (const ticket of danhSachVe) {
      const { nguoiDungId, maGhe } = ticket;
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          nguoi_dung_id: nguoiDungId,
        },
      });
      if (!user) {
        return `User id ${nguoiDungId} is not exist`;
      }
      const existingBooking = await this.prisma.datVe.findFirst({
        where: {
          ma_lich_chieu: maLichChieu,
          ma_ghe: maGhe,
          nguoi_dung_id: nguoiDungId,
        },
      });
      if (existingBooking) {
        return `User id ${nguoiDungId} booked a ticket on this seat`;
      }
      await this.prisma.datVe.create({
        data: {
          ma_lich_chieu: maLichChieu,
          ma_ghe: maGhe,
          nguoi_dung_id: nguoiDungId,
        },
      });
    }
    return 'Bookked successfully';
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

  async create(createTicketDto: CreateTicketDto): Promise<any> {
    const { ngay_gio_chieu, ...rest } = createTicketDto;
    const date = new Date(ngay_gio_chieu);
    if (isNaN(date.getTime())) {
      return 'Ngày giờ không hợp lệ';
    }
    const newShowtime = { ...rest, ngay_gio_chieu: date };
    await this.prisma.lichChieu.create({ data: newShowtime });
    return 'Create showtime successfully';
  }
}
