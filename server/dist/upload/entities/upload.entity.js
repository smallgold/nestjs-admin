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
exports.Upload = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
var fileType;
(function (fileType) {
    fileType[fileType["image"] = 1] = "image";
    fileType[fileType["audio"] = 2] = "audio";
    fileType[fileType["video"] = 3] = "video";
    fileType[fileType["text"] = 4] = "text";
    fileType[fileType["doc"] = 5] = "doc";
    fileType[fileType["docx"] = 6] = "docx";
    fileType[fileType["xls"] = 7] = "xls";
    fileType[fileType["xlsx"] = 8] = "xlsx";
    fileType[fileType["pdf"] = 9] = "pdf";
})(fileType || (fileType = {}));
let Upload = class Upload {
};
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Upload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], Upload.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Upload.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Upload.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: fileType,
        default: 1,
    }),
    __metadata("design:type", Number)
], Upload.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Upload.prototype, "createTime", void 0);
Upload = __decorate([
    (0, typeorm_1.Entity)()
], Upload);
exports.Upload = Upload;
//# sourceMappingURL=upload.entity.js.map