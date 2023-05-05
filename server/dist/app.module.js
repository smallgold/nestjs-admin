"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_modules_1 = require("./auth/auth.modules");
const orm_config_1 = require("./config/orm.config");
const project_module_1 = require("./project/project.module");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const core_1 = require("@nestjs/core");
const options_config_1 = require("./config/options.config");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [orm_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: orm_config_1.default,
            }),
            auth_modules_1.AuthModule,
            project_module_1.ProjectModule,
            upload_module_1.UploadModule,
        ],
        controllers: [],
        providers: !options_config_1.ISDEVELOPMENT
            ? [
                {
                    provide: core_1.APP_GUARD,
                    useClass: jwt_auth_guard_1.JwtAuthGuard,
                },
            ]
            : [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map