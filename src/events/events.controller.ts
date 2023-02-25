import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
        currentPage: filter.page || 1,
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
    return await this.eventsService.getEvent(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }
  @Patch()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  ) {
    const event = await this.repository.findOne({ where: { id } });
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const event = await this.repository.findOne({ where: { id } });
    await this.repository.remove(event);
  }
}
