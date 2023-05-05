import { LoginDto } from './login.dto';
export declare class CreateUserDto extends LoginDto {
    retypedPassword: string;
    nickName: string;
    gender: number;
    email: string;
    address: string;
    industry: string;
    photoId: string;
}
