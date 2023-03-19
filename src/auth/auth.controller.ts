import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  SerializeOptions,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ToolsService } from 'src/utils/tools.service';
import { AuthGuardJwt } from './auth-guard.jwt';
import { AuthGuardLocal } from './auth-guard.local';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';

@Controller('/auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User, @Req() req, @Session() session) {
    if (this.toolsService.captcheValid(req.body.code, session.captcha)) {
      throw new BadRequestException(['no captcha']);
    }
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('/profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
