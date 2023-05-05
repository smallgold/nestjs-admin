"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtValidateService = void 0;
const common_1 = require("@nestjs/common");
let JwtValidateService = class JwtValidateService {
    constructor() {
        this.tokenList = [];
    }
    addTokenToBlacklist(token) {
        if (!this.tokenList.length) {
            this.tokenList.push(token);
        }
    }
    isTokenBlacklisted(token) {
        let bool = false;
        let index = -1;
        this.tokenList.map((v, i) => {
            if (v === token) {
                index = i;
                bool = true;
            }
        });
        this.tokenList.splice(index, 1);
        return bool;
    }
};
JwtValidateService = __decorate([
    (0, common_1.Injectable)()
], JwtValidateService);
exports.JwtValidateService = JwtValidateService;
//# sourceMappingURL=jwt.validate.service.js.map