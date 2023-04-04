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
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('project')
@ApiBearerAuth()
@Controller('project')
@SerializeOptions({ strategy: 'exposeAll' })
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(
    @Query() query: { keyWord: string; pageIndex: number; pageSize: number },
  ) {
    return this.projectService.findAll(query);
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.projectService.findOne(projectId);
  }

  @Patch(':projectId')
  update(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  remove(@Param('projectId') projectId: string) {
    return this.projectService.remove(projectId);
  }
}
