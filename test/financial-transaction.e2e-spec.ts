import * as request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { FinancialTransactionEntity } from '../src/modules/financial-transaction/entities/financial-transaction.entity';
import { FinancialTransactionModule } from '../src/modules/financial-transaction/financial-transaction.module';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfigConnectionQA } from '../src/database';

describe('FinancialTransaction suite test e2e', () => {
    let app: INestApplication;
    let createdFinancialTransaction: FinancialTransactionEntity;

    beforeAll(async () => {
        const databaseConfig = getDatabaseConfigConnectionQA();

        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(databaseConfig),
                FinancialTransactionModule,
            ],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/POST financial-transactions', () => {
        it(`should create a financial transaction`, async () => {
            const data = {
                description: 'FinancialTransactionCreateTest',
                amount: 22.22,
                date: '18/04/2022',
            };

            const res = await request(app.getHttpServer())
                .post('/financial-transactions')
                .send(data);

            const { id, created_at, updated_at, ...props } = res.body;
            createdFinancialTransaction = res.body;
            expect(res.statusCode).toBe(201);
            expect(props).toEqual(data);
            expect(id).not.toBeUndefined();
            expect(created_at).not.toBeUndefined();
            expect(updated_at).not.toBeUndefined();
        });

        it(`should return a bad request`, async () => {
            const res = await request(app.getHttpServer())
                .post('/financial-transactions')
                .send({
                    description: '',
                    amount: 22.222,
                    date: '2022-04-18',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
                expect.arrayContaining([
                    'description should not be empty',
                    'amount must be a number conforming to the specified constraints',
                    'date must match /^\\d{2}\\/\\d{2}\\/\\d{4}$/ regular expression',
                ]),
            );
        });

        it(`should return a bad request when send no body`, async () => {
            const res = await request(app.getHttpServer())
                .post('/financial-transactions')
                .send();

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
                expect.arrayContaining([
                    'description should not be empty',
                    'amount must be a number conforming to the specified constraints',
                    'date must match /^\\d{2}\\/\\d{2}\\/\\d{4}$/ regular expression',
                ]),
            );
        });
    });

    describe('/GET financial-transactions/:id', () => {
        it(`should return status 200`, () => {
            return request(app.getHttpServer())
                .get(
                    `/financial-transactions/${createdFinancialTransaction.id}`,
                )
                .expect(200)
                .expect(createdFinancialTransaction);
        });

        it(`should return status 400`, async () => {
            const res = await request(app.getHttpServer())
                .get('/financial-transactions/invalid-id')
                .send();

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
                expect.arrayContaining(['id must be a UUID']),
            );
        });
    });

    describe('/GET financial-transactions', () => {
        it(`should send no filters in query and return status 200`, () => {
            return request(app.getHttpServer())
                .get('/financial-transactions')
                .expect(200)
                .expect({
                    data: [createdFinancialTransaction],
                    count: 1,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                });
        });

        it(`should send all filters in query and return status 200`, () => {
            return request(app.getHttpServer())
                .get('/financial-transactions')
                .query({
                    description: createdFinancialTransaction.description,
                    amount: createdFinancialTransaction.amount,
                    date: createdFinancialTransaction.date,
                    page: '1',
                    size: '20',
                    sortOrder: 'DESC',
                    created_at: new Date(createdFinancialTransaction.created_at)
                        .toISOString()
                        .slice(0, 10),
                    updated_at: new Date(createdFinancialTransaction.updated_at)
                        .toISOString()
                        .slice(0, 10),
                    sortParam: 'created_at',
                })
                .expect(200)
                .expect({
                    data: [createdFinancialTransaction],
                    count: 1,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                });
        });

        it(`should send all filters in query and return status 200 with data as any empty array`, () => {
            return request(app.getHttpServer())
                .get('/financial-transactions')
                .query({
                    description: 'description',
                    amount: 2,
                    date: '22/04/2022',
                    page: '1',
                    size: '20',
                    sortOrder: 'DESC',
                    created_at: '2022-04-22',
                    updated_at: '2022-04-22',
                    startDateFilter: '2022-04-22',
                    endDateFilter: '2022-04-22',
                    dateFilter: 'created_at',
                    sortParam: 'created_at',
                })
                .expect(200)
                .expect({
                    data: [],
                    count: 0,
                    limit: 20,
                    page: 1,
                    totalPages: 0,
                });
        });
    });

    describe('/PUT financial-transactions/:id', () => {
        it(`should update a financial transaction`, async () => {
            const updateData = {
                description: 'FinancialTransactionUpdateTest',
                amount: 55.22,
                date: '25/04/2022',
            };

            const res = await request(app.getHttpServer())
                .put(
                    `/financial-transactions/${createdFinancialTransaction.id}`,
                )
                .send(updateData);

            const { id, created_at, updated_at, ...props } = res.body;

            expect(res.statusCode).toBe(200);
            expect(props).toEqual(updateData);
            expect(id).toBe(createdFinancialTransaction.id);
            expect(created_at).toBe(createdFinancialTransaction.created_at);
            expect(updated_at).not.toBeUndefined();
        });

        it(`should return a bad request with invalid body`, async () => {
            const res = await request(app.getHttpServer())
                .put(
                    `/financial-transactions/${createdFinancialTransaction.id}`,
                )
                .send({
                    description: '',
                    amount: 22.222,
                    date: '2022-04-18',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
                expect.arrayContaining([
                    'description should not be empty',
                    'amount must be a number conforming to the specified constraints',
                    'date must match /^\\d{2}\\/\\d{2}\\/\\d{4}$/ regular expression',
                ]),
            );
        });

        it(`should return a bad request when send invalid id`, async () => {
            const res = await request(app.getHttpServer())
                .put('/financial-transactions/invalid-id')
                .send();

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
                expect.arrayContaining(['id must be a UUID']),
            );
        });
    });
});
