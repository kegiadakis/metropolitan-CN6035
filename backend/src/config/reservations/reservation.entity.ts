import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';
import { Cinema } from '../cinemas/cinema.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  // seat_numbers will be a string including all different seats, split by "," separator
  @Column()
  seat_numbers: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reservations)  
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Cinema, (cinema) => cinema.reservations)
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;
}