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
                amount: 2222,
                date: '18/04/2022',
                id: 'b1b4d780-5e96-434c-bd45-b8f21e25bf56',
                created_at: '2022-04-18T22:57:45.000Z',
                updated_at: '2022-04-18T22:57:45.000Z',
            },
        ],
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
                .expect({
                    ...financialTransactionRepository.save(),
                    amount: 22.22,
                });
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

    afterAll(async () => {
        await app.close();
    });
});
