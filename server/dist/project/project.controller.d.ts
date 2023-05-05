import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<import("./entities/project.entity").Project>;
    findAll(query: {
        keyWord: string;
        pageIndex: number;
        pageSize: number;
    }): Promise<{
        data: import("./entities/project.entity").Project[];
        total: number;
    }>;
    findOne(projectId: string): Promise<import("./entities/project.entity").Project[]>;
    update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<import("typeorm").UpdateResult>;
    remove(projectId: string): Promise<import("typeorm").DeleteResult>;
}
