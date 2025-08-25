import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Reservation } from '../reservations/reservation.entity';

@Entity('cinemas')
export class Cinema {
  @PrimaryGeneratedColumn()
  cinema_id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Movie, (movie) => movie.cinema)
  @JoinColumn({ name: 'movie_id' })
  movies: Movie[];

  @OneToMany(() => Reservation, (reservation) => reservation.cinema)
  @JoinColumn({ name: 'reservation_id' })
  reservations: Reservation[];
}