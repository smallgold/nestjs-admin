"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    create(createProjectDto) {
        const data = new project_entity_1.Project();
        data.label = createProjectDto.label;
        data.desc = createProjectDto.desc;
        data.options = createProjectDto.options;
        return this.projectRepository.save(data);
    }
    async findAll(query) {
        const data = await this.projectRepository.find({
            where: {
                label: (0, typeorm_2.Like)(`%${query.keyWord}%`),
            },
            order: {
                id: 'DESC',
            },
            skip: (query.pageIndex - 1) * query.pageSize,
            take: query.pageSize,
        });
        const total = await this.projectRepository.count({
            where: {
                label: (0, typeorm_2.Like)(`%${query.keyWord}%`),
            },
        });
        return {
            data,
            total,
        };
    }
    async findOne(projectId) {
        const data = await this.projectRepository.find({
            where: {
                projectId: projectId,
            },
        });
        return data;
    }
    async update(projectId, updateProjectDto) {
        return await this.projectRepository.update({ projectId }, updateProjectDto);
    }
    async remove(projectId) {
        return await this.projectRepository.delete({ projectId });
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map