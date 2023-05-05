"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const swagger_1 = require("@nestjs/swagger");
const options_config_1 = require("./config/options.config");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
    }));
    if (options_config_1.ISDEVELOPMENT) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('this is a title')
            .setDescription('this is a description')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('doc', app, document);
    }
    app.useStaticAssets((0, path_1.join)(__dirname, 'images'), {
        prefix: '/files',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map