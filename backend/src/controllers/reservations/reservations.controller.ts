import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from 'src/model/model.dto';
import { ReservationsService } from 'src/services/reservations/reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(@Req() requestObject) {
    if (!requestObject["user"])
      throw new ForbiddenException();

    var userId = requestObject["user"].userId;
    // this is the admin user, inaccessible to all (I don't know the password:) )
    if (userId == 1)
      return this.reservationsService.findAll();

    return this.reservationsService.findUserReservations(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateReservationDto, @Req() requestObject) {
    var userId = requestObject["user"].userId;
    dto.user_id = userId;
    return this.reservationsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() dto: UpdateReservationDto, 
    @Req() requestObject
  ) {
    if(!id) {
      throw new BadRequestException("Invalid reservation id.");
    }

    return this.reservationsService.update(+id, dto, requestObject["user"].userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() requestObject) {
    if(!id) {
      throw new BadRequestException("Invalid reservation id.");
    }
    return this.reservationsService.remove(+id, requestObject["user"].userId);
  }
}