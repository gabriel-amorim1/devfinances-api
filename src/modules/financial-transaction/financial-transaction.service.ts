import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialTransactionRepository } from './repositories/financial-transaction.repository';
import * as currency from 'currency.js';

@Injectable()
class FinancialTransactionService {
    constructor(
        @InjectRepository(FinancialTransactionRepository)
        private financialTransactionRepository: FinancialTransactionRepository,
    ) {}

    async create(financialTransactionData: CreateFinancialTransactionDTO) {
        const amount = currency(financialTransactionData.amount);

        const createdFinancialTransaction =
            await this.financialTransactionRepository.save({
                ...financialTransactionData,
                amount: amount.intValue,
            });

        return { ...createdFinancialTransaction, amount: amount.value };
    }
}

export { FinancialTransactionService };
