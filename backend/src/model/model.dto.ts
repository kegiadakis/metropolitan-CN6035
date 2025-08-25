import { Optional } from "@nestjs/common";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, Min, MinLength } from "class-validator";

export class CreateCinemaDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  location: string;

  description?: string;
}

export class UpdateCinemaDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  description?: string;
}

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  
  @IsNotEmpty()
  rating: string;

  @IsNotEmpty()
  @IsNumber()
  cinema_id: number;
}

export class UpdateMovieDto {
  @IsOptional()
  title?: string;
  
  @IsOptional()
  duration?: number;

  @IsOptional()
  rating?: string;
}

export class CreateReservationDto {
  @IsOptional()
  user_id: number;
  
  @IsNotEmpty()
  @IsNumber()
  movie_id: number;
  
  @IsNotEmpty()
  @IsNumber()
  cinema_id: number;

  @IsNotEmpty()
  @MinLength(8)
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @MinLength(5)
  time: string;

  // seat_numbers will be a string including all different seats, split by "," separator
  @IsNotEmpty()
  seat_numbers: string;
}

export class UpdateReservationDto {
  @IsOptional()
  date?: string;
  
  @IsOptional()
  time?: string;

  @IsOptional()
  seat_numbers?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;
}