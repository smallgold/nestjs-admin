"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const config = require(`./orm.config.${process.env.NODE_ENV}`);
exports.default = (0, config_1.registerAs)('orm.config', () => config);
//# sourceMappingURL=orm.config.js.map