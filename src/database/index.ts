import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: './src/database/database.sqlite',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
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
