import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/config/cinemas/cinema.entity';
import { Movie } from 'src/config/movies/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from 'src/model/model.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    @InjectRepository(Cinema)
    private cinemaRepo: Repository<Cinema>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepo.find({ relations: ['cinema'] });
  }

  findByCinemaId(cinema_id: number): Promise<Movie[]> {
    return this.movieRepo.find({where: {cinema: {cinema_id: cinema_id}}, relations: ['cinema']});
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepo.findOne({ where: { movie_id: id }, relations: ['cinema'] });
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const cinema = await this.cinemaRepo.findOne({ where: { cinema_id: dto.cinema_id } });
    if (!cinema) {
      throw new NotFoundException("Cinema requested not found.");
    }
    const movie = this.movieRepo.create({ ...dto, cinema });
    return this.movieRepo.save(movie);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException("Movie reuqested not found.");
    }
    Object.assign(movie, dto);
    return this.movieRepo.save(movie);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepo.delete(id);
  }
}