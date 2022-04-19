import { Body, Controller, Post } from '@nestjs/common';
import { CreateFinancialTransactionDTO } from './dtos/create-financial-transaction.dto';
import { FinancialTransactionService } from './financial-transaction.service';

@Controller('financial-transactions')
export class FinancialTransactionController {
    constructor(
        private financialTransactionService: FinancialTransactionService,
    ) {}

    @Post()
    create(
        @Body() CreateFinancialTransactionDTO: CreateFinancialTransactionDTO,
    ) {
        return this.financialTransactionService.create(
            CreateFinancialTransactionDTO,
        );
    }
}
