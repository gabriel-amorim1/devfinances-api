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
        date: '2022-04-18',
        id: 'b1b4d780-5e96-434c-bd45-b8f21e25bf56',
        created_at: new Date(),
        updated_at: new Date(),
    };

    const createFinancialTransactionSut = {
        description: 'FinancialTransactionCreateTest',
        amount: 22.22,
        date: '2022-04-18',
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
                        findOne: jest.fn(),
                        findAndCount: jest.fn(),
                        delete: jest.fn(),
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
                date: '2022-04-22',
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

    describe('update', () => {
        it('should return a financialTransaction', async () => {
            const updateFinancialTransactionSut = {
                description: 'FinancialTransactionUpdateTest',
                amount: 72.62,
                date: '2022-04-22',
            };

            const findOneSpy = jest
                .spyOn(financialTransactionRepository, 'findOne')
                .mockResolvedValue(financialTransactionSut);

            const saveSpy = jest
                .spyOn(financialTransactionRepository, 'save')
                .mockResolvedValue({
                    ...financialTransactionSut,
                    ...updateFinancialTransactionSut,
                });

            expect(
                await financialTransactionService.update(
                    financialTransactionSut.id,
                    updateFinancialTransactionSut,
                ),
            ).toStrictEqual({
                ...financialTransactionSut,
                ...updateFinancialTransactionSut,
            });
            expect(findOneSpy).toBeCalledWith(financialTransactionSut.id);
            expect(saveSpy).toBeCalledWith({
                ...financialTransactionSut,
                ...updateFinancialTransactionSut,
            });
        });

        it('should return return a NotFoundException', async () => {
            expect.hasAssertions();

            const updateFinancialTransactionSut = {
                description: 'FinancialTransactionUpdateTest',
                amount: 72.62,
                date: '2022-04-22',
            };

            const findOneSpy = jest
                .spyOn(financialTransactionRepository, 'findOne')
                .mockResolvedValue(undefined);

            const saveSpy = jest.spyOn(financialTransactionRepository, 'save');

            try {
                await financialTransactionService.update(
                    financialTransactionSut.id,
                    updateFinancialTransactionSut,
                );
            } catch (error) {
                expect(error.message).toBe('Financial Transaction not found.');
                expect(findOneSpy).toBeCalledWith(financialTransactionSut.id);
                expect(saveSpy).not.toBeCalled();
            }
        });
    });

    describe('delete', () => {
        it('should delete a financialTransaction', async () => {
            const findOneSpy = jest
                .spyOn(financialTransactionRepository, 'findOne')
                .mockResolvedValue(financialTransactionSut);

            const deleteResult = {
                raw: [],
                affected: 1,
            };

            const deleteSpy = jest
                .spyOn(financialTransactionRepository, 'delete')
                .mockResolvedValue(deleteResult);

            expect(
                await financialTransactionService.remove(
                    financialTransactionSut.id,
                ),
            ).toStrictEqual(deleteResult);
            expect(findOneSpy).toBeCalledWith(financialTransactionSut.id);
            expect(deleteSpy).toBeCalledWith(financialTransactionSut.id);
        });

        it('should return return a NotFoundException', async () => {
            expect.hasAssertions();

            const findOneSpy = jest
                .spyOn(financialTransactionRepository, 'findOne')
                .mockResolvedValue(undefined);

            const deleteSpy = jest.spyOn(
                financialTransactionRepository,
                'delete',
            );

            try {
                await financialTransactionService.remove(
                    financialTransactionSut.id,
                );
            } catch (error) {
                expect(error.message).toBe('Financial Transaction not found.');
                expect(findOneSpy).toBeCalledWith(financialTransactionSut.id);
                expect(deleteSpy).not.toBeCalled();
            }
        });
    });
});
