import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { TicketModule } from './ticket/ticket.module';
import { CinemaModule } from './cinema/cinema.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user/user.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CheckRoleAdminMiddleware } from './middleware/check_role_admin.middleware';

@Module({
  imports: [
    UserModule,
    MovieModule,
    TicketModule,
    CinemaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'SECRET_KEY',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user/profile');
    consumer.apply(AuthMiddleware, CheckRoleAdminMiddleware).forRoutes('movie/XoaPhim')
  }
}
