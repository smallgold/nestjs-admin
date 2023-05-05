import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
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
