import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/utils/decorators/public.decorator';

@ApiTags('upload')
@Controller('upload')
@SerializeOptions({ strategy: 'exposeAll' })
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @ApiOperation({ summary: 'uploadFile' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFile() file) {
    console.log(file);
    return this.uploadService.create(file);
  }
}
