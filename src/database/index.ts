import * as dotenv from 'dotenv';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
};

export function getDatabaseConfigConnectionQA(): TypeOrmModuleOptions {
    return {
        type: 'sqlite',
        database: ':memory:',
        entities: ['src/modules/**/entities/*.entity.{ts,js}'],
        dropSchema: true,
        migrationsRun: true,
        synchronize: true,
        logging: false,
    };
}
