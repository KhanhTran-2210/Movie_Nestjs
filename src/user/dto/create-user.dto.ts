import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'tai_khoan', type: String })
  tai_khoan: string;
  @ApiProperty({ description: 'ho_ten', type: String })
  ho_ten: string;
  @ApiProperty({ description: 'email', type: String })
  email: string;
  @ApiProperty({ description: 'so_dt', type: String })
  so_dt: string;
  @ApiProperty({ description: 'mat_khau', type: String })
  mat_khau: string;
  @ApiProperty({ description: 'loai_nguoi_dung', type: String })
  loai_nguoi_dung: string;
}
