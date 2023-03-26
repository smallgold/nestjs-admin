import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  SerializeOptions,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { ToolsService } from 'src/utils/tools.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { EXPIRESTIME } from '../config/options.config';
import { User } from './user.entity';

@Controller('/auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('/login')
  async login(@Req() req, @Session() session) {
    if (!req.body.code || !session.captcha) {
      throw new BadRequestException(['no captcha']);
    }
    this.toolsService.validateCaptchaCount(session);
    if (!this.toolsService.validateCaptcha(req.body.code, session.captcha)) {
      if (!session.captcha.errorCount) {
        session.captcha.errorCount = 0;
      }
      session.captcha.errorCount++;
      throw new BadRequestException(['captcha error']);
    }
    const user = await this.authService.findUser(req.body.username);
    if (
      user &&
      this.authService.compareHash(req.body.password, user.password)
    ) {
      return {
        expiresTime: EXPIRESTIME,
        token: this.authService.getTokenForUser(user),
      };
    } else {
      throw new BadRequestException(['username or password error']);
    }
  }

  @Get('/profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
