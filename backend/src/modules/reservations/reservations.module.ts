import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/config/reservations/reservation.entity';
import { ReservationsService } from 'src/services/reservations/reservations.service'; 
import { ReservationsController } from 'src/controllers/reservations/reservations.controller';
import { UserModule } from '../user/user.module';
import { MoviesModule } from '../movies/movies.module';
import { CinemasModule } from '../cinema/cinema.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    UserModule,
    CinemasModule,
    MoviesModule
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
  exports: [TypeOrmModule, ReservationsService]
})
export class ReservationsModule {}