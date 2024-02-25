import { ApiProperty } from '@nestjs/swagger';

export default class loginDTO {
  @ApiProperty({ description: 'tai_khoan', type: String })
  tai_khoan: string;
  @ApiProperty({ description: 'mat_khau', type: String })
  mat_khau: string;
}
