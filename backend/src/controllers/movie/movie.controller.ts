import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from 'src/model/model.dto';
import { MovieService } from 'src/services/movie/movie.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MovieController {
    constructor(private readonly moviesService: MovieService) {}

    @Get()
    findAll(@Query("cinema_id") cinema_id: number) {
        if (cinema_id)
            return this.moviesService.findByCinemaId(cinema_id);
        return this.moviesService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @Post()
    create(@Body() dto: CreateMovieDto) {
        return this.moviesService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
        return this.moviesService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(+id);
    }
}
