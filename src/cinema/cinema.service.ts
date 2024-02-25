import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaClient } from '@prisma/client'
@Injectable()
export class CinemaService {
  prisma = new PrismaClient
  create(createCinemaDto: CreateCinemaDto) {
    return 'This action adds a new cinema';
  }

  async layThongTinHeThongRap(){
    try {
      let data = await this.prisma.heThongRap.findMany()
      return data;
      
    } catch (error) {
      return error
    }
  }
  async layThongTinCumRapTheoHeThong(){
    try {
      let data = await this.prisma.cumRap.findMany()
      return data;
      
    } catch (error) {
      return error
    }
  
  }
  async layThongTinLichChieuHeThongRap(){
    try {
      let data = await this.prisma.lichChieu.findMany()
      return data;
      
    } catch (error) {
      return error
    }
  
  }
  async layThongTinLichChieuPhim(){
    try {
      let data = await this.prisma.lichChieu.findMany()
      return data;
      
    } catch (error) {
      return error
    }
  
  }
  findAll() {
    return `This action returns all cinema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cinema`;
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return `This action updates a #${id} cinema`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
