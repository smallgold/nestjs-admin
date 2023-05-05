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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_validate_service_1 = require("../utils/jwt.validate.service");
let AuthService = class AuthService {
    constructor(jwtService, jwtValidateService, userRepository) {
        this.jwtService = jwtService;
        this.jwtValidateService = jwtValidateService;
        this.userRepository = userRepository;
        this.saltRounds = 10;
    }
    async generateHash(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async compareHash(password, hash) {
        return bcrypt.compare(password, hash);
    }
    async hashPassword(password) {
        return await this.generateHash(password);
    }
    async findUser(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    getTokenForUser(user) {
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);
        this.jwtValidateService.addTokenToBlacklist(token);
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        jwt_validate_service_1.JwtValidateService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map