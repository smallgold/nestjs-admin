import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtValidateService } from 'src/utils/jwt.validate.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtValidateService: JwtValidateService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private readonly saltRounds = 10;

  private async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async hashPassword(password: string): Promise<string> {
    return await this.generateHash(password);
  }

  public async findUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  public getTokenForUser(user: User): string {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.jwtValidateService.addTokenToBlacklist(token);
    return token;
  }
}
