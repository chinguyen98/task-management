import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'chinguyen',
    password: '2478893',
    database: 'task-management',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}