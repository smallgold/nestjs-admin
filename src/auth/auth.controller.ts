import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  SerializeOptions,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { ToolsService } from 'src/utils/tools.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CurrentUser } from '../utils/decorators/current-user.decorator';
import { EXPIRESTIME } from '../config/options.config';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/utils/decorators/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('/auth')
@SerializeOptions({ strategy: 'exposeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Session() session) {
    if (!loginDto.code || !session.captcha) {
      throw new BadRequestException(['no captcha']);
    }
    this.toolsService.validateCaptchaCount(session);
    if (!this.toolsService.validateCaptcha(loginDto.code, session.captcha)) {
      if (!session.captcha.errorCount) {
        session.captcha.errorCount = 0;
      }
      session.captcha.errorCount++;
      throw new BadRequestException(['captcha error']);
    }
    const user = await this.authService.findUser(loginDto.username);
    if (
      user &&
      this.authService.compareHash(loginDto.password, user.password)
    ) {
      return {
        expiresTime: EXPIRESTIME,
        token: this.authService.getTokenForUser(user),
      };
    } else {
      throw new BadRequestException(['username or password error']);
    }
  }

  @Public()
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto, @Session() session) {
    const user = new User();
    if (
      this.toolsService.validateCaptcha(createUserDto.code, session.captcha)
    ) {
      throw new BadRequestException(['no captcha']);
    }

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not indentical']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }

    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.nickName = createUserDto.nickName;
    user.gender = createUserDto.gender;
    user.address = createUserDto.address;
    user.industry = createUserDto.industry;
    user.photoId = createUserDto.photoId;
    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }

  @Public()
  @Get('/captcha')
  async generateCaptcha(@Res() res, @Session() session) {
    this.toolsService.validateCaptchaCount(session);
    const captcha = await this.toolsService.captche();
    session.captcha = {
      code: captcha.text,
      codeTime: Date.now(),
      errorCount: 0,
      failTime: 0,
    };
    res.type('svg');
    res.send(captcha.data);
  }

  @Get('/profile')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
