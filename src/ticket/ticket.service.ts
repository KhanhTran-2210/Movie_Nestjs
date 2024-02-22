import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaClient } from '@prisma/client';
import { BookingTicketDto } from './dto/booking-ticket.dto';
import { seatSelect } from 'prisma/prisma.select';

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

  async findAll(showtimeId: number): Promise<any> {
    // if (showtimeId) {
    //   const data = await this.prisma.lichChieu.findUnique({
    //     where: { ma_lich_chieu: +showtimeId },
    //     include: {
    //       RapPhim: {
    //         select: {
    //           ten_rap: true,
    //         },
    //         include: {
    //           CumRap: {
    //             select: {
    //               ten_cum_rap: true,
    //               dia_chi: true,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });
    //   if (!data) {
    //     return 'Showtime id is not exist';
    //   }
    //   return data;
    // } else {
    //   const data = await this.prisma.lichChieu.findMany({
    //     include: {
    //       phim: true,
    //       RapPhim: true,
    //     },
    //   });
    //   return data;
    // }
    const [seatListRaw, bookedList, scheduleInfo] = await Promise.all([
      this.prisma.ghe.findMany({
        where: {
          RapPhim: { LichChieu: { some: { ma_lich_chieu: +showtimeId } } },
        },
        select: { ma_ghe: true, ten_ghe: true, loai_ghe: true, ma_rap: true },
        orderBy: { ten_ghe: 'asc' },
      }),
      this.prisma.datVe.findMany({
        where: { ma_lich_chieu: +showtimeId },
        select: { ma_ghe: true, nguoi_dung_id: true },
        orderBy: { Ghe: { ten_ghe: 'asc' } },
      }),
      this.prisma.lichChieu.findFirst({
        where: { ma_lich_chieu: +showtimeId },
        select: {
          ngay_gio_chieu: true,
          phim: true,
          RapPhim: { select: { ten_rap: true, CumRap: true } },
        },
      }),
    ]);

    if (!scheduleInfo) {
      throw new NotFoundException('Schedule Not Found');
    }

    // map lại danh sách ghế để được output như yêu cầu (thêm taiKhoan & daDat, được lấy từ bookedList)
    let i: number = 0;
    const seatList = seatListRaw.map((seat) => {
      let taiKhoan: number | null = null;
      if (i < bookedList.length && bookedList[i].ma_ghe === seat.ma_ghe) {
        taiKhoan = bookedList[i].nguoi_dung_id;
        i++;
      }

      return {
        ...seat,
        daDat: taiKhoan ? true : false,
        taiKhoan,
      };
    });

    const { ten_cum_rap, dia_chi } = scheduleInfo.RapPhim.CumRap;
    const { ten_phim, hinh_anh } = scheduleInfo.phim;
    const scheduleFullInfo = {
      ma_lich_chieu: showtimeId,
      ten_cum_rap,
      dia_chi,
      tenRap: scheduleInfo.RapPhim.ten_rap,
      ten_phim,
      hinh_anh,
      ngayGioChieu: scheduleInfo.ngay_gio_chieu,
      danhSachGhe: seatList,
    };

    return scheduleFullInfo;
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
