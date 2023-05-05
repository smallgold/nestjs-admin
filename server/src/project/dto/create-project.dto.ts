import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    name: 'label',
    type: String,
    default: '',
    description: 'label',
  })
  @Length(2)
  label: string;

  @ApiProperty({
    name: 'desc',
    type: String,
    default: '',
    description: 'desc',
  })
  desc: string;

  @ApiProperty({
    name: 'options',
    type: String,
    default: '',
    description: 'options',
  })
  options: string;
}
