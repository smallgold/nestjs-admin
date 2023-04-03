import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.modules';
import ormConfig from './config/orm.config';
import { ProjectModule } from './project/project.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ISDEVELOPMENT } from './config/options.config';

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
    ProjectModule,
  ],
  controllers: [],
  providers: !ISDEVELOPMENT
    ? [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ]
    : [],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(WhitelistMiddleware).forRoutes('*');
//   }
// }
