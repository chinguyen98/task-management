import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dotenv = require('dotenv');
dotenv.config('../../.env');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'task-management',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}