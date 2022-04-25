import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { PaginateResponseProperties } from '../../utils';
import { IdRequestDTO } from '../../utils/dtos/id-request.dto';
import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
import { GetAllFinancialTransactionsDTO } from './dtos/get-all-financial-transactions.dto';
import { UpdateFinancialTransactionDTO } from './dtos/update-financial-transaction.dto';
import { FinancialTransactionEntity } from './entities/financial-transaction.entity';
import { FinancialTransactionService } from './financial-transaction.service';

@Controller('financial-transactions')
export class FinancialTransactionController {
    constructor(
        private financialTransactionService: FinancialTransactionService,
    ) {}

    @Post()
    async create(
        @Body() createFinancialTransactionDTO: CreateFinancialTransactionDTO,
    ): Promise<FinancialTransactionEntity> {
        return this.financialTransactionService.create(
            createFinancialTransactionDTO,
        );
    }

    @Get(':id')
    async findById(
        @Param() { id }: IdRequestDTO,
    ): Promise<FinancialTransactionEntity> {
        return this.financialTransactionService.findById(id);
    }

    @Get()
    async findAll(@Query() query: GetAllFinancialTransactionsDTO): Promise<{
        data: FinancialTransactionEntity[];
        count: number;
        limit: number;
        page: number;
        totalPages: number;
    }> {
        return this.financialTransactionService.findAll(query);
    }

    @Put(':id')
    async update(
        @Param() { id }: IdRequestDTO,
        @Body() updateFinancialTransactionDTO: UpdateFinancialTransactionDTO,
    ): Promise<FinancialTransactionEntity> {
        return this.financialTransactionService.update(
            id,
            updateFinancialTransactionDTO,
        );
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param() { id }: IdRequestDTO): Promise<void> {
        await this.financialTransactionService.remove(id);
    }
}
