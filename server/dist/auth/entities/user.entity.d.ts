import { Profile } from './profile.entity';
export declare class User {
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
    profile: Profile;
}
