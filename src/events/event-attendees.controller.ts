import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AttendeesService } from './attendees.service';

@Controller('events/:eventId/attendees')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventAttendeesController {
  constructor(private readonly attendeesSeverce: AttendeesService) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Param('evnetId') eventId: number) {
    return await this.attendeesSeverce.findByEventId(eventId);
  }
}
