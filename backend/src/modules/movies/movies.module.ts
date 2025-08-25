import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../config/movies/movie.entity';
import { MovieService } from '../../services/movie/movie.service';
import { MovieController } from 'src/controllers/movie/movie.controller'; 
import { CinemasModule } from '../cinema/cinema.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    CinemasModule
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [TypeOrmModule, MovieService]
})
export class MoviesModule {}