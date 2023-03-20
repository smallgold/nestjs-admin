import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from 'src/utils/tools.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './input/create.user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req,
    @Session() session,
  ) {
    const user = new User();
    if (this.toolsService.validateCaptcha(req.body.code, session.captcha)) {
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
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('/captcha')
  async generateCaptcha(@Res() res, @Session() session) {
    const captcha = await this.toolsService.captche();
    session.captcha = captcha.text;
    res.type('svg');
    res.send(captcha.data);
  }
}
