import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    name: 'username',
    type: String,
    default: '',
    description: 'username',
  })
  @Length(5)
  username: string;

  @ApiProperty({
    name: 'password',
    type: String,
    default: '',
    description: 'password',
  })
  @Length(8)
  password: string;

  @ApiProperty({ name: 'code', type: String, default: '', description: 'code' })
  @Length(4)
  code: string;
}
