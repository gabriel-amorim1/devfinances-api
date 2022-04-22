import * as request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { FinancialTransactionRepository } from '../src/modules/financial-transaction/repositories/financial-transaction.repository';
import { Test } from '@nestjs/testing';

describe('Cats', () => {
    let app: INestApplication;
    const financialTransactionRepository = {
        save: () => [
            {
                description: 'FinancialTransactionCreateTest',
                amount: 22.22,
                date: '18/04/2022',
                id: 'b1b4d780-5e96-434c-bd45-b8f21e25bf56',
                created_at: '2022-04-18T22:57:45.000Z',
                updated_at: '2022-04-18T22:57:45.000Z',
            },
        ],
        findAndCount: () => {
            return [[], 0];
        },
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(FinancialTransactionRepository)
            .useValue(financialTransactionRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/POST financial-transactions', () => {
        it(`should create a financial transaction`, () => {
            return request(app.getHttpServer())
                .post('/financial-transactions')
                .send({
                    description: 'FinancialTransactionCreateTest',
                    amount: 22.22,
                    date: '18/04/2022',
                })
                .expect(201)
                .expect(financialTransactionRepository.save());
        });

        it(`should return a bad request`, () => {
            return request(app.getHttpServer())
                .post('/financial-transactions')
                .send({
                    description: '',
                    amount: 22.222,
                    date: '2022-04-18',
                })
                .expect(400);
        });
    });

    describe('/GET financial-transactions', () => {
        it(`should send no filters in query and return status 200`, () => {
            return request(app.getHttpServer())
                .get('/financial-transactions')
                .expect(200)
                .expect({
                    data: [],
                    count: 0,
                    limit: 20,
                    page: 1,
                    totalPages: 0,
                });
        });

        it(`should send all filters in query and return status 200`, () => {
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
});
