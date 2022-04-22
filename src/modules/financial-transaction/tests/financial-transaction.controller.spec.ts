import { FinancialTransactionController } from '../financial-transaction.controller';
import { FinancialTransactionRepository } from '../repositories/financial-transaction.repository';
import { FinancialTransactionService } from '../financial-transaction.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FinancialTransactionController', () => {
    let financialTransactionController: FinancialTransactionController;
    let financialTransactionService: FinancialTransactionService;

    const financialTransactionSut = {
        description: 'FinancialTransactionCreateTest',
        amount: 22.22,
        date: '18/04/2022',
        id: 'b1b4d780-5e96-434c-bd45-b8f21e25bf56',
        created_at: new Date(),
        updated_at: new Date(),
    };

    const createFinancialTransactionSut = {
        description: 'FinancialTransactionCreateTest',
        amount: 22.22,
        date: '18/04/2022',
        id: 'b1b4d780-5e96-434c-bd45-b8f21e25bf56',
        created_at: new Date(),
        updated_at: new Date(),
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [FinancialTransactionController],
            providers: [
                FinancialTransactionService,
                {
                    provide: getRepositoryToken(FinancialTransactionRepository),
                    useValue: {},
                },
            ],
        }).compile();

        financialTransactionService = await moduleRef.resolve(
            FinancialTransactionService,
        );
        financialTransactionController =
            moduleRef.get<FinancialTransactionController>(
                FinancialTransactionController,
            );
    });

    describe('create', () => {
        it('should return a financialTransaction', async () => {
            const serviceSpy = jest
                .spyOn(financialTransactionService, 'create')
                .mockResolvedValue(financialTransactionSut);

            expect(
                await financialTransactionController.create(
                    createFinancialTransactionSut,
                ),
            ).toBe(financialTransactionSut);
            expect(serviceSpy).toBeCalledWith(createFinancialTransactionSut);
        });
    });

    describe('findAll', () => {
        it('should call findAll service and return an array of financial transactions', async () => {
            const serviceSpy = jest
                .spyOn(financialTransactionService, 'findAll')
                .mockResolvedValue({
                    data: [financialTransactionSut],
                    count: 1,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                });

            const queryParams = {
                description: 'description',
                amount: 2,
                date: '22/04/2022',
                page: '1',
                size: '20',
                sortOrder: 'desc',
                created_at: '2022-04-22',
                updated_at: '2022-04-22',
                startDateFilter: '2022-04-22',
                endDateFilter: '2022-04-22',
                dateFilter: 'created_at',
                sortParam: 'created_at',
            };

            expect(
                await financialTransactionController.findAll(queryParams),
            ).toStrictEqual({
                data: [financialTransactionSut],
                count: 1,
                limit: 20,
                page: 1,
                totalPages: 1,
            });
            expect(serviceSpy).toBeCalledWith(queryParams);
        });
    });
});
