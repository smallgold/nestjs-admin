import { Profile } from 'src/auth/entities/profile.entity';
import { User } from 'src/auth/entities/user.entity';

module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'nest-events',
  entities: [User, Profile],
  synchronize: true,
};
