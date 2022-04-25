import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IdRequestDTO } from '../../utils/dtos/id-request.dto';
import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
import { GetAllFinancialTransactionsDTO } from './dtos/get-all-financial-transactions.dto';
import { UpdateFinancialTransactionDTO } from './dtos/update-financial-transaction.dto';
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

    @Get(':id')
    async findById(@Param() { id }: IdRequestDTO) {
        return this.financialTransactionService.findById(id);
    }

    @Get()
    async findAll(@Query() query: GetAllFinancialTransactionsDTO) {
        return this.financialTransactionService.findAll(query);
    }

    @Put(':id')
    async update(
        @Param() { id }: IdRequestDTO,
        @Body() updateFinancialTransactionDTO: UpdateFinancialTransactionDTO,
    ) {
        return this.financialTransactionService.update(
            id,
            updateFinancialTransactionDTO,
        );
    }
}
