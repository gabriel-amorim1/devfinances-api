import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    formatPaginateDataToResponse,
    formatParamsToTypeOrmOptionsWithPaginate,
} from '../../utils';
import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
import { GetAllFinancialTransactionsDTO } from './dtos/get-all-financial-transactions.dto';
import { UpdateFinancialTransactionDTO } from './dtos/update-financial-transaction.dto';
import { FinancialTransactionRepository } from './repositories/financial-transaction.repository';

@Injectable()
class FinancialTransactionService {
    constructor(
        @InjectRepository(FinancialTransactionRepository)
        private financialTransactionRepository: FinancialTransactionRepository,
    ) {}

    async create(financialTransactionData: CreateFinancialTransactionDTO) {
        return this.financialTransactionRepository.save(
            financialTransactionData,
        );
    }

    async findById(financialTransactionId: string) {
        const financialTransactionFound =
            await this.financialTransactionRepository.findOne(
                financialTransactionId,
            );

        if (!financialTransactionFound) {
            throw new NotFoundException('Financial Transaction not found.');
        }

        return financialTransactionFound;
    }

    async findAll(queryParams: GetAllFinancialTransactionsDTO) {
        const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams);

        const [data, count] =
            await this.financialTransactionRepository.findAndCount(options);

        return formatPaginateDataToResponse(queryParams, {
            data,
            count,
        });
    }

    async update(
        financialTransactionId: string,
        financialTransactionData: UpdateFinancialTransactionDTO,
    ) {
        const financialTransactionFound = await this.findById(
            financialTransactionId,
        );

        return this.financialTransactionRepository.save({
            ...financialTransactionFound,
            ...financialTransactionData,
        });
    }
}

export { FinancialTransactionService };
