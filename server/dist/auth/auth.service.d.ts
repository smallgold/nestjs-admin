import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtValidateService } from 'src/utils/jwt.validate.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly jwtValidateService;
    private readonly userRepository;
    constructor(jwtService: JwtService, jwtValidateService: JwtValidateService, userRepository: Repository<User>);
    private readonly saltRounds;
    private generateHash;
    compareHash(password: string, hash: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
    findUser(username: string): Promise<User | undefined>;
    getTokenForUser(user: User): string;
}
