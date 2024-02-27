import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'ten_phim', type: String })
  ten_phim: string;

  @ApiProperty({ description: 'trailer', type: String })
  trailer: string;

  @ApiProperty({ description: 'mo_ta', type: String })
  mo_ta: string;

  @ApiProperty({ description: 'ngay_khoi_chieu', type: String })
  ngay_khoi_chieu: string;

  @ApiProperty({ description: 'danh_gia', type: Number })
  danh_gia: Number;

  @ApiProperty({ description: 'hot', type: Boolean })
  hot: Boolean;

  @ApiProperty({ description: 'dang_chieu', type: Boolean })
  dang_chieu: Boolean;
}
