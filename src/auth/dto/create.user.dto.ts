import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class CreateUserDto extends LoginDto {
  @ApiProperty({
    name: 'retypedPassword',
    type: String,
    default: '',
    description: 'retypedPassword',
  })
  @Length(8)
  retypedPassword: string;

  @ApiProperty({
    name: 'nickName',
    type: String,
    default: '',
    description: 'nickName',
    required: false,
  })
  @Length(18)
  nickName: string;

  @ApiProperty({
    name: 'gender',
    type: Number,
    default: 1,
    description: 'gender',
    required: false,
  })
  gender: number;

  @ApiProperty({
    name: 'email',
    type: String,
    default: '',
    description: 'email',
    required: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'email',
    type: String,
    default: '',
    description: 'email',
    required: false,
  })
  address: string;

  @ApiProperty({
    name: 'industry',
    type: String,
    default: '',
    description: 'industry',
    required: false,
  })
  industry: string;

  @ApiProperty({
    name: 'photoId',
    type: String,
    default: '',
    description: 'photoId',
    required: false,
  })
  photoId: string;
}
