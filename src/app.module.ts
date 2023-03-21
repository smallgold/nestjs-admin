import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.modules';
import ormConfig from './config/orm.config';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';
import { ProjectModule } from './project/project.module';
import { WhitelistMiddleware } from './middleware/whitelistMiddleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WhitelistMiddleware).forRoutes('*');
  }
}
