import {
  Controller,
  Post,
  SerializeOptions,
  UseInterceptors,
  UploadedFile,
  Body,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/utils/decorators/public.decorator';
import { CreateUploadDto } from './dto/create-upload.dto';

@Public()
@ApiTags('upload')
@Controller('upload')
@SerializeOptions({ strategy: 'exposeAll' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @ApiOperation({ summary: 'uploadFile' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
  create(@UploadedFile() file, @Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(file);
  }
}
