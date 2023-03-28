import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { AUTH_SECRET, EXPIRESTIME } from '../config/options.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from './users.controller';
import { ToolsService } from 'src/utils/tools.service';
import { JwtValidateService } from 'src/utils/jwt.validate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: AUTH_SECRET,
      signOptions: { expiresIn: EXPIRESTIME },
    }),
  ],
  providers: [JwtStrategy, AuthService, ToolsService, JwtValidateService],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
