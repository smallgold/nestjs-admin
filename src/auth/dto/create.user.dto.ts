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
    name: 'firstName',
    type: String,
    default: '',
    description: 'firstName',
    required: false,
  })
  @Length(2)
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    type: String,
    default: '',
    description: 'lastName',
    required: false,
  })
  @Length(2)
  lastName: string;

  @ApiProperty({
    name: 'email',
    type: String,
    default: '',
    description: 'email',
    required: false,
  })
  @IsEmail()
  email: string;
}
