module.exports = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'nest-admin',
    entities: ['dist/**/entities/*.entity{.ts,.js}'],
    synchronize: true,
    charset: 'utf8mb4',
};
//# sourceMappingURL=orm.config.development.js.map