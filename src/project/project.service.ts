import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    const data = new Project();
    data.label = createProjectDto.label;
    data.desc = createProjectDto.desc;
    data.options = createProjectDto.options;
    return this.projectRepository.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    // const data = await this.projectRepository.find();
    const data = await this.projectRepository.find({
      where: {
        label: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.projectRepository.count({
      where: {
        label: Like(`%${query.keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  async findOne(projectId: string) {
    const data = await this.projectRepository.find({
      where: {
        projectId: projectId,
      },
    });
    return data;
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update({ projectId }, updateProjectDto);
  }

  async remove(projectId: string) {
    return await this.projectRepository.delete({ projectId });
  }
}
