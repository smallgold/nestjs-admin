import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { AttendeesService } from './attendees.service';
import { EventsService } from './events.service';
import { CreateAttendeeDto } from './input/create-attendee.dto';

@Controller('events-attendance')
export class CurrentUserEventAttendanceController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly attendeesService: AttendeesService,
  ) {}

  // @Get()
  // @UseGuards(AuthGuardJwt)
  // @UseInterceptors(ClassSerializerInterceptor)
  // async findAll(@CurrentUser() user: User, @Query('page') page: 1) {
  //   return await this.eventsService.getEventsAttendedByUserIdPaginated(
  //     user.id,
  //     { limit: 6, currentPage: page },
  //   );
  // }

  // @Get(':/eventId')
  // @UseGuards(AuthGuardJwt)
  // @UseInterceptors(ClassSerializerInterceptor)
  // async findOne(@Param('eventId') eventId: number, @CurrentUser() user: User) {
  //   const attendee = await this.attendeesService.findOneByEventIdAndUserId(
  //     eventId,
  //     user.id,
  //   );
  //   if (!attendee) {
  //     throw new NotFoundException();
  //   }
  //   return attendee;
  // }

  // @Put(':/eventId')
  // @UseGuards(AuthGuardJwt)
  // @UseInterceptors(ClassSerializerInterceptor)
  // async createOrUpdate(
  //   @Param('eventId', ParseIntPipe) eventId: number,
  //   @Body() input: CreateAttendeeDto,
  //   @CurrentUser() user: User,
  // ) {
  //   return this.attendeesService.createOrUpdate(input, eventId, user.id);
  // }
}
