import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: Repository<Project>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(query: {
        keyWord: string;
        pageIndex: number;
        pageSize: number;
    }): Promise<{
        data: Project[];
        total: number;
    }>;
    findOne(projectId: string): Promise<Project[]>;
    update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    remove(projectId: string): Promise<import("typeorm").DeleteResult>;
}
