import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/config/cinemas/cinema.entity';
import { Movie } from 'src/config/movies/movie.entity';
import { Reservation } from 'src/config/reservations/reservation.entity';
import { User } from 'src/config/users/user.entity';
import { CreateReservationDto, UpdateReservationDto } from 'src/model/model.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    @InjectRepository(Cinema)
    private cinemaRepo: Repository<Cinema>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find({ relations: ['user', 'movie', 'cinema'] });
  }

  findOne(id: number): Promise<Reservation> {
    return this.reservationRepo.findOne({ where: { reservation_id: id }, relations: ['user', 'movie', 'cinema'] });
  }

  findUserReservations(user_id: number): Promise<Reservation[]> {
    return this.reservationRepo.find({where: {user: {user_id: user_id}}, relations: ['movie', 'cinema']});
  }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const user = await this.userRepo.findOne({ where: { user_id: dto.user_id } });
    const movie = await this.movieRepo.findOne({ where: { movie_id: dto.movie_id } });
    const cinema = await this.cinemaRepo.findOne({ where: { cinema_id: dto.cinema_id } });

    if (!user) {
      throw new NotFoundException("Failed to find user specified.");
    }
    if (!movie) {
      throw new NotFoundException("Failed to find movie specified.");
    }
    if (!cinema) {
      throw new NotFoundException("Failed to find cinema specified.");
    }

    const reservation = this.reservationRepo.create({
        user: user,
        movie: movie,
        cinema: cinema,
        ...dto
    });

    return this.reservationRepo.save(reservation);
  }

  async update(
    id: number, 
    dto: UpdateReservationDto, 
    user_id_requesting: number
  ): Promise<Reservation> {
    
    // Check if the user updating is admin (id == 1) or is the owner.
    var whereFilter = {
      reservation_id: id,
      user: user_id_requesting == 1 ? {} : {user_id: user_id_requesting}
    }
    
    const reservation = await this.reservationRepo.findOne({
      where: whereFilter
    });
    
    if (!reservation) {
      throw new NotFoundException("Could not find reservation specified.");
    }
    
    Object.assign(reservation, dto);
    return this.reservationRepo.save(reservation);
  }

  async remove(id: number, user_id_requesting: number): Promise<void> {
    // Check if the user removing is admin (id == 1) or is the owner.
    var whereFilter = {
      reservation_id: id,
      user: user_id_requesting == 1 ? {} : {user_id: user_id_requesting}
    }
    await this.reservationRepo.delete(whereFilter);
  }
}