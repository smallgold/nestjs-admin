import { Profile } from 'src/auth/entities/profile.entity';
import { User } from 'src/auth/entities/user.entity';
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';
import { Subject } from 'src/school/subject.entity';
import { Teacher } from 'src/school/teacher.entity';

module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'nest-events',
  entities: [Event, Attendee, Subject, Teacher, User, Profile],
  synchronize: true,
};
