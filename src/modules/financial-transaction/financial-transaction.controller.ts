import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
import { GetAllFinancialTransactionsDTO } from './dtos/get-all-financial-transactions.dto';
import { FinancialTransactionService } from './financial-transaction.service';

@Controller('financial-transactions')
export class FinancialTransactionController {
    constructor(
        private financialTransactionService: FinancialTransactionService,
    ) {}

    @Post()
    async create(
        @Body() createFinancialTransactionDTO: CreateFinancialTransactionDTO,
    ) {
        return this.financialTransactionService.create(
            createFinancialTransactionDTO,
        );
    }

    @Get()
    async findAll(@Query() query: GetAllFinancialTransactionsDTO) {
        return this.financialTransactionService.findAll(query);
    }
}
