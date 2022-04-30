import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfigConnectionQA } from '../src/database';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const databaseConfig = getDatabaseConfigConnectionQA();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(databaseConfig)],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Health is ok!');
    });
});
