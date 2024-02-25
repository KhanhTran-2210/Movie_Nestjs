import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ description: 'ma_phim', type: Number })
  ma_phim: number;
  @ApiProperty({ description: 'ma_rap', type: Number })
  ma_rap: number;
  @ApiProperty({ description: 'ngay_gio_chieu', type: String })
  ngay_gio_chieu: string;
  @ApiProperty({ description: 'gia_ve', type: Number })
  gia_ve: number;
}
