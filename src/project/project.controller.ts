import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
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

  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('/findAll')
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
