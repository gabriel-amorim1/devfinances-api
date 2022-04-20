import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    formatPaginateDataToResponse,
    formatParamsToTypeOrmOptionsWithPaginate,
    RequestGetAllInterface,
} from '../../utils';
import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
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

    async findAll(queryParams: RequestGetAllInterface) {
        const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams);

        const [data, count] =
            await this.financialTransactionRepository.findAndCount(options);

        return formatPaginateDataToResponse(queryParams, {
            data,
            count,
        });
    }
}

export { FinancialTransactionService };
