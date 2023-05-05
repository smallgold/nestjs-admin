import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config = require(`./orm.config.${process.env.NODE_ENV}`);

export default registerAs('orm.config', (): TypeOrmModuleOptions => config);
