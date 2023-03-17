import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.modules';
import ormConfig from './config/orm.config';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    AuthModule,
    EventsModule,
    SchoolModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
