import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  async validate(decodeToken: any) {
    // Kiểm tra xem decodedToken có chứa thông tin về quyền của người dùng hay không
    if (!decodeToken || !decodeToken.loai_nguoi_dung) {
      throw new UnauthorizedException('Invalid token');
    }
    // Kiểm tra nếu vai trò của người dùng là "admin"
    // if (decodeToken.loai_nguoi_dung !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource',
    //   );
    // }

    return decodeToken;
  }
}
