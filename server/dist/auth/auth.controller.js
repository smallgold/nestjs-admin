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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const tools_service_1 = require("../utils/tools.service");
const typeorm_1 = require("typeorm");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("../utils/decorators/current-user.decorator");
const options_config_1 = require("../config/options.config");
const create_user_dto_1 = require("./dto/create.user.dto");
const user_entity_1 = require("./entities/user.entity");
const public_decorator_1 = require("../utils/decorators/public.decorator");
const typeorm_2 = require("@nestjs/typeorm");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
let AuthController = class AuthController {
    constructor(authService, toolsService, userRepository) {
        this.authService = authService;
        this.toolsService = toolsService;
        this.userRepository = userRepository;
    }
    async login(loginDto, session) {
        if (!loginDto.code || !session.captcha) {
            throw new common_1.BadRequestException(['no captcha']);
        }
        this.toolsService.validateCaptchaCount(session);
        if (!this.toolsService.validateCaptcha(loginDto.code, session.captcha)) {
            if (!session.captcha.errorCount) {
                session.captcha.errorCount = 0;
            }
            session.captcha.errorCount++;
            throw new common_1.BadRequestException(['captcha error']);
        }
        const user = await this.authService.findUser(loginDto.username);
        if (user &&
            this.authService.compareHash(loginDto.password, user.password)) {
            return {
                expiresTime: options_config_1.EXPIRESTIME,
                token: this.authService.getTokenForUser(user),
            };
        }
        else {
            throw new common_1.BadRequestException(['username or password error']);
        }
    }
    async create(createUserDto, session) {
        const user = new user_entity_1.User();
        if (this.toolsService.validateCaptcha(createUserDto.code, session.captcha)) {
            throw new common_1.BadRequestException(['no captcha']);
        }
        if (createUserDto.password !== createUserDto.retypedPassword) {
            throw new common_1.BadRequestException(['Passwords are not indentical']);
        }
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });
        if (existingUser) {
            throw new common_1.BadRequestException(['username or email is already taken']);
        }
        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.nickName = createUserDto.nickName;
        user.gender = createUserDto.gender;
        user.address = createUserDto.address;
        user.industry = createUserDto.industry;
        user.photoId = createUserDto.photoId;
        return Object.assign(Object.assign({}, (await this.userRepository.save(user))), { token: this.authService.getTokenForUser(user) });
    }
    async generateCaptcha(res, session) {
        this.toolsService.validateCaptchaCount(session);
        const captcha = await this.toolsService.captche();
        session.captcha = {
            code: captcha.text,
            codeTime: Date.now(),
            errorCount: 0,
            failTime: 0,
        };
        res.type('svg');
        res.send(captcha.data);
    }
    async getProfile(user) {
        return user;
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/captcha'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateCaptcha", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('/auth'),
    (0, common_1.SerializeOptions)({ strategy: 'exposeAll' }),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        tools_service_1.ToolsService,
        typeorm_1.Repository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map