import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class MovieService {
  prisma = new PrismaClient()

  async create(createMovieDto) {
    try {
      let createMovie = await this.prisma.phim.create({
        data: createMovieDto
      })
      return createMovie;
    } catch (error) {
      return error;
    }
  }

  async findAll(tenPhim, soTrang, soPhanTuTrenTrang) {
    try {
      if (soTrang && soPhanTuTrenTrang) {
        let index = (Number(soTrang) - 1) * Number(soPhanTuTrenTrang);
        let data = await this.prisma.phim.findMany({
          skip: index,
          take: Number(soPhanTuTrenTrang),
          where: {
            ten_phim: {
              contains: tenPhim
            }
          }
        })
        return data;
      } else {
        let data = await this.prisma.phim.findMany({
          where: {
            ten_phim: {
              contains: tenPhim
            }
          }
        });
        return data;
      }
    } catch (error) {
      return error;
    }
  }
  async findAllFilm(tenPhim, tuNgay, denNgay) {
    try {
      if (tuNgay && denNgay) {

        let data = await this.prisma.phim.findMany({
          where: {
            ten_phim: {
              contains: tenPhim
            },
            ngay_khoi_chieu: {
              gte: new Date(tuNgay),
              lte: new Date(denNgay)
            }
          }

        })
        return data;
      } else {
        let data = await this.prisma.phim.findMany({
          where: {
            ten_phim: {
              contains: ""
            }
          }
        });
        return data;
      }
    } catch (error) {

    }

  }

  async findOne(id: number) {
    let data = await this.prisma.phim.findFirst({
      where: {
        ma_phim: id
      }
    })
    return data;
  }

  async remove(maPhim: string) {
    await this.prisma.phim.delete({
      where: {
        ma_phim: Number(maPhim)
      }
    })
    return "Remove film successfull";
  }
  async layDanhSachBanner() {
    try {
      let data = await this.prisma.banner.findMany();
      return data;
    } catch (error) {
      return error
    }
  }

}
