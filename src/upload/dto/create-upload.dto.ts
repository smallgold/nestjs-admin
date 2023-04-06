import { ApiProperty } from '@nestjs/swagger';

enum fileType {
  image = 1,
  audio,
  mp4,
  doc,
  xls,
  pdf,
}

export class CreateUploadDto {
  @ApiProperty({
    name: 'fileName',
    type: String,
    default: '',
    description: 'fileName',
    required: false,
  })
  fileName: string;

  @ApiProperty({
    name: 'fileSize',
    type: String,
    default: '',
    description: 'fileSize',
    required: false,
  })
  fileSize: string;

  @ApiProperty({
    name: 'fileType',
    type: Number,
    default: '',
    description: 'fileType',
    required: false,
  })
  fileType: fileType;

  @ApiProperty({
    name: 'file',
    type: 'string',
    default: '',
    description: 'file',
    format: 'binary',
  })
  file: any;
}
