import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Attendee } from './attendee.entity';
import { CreateEventDto } from './input/create-event.dto';
import { Event } from './event.entity';
import { EventsService } from './events.service';
import { UpdateEventDto } from './input/update-event.dto';
import { ListEvents } from './input/list.events';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
    private readonly eventsService: EventsService,
  ) {}

  @Get()
  async findAll(@Query() filter: ListEvents) {
    return await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
      filter,
      {
        total: true,
        currentPage: filter.page * 1 || 1,
        limit: 10,
      },
    );
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      where: { id: MoreThan(2) },
    });
  }

  @Get('/practice2')
  async practice2() {
    // const event = await this.repository.findOne({ where: { id: 1 } });
    // const attendee = new Attendee();
    // attendee.name = 'Jerry';
    // attendee.event = event;
    // await this.attendeeRepository.save(attendee);
    // return event;
    return await this.repository
      .createQueryBuilder('e')
      .select(['e.id', 'e.name'])
      .orderBy('e.id', 'ASC')
      .take(3)
      .getMany();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.eventsService.getEventWithAttendeeCount(id);
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
    @CurrentUser() user: User,
  ) {
    return await this.eventsService.createEvent(input, user);
  }
  @Patch()
  @UseGuards(AuthGuardJwt)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null,
        'you are not authorized to change this event',
      );
    }

    return await this.eventsService.updateEvent(event, input);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuardJwt)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null,
        'you are not authorized to change this event',
      );
    }

    await this.eventsService.deleteEvent(id);
  }
}
