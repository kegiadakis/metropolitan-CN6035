import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from '../../config/cinemas/cinema.entity';
import { CinemasService } from '../../services/cinema/cinema.service';
import { CinemaController } from '../../controllers/cinema/cinema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  providers: [CinemasService],
  controllers: [CinemaController],
  exports: [TypeOrmModule, CinemasService]
})
export class CinemasModule {}