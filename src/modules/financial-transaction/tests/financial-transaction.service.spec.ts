import { Test, TestingModule } from '@nestjs/testing';

import { FinancialTransactionRepository } from '../repositories/financial-transaction.repository';
import { FinancialTransactionService } from '../financial-transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FinancialTransactionService', () => {
    let financialTransactionService: FinancialTransactionService;
    let financialTransactionRepository: FinancialTransactionRepository;

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
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                FinancialTransactionService,
                {
                    provide: getRepositoryToken(FinancialTransactionRepository),
                    useValue: {
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        financialTransactionRepository = await moduleRef.resolve(
            getRepositoryToken(FinancialTransactionRepository),
        );
        financialTransactionService =
            moduleRef.get<FinancialTransactionService>(
                FinancialTransactionService,
            );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        expect(financialTransactionService).toBeDefined();
        expect(financialTransactionRepository).toBeDefined();
    });

    describe('create', () => {
        it('should return a financialTransaction', async () => {
            const repositorySpy = jest
                .spyOn(financialTransactionRepository, 'save')
                .mockResolvedValue(financialTransactionSut);

            expect(
                await financialTransactionService.create(
                    createFinancialTransactionSut,
                ),
            ).toStrictEqual(financialTransactionSut);
            expect(repositorySpy).toBeCalledWith({
                ...createFinancialTransactionSut,
                amount: 2222,
            });
        });
    });
});
