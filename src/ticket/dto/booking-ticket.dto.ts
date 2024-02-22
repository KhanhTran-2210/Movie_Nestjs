import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class BookingTicketDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'maLichChieu', type: Number })
  maLichChieu: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ApiProperty({ type: () => [TicketDto] })
  danhSachVe: TicketDto[];
}

export class TicketDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'nguoiDungId', type: Number })
  nguoiDungId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'maGhe', type: Number })
  maGhe: number;
}
