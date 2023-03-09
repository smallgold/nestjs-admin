import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { AttendeeAnswerEnum } from './attendee.entity';
import { Event, PaginatedEvents } from './event.entity';
import { CreateEventDto } from './input/create-event.dto';
import { ListEvents, WhenEventFilter } from './input/list.events';
import { UpdateEventDto } from './input/update-event.dto';
import { paginate, PaginateOptions } from './paginator/paginator';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}
  private getEventsBaseQuery() {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC');
  }

  public getEventsWithAttendeeCountQuery() {
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap('e.attendeeCount', 'e.attendees')
      .loadRelationCountAndMap(
        'e.attendeeAccepted',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Accepted,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeMaybe',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Maybe,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeRejected',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Rejected,
          }),
      );
  }

  private async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
    let query = this.getEventsWithAttendeeCountQuery();
    if (!filter) {
      return query;
    }
    if (filter.when * 1 === WhenEventFilter.Today) {
      query = query.andWhere(
        `e.when >= CURDATE() AND e.when <= CURDATE() + INTERVAL 1 DAY`,
      );
    }
    if (filter.when * 1 === WhenEventFilter.Tommorow) {
      query = query.andWhere(
        `e.when >= CURDATE() + INTERVAL 1 DAY AND e.when <= CURDATE() + INTERVAL 2 DAY`,
      );
    }
    if (filter.when * 1 === WhenEventFilter.ThisWeek) {
      query = query.andWhere(`YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1)`);
    }
    if (filter.when * 1 === WhenEventFilter.NextWeek) {
      query = query.andWhere(
        `YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1) + 1`,
      );
    }
    return await query;
  }

  public async getEventsWithAttendeeCountFilteredPaginated(
    filter: ListEvents,
    paginateOptions: PaginateOptions,
  ): Promise<PaginatedEvents> {
    return await paginate(
      await this.getEventsWithAttendeeCountFiltered(filter),
      paginateOptions,
    );
  }

  public async getEventWithAttendeeCount(
    id: number,
  ): Promise<Event | undefined> {
    const query = this.getEventsWithAttendeeCountQuery().andWhere(
      'e.id = :id',
      { id },
    );
    this.logger.debug(query.getSql());
    return await query.getOne();
  }

  public async findOne(id: number): Promise<Event | undefined> {
    return await this.eventsRepository.findOne({ where: { id } });
  }

  public async createEvent(input: CreateEventDto, user: User): Promise<Event> {
    return await this.eventsRepository.save({
      ...input,
      organizer: user,
      when: new Date(input.when),
    });
  }

  public async updateEvent(
    event: Event,
    input: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsRepository.save({
      ...input,
      ...event,
      when: new Date(input.when),
    });
  }

  public async deleteEvent(id: number) {
    return await this.eventsRepository
      .createQueryBuilder('e')
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  public async getEventsAttendedByUserIdPaginated(
    userId: number,
    paginateOptions: PaginateOptions,
  ): Promise<PaginatedEvents> {
    return await paginate<Event>(
      this.getEventsAttendedByUserIdQuery(userId),
      paginateOptions,
    );
  }

  private getEventsAttendedByUserIdQuery(userId: number) {
    return this.getEventsBaseQuery()
      .leftJoinAndSelect('e.attemdees', 'a')
      .where('a.userId = :userId', { userId });
  }
}
