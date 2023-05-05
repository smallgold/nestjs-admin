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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const login_dto_1 = require("./login.dto");
class CreateUserDto extends login_dto_1.LoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'retypedPassword',
        type: String,
        default: '',
        description: 'retypedPassword',
    }),
    (0, class_validator_1.Length)(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "retypedPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'nickName',
        type: String,
        default: '',
        description: 'nickName',
        required: false,
    }),
    (0, class_validator_1.Length)(18),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'gender',
        type: Number,
        default: 1,
        description: 'gender',
        required: false,
    }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        type: String,
        default: '',
        description: 'email',
        required: false,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        type: String,
        default: '',
        description: 'email',
        required: false,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'industry',
        type: String,
        default: '',
        description: 'industry',
        required: false,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'photoId',
        type: String,
        default: '',
        description: 'photoId',
        required: false,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photoId", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create.user.dto.js.map