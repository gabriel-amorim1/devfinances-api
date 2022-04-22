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
                        findAndCount: jest.fn(),
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
                amount: 22.22,
            });
        });
    });

    describe('findAll', () => {
        it('should return an array of financial transactions', async () => {
            const repositorySpy = jest
                .spyOn(financialTransactionRepository, 'findAndCount')
                .mockResolvedValue([[financialTransactionSut], 1]);

            expect(await financialTransactionService.findAll({})).toStrictEqual(
                {
                    data: [financialTransactionSut],
                    count: 1,
                    limit: 20,
                    page: 1,
                    totalPages: 1,
                },
            );
            expect(repositorySpy).toBeCalledWith({
                where: {},
                take: 20,
                skip: 0,
                order: { created_at: 'DESC' },
                orderBy: { columnName: 'created_at', order: 'DESC' },
            });
        });

        it('should call service with filters and return an array of financial transactions', async () => {
            const repositorySpy = jest
                .spyOn(financialTransactionRepository, 'findAndCount')
                .mockResolvedValue([[financialTransactionSut], 1]);

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
                await financialTransactionService.findAll(queryParams),
            ).toStrictEqual({
                data: [financialTransactionSut],
                count: 1,
                limit: 20,
                page: 1,
                totalPages: 1,
            });
            expect(repositorySpy).toBeCalled();
        });
    });
});
