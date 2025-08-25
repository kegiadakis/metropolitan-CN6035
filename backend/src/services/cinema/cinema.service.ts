import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from '../../config/cinemas/cinema.entity';
import { CreateCinemaDto, UpdateCinemaDto } from 'src/model/model.dto';


@Injectable()
export class CinemasService {
  constructor(
    @InjectRepository(Cinema)
    private cinemaRepo: Repository<Cinema>,
  ) {}

  findAll(): Promise<Cinema[]> {
    return this.cinemaRepo.find();
  }

  findOne(id: number): Promise<Cinema> {
    return this.cinemaRepo.findOne({ where: { cinema_id: id } });
  }

  create(dto: CreateCinemaDto): Promise<Cinema> {
    const cinema = this.cinemaRepo.create(dto);
    return this.cinemaRepo.save(cinema);
  }

  async update(id: number, dto: UpdateCinemaDto): Promise<Cinema> {
    const cinema = await this.findOne(id);
    Object.assign(cinema, dto);
    return this.cinemaRepo.save(cinema);
  }

  async remove(id: number): Promise<void> {
    await this.cinemaRepo.delete(id);
  }
}