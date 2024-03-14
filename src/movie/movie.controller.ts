import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post("/taoPhim")
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post("/UploadHinhAnh")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        },
        maPhim: {
          type: 'number'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => {
        callback(null, new Date().getTime() + `${file.originalname}`)
      }
    })
  }))
  uploadHinh(@UploadedFile("file") file, @Body() body ) {
    return this.movieService.uploadHinh(file, body);
  }

  @Get("/layDanhSachBanner")
  getListBanner() {
    return this.movieService.layDanhSachBanner();
  }

  @Get("/layDanhSachPhim")
  layDanhSachPhim(@Query("tenPhim") tenPhim, @Query("soTrang") soTrang, @Query("soPhanTuTrenTrang") soPhanTuTrenTrang ){
    return this.movieService.findAllFilm(tenPhim, soTrang, soPhanTuTrenTrang);
  }
  @Get("/layDanhSachPhimTheoNgay")
  layDanhSachPhimTheoNgay(@Query("tenPhim") tenPhim,@Query("tuNgay")tuNgay,@Query("denNgay")denNgay ){
    return this.movieService.findAllFilm(tenPhim,tuNgay , denNgay);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('/XoaPhim')
  remove(@Query('maPhim') maPhim: string) {

    return this.movieService.remove(maPhim);
  }
}
