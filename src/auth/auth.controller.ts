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
import { User } from './user.entity';

@Controller('/auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('/login')
  async login(@CurrentUser() user: User, @Req() req, @Session() session) {
    if (!req.body.code) {
      throw new BadRequestException(['no captcha']);
    }
    if (!this.toolsService.validateCaptcha(req.body.code, session.captcha)) {
      throw new BadRequestException(['captcha error']);
    }
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('/profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
