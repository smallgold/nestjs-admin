import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDto {
  @ApiProperty({
    name: 'file',
    type: 'string',
    default: '',
    description: 'file',
    format: 'binary',
  })
  file: any;
}
