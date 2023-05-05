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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_project_dto_1 = require("./create-project.dto");
class UpdateProjectDto extends (0, mapped_types_1.PartialType)(create_project_dto_1.CreateProjectDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'label',
        type: String,
        default: '',
        description: 'label',
    }),
    (0, class_validator_1.Length)(2),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'desc',
        type: String,
        default: '',
        description: 'desc',
    }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'options',
        type: String,
        default: '',
        description: 'options',
    }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "options", void 0);
exports.UpdateProjectDto = UpdateProjectDto;
//# sourceMappingURL=update-project.dto.js.map