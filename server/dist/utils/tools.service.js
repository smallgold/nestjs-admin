"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const svgCaptcha = require("svg-captcha");
let ToolsService = class ToolsService {
    async captche(size = 4) {
        const captcha = await svgCaptcha.create({
            size,
            fontSize: 50,
            width: 100,
            height: 34,
            background: '#cc9966',
        });
        return captcha;
    }
    validateCaptcha(code, captcha) {
        const CODETIMELINES = 5 * 60 * 1000;
        const now = Date.now();
        if (captcha && now - captcha.codeTime > CODETIMELINES) {
            throw new common_1.BadRequestException([
                'Captcha code timeout, Please replace the captcha',
            ]);
        }
        if (code &&
            captcha &&
            captcha.code &&
            code.toLocaleLowerCase() === captcha.code.toLocaleLowerCase()) {
            delete captcha.code;
            return true;
        }
        return false;
    }
    validateCaptchaCount(session) {
        if (!session.captcha)
            return;
        const MAX_TRIES = 3;
        const CAPTCHATIMELINES = 1 * 60 * 60 * 1000;
        if (session.captcha.errorCount < MAX_TRIES)
            return;
        if (!session.captcha.failTime) {
            session.captcha.failTime = Date.now();
        }
        if (session.captcha.errorCount >= MAX_TRIES) {
            const now = Date.now();
            if (now - session.captcha.failTime < CAPTCHATIMELINES) {
                throw new common_1.BadRequestException([
                    'Too many attempts, please try again later',
                ]);
            }
            session.captcha = {
                code: '',
                codeTime: 0,
                errorCount: 0,
                failTime: 0,
            };
        }
    }
};
ToolsService = __decorate([
    (0, common_1.Injectable)()
], ToolsService);
exports.ToolsService = ToolsService;
//# sourceMappingURL=tools.service.js.map