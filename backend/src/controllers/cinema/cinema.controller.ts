import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateCinemaDto, UpdateCinemaDto } from 'src/model/model.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CinemasService } from 'src/services/cinema/cinema.service';

@Controller('cinemas')
@UseGuards(JwtAuthGuard)
export class CinemaController {
    constructor(private readonly cinemaService: CinemasService) {}

  @Get()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateCinemaDto) {
    return this.cinemaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCinemaDto) {
    return this.cinemaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }
}
