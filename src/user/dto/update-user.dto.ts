import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  ho_ten: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  so_dt: string;

  @IsString()
  @IsOptional()
  mat_khau: string;

  @IsString()
  @IsOptional()
  loai_nguoi_dung: string;
}
