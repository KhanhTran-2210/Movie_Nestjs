import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post("/taoPhim")
  create(@Body() createMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get("/layDanhSachBanner")
  getListBanner() {
    return this.movieService.layDanhSachBanner();
  }

  @Get("/layDanhSachPhim")
  layDanhSachPhim(@Query("tenPhim") tenPhim, @Query("soTrang") soTrang, @Query("soPhanTuTrenTrang") soPhanTuTrenTrang ){
    return this.movieService.findAll(tenPhim, soTrang, soPhanTuTrenTrang);
  }
  @Get("/layDanhSachPhimTheoNgay")
  layDanhSachPhimTheoNgay(@Query("tenPhim") tenPhim,@Query("tuNgay")tuNgay,@Query("denNgay")denNgay ){
    return this.movieService.findAllFilm(tenPhim,tuNgay , denNgay);
  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
