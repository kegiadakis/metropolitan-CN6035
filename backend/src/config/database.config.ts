import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Cinema } from './cinemas/cinema.entity';
import { Movie } from './movies/movie.entity';
import { Reservation } from './reservations/reservation.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: "127.0.0.1",
  port: 3306,
  username: "cinema_user",
  password: "1234",
  database: "cinema_booking",
  entities: [User, Cinema, Movie, Reservation],
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
  migrationsRun: false,
  dropSchema: false,
};