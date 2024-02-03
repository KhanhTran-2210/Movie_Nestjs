import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { TicketModule } from './ticket/ticket.module';
import { CinemaModule } from './cinema/cinema.module';

@Module({
  imports: [UserModule, MovieModule, TicketModule, CinemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
