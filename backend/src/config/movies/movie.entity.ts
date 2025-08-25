import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cinema } from '../cinemas/cinema.entity';
import { Reservation } from '../reservations/reservation.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column()
  title: string;

  @Column()
  duration: number; // in minutes

  @Column()
  rating: string;

  @ManyToOne(() => Cinema, (cinema) => cinema.movies)
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;

  @OneToMany(() => Reservation, (reservation) => reservation.movie)
  @JoinColumn({ name: 'reservation_id' })
  reservations: Reservation[];
}