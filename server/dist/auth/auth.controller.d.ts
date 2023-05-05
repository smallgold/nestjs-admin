import { ToolsService } from 'src/utils/tools.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly toolsService;
    private readonly userRepository;
    constructor(authService: AuthService, toolsService: ToolsService, userRepository: Repository<User>);
    login(loginDto: LoginDto, session: any): Promise<{
        expiresTime: number;
        token: string;
    }>;
    create(createUserDto: CreateUserDto, session: any): Promise<{
        token: string;
        id: number;
        username: string;
        password: string;
        email: string;
        nickName: string;
        gender: number;
        address: string;
        industry: string;
        photoId: string;
        createTime: Date;
        profile: import("./entities/profile.entity").Profile;
    }>;
    generateCaptcha(res: any, session: any): Promise<void>;
    getProfile(user: User): Promise<User>;
}
