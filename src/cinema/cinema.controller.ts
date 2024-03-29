import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cinema')
@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Get("/layThongTinHeThongRap")
  layThongTinHeThongRap() {
    return this.cinemaService.layThongTinHeThongRap();
  }
  @Get("/layThongTinCumRapTheoHeThong")
  layThongTinCumRapTheoHeThong(){
    return this.cinemaService.layThongTinCumRapTheoHeThong()
  }
  @Get("/layThongTinLichChieuHeThongRap")
  layThongTinLichChieuHeThongRap(){
    return this.cinemaService.layThongTinLichChieuHeThongRap()
  }
  @Get("/layThongTinLichChieuPhim")
  layThongTinLichChieuPhim(){
    return this.cinemaService.layThongTinLichChieuPhim()
  }
  
}
