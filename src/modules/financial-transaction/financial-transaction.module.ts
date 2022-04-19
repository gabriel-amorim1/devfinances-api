import { FinancialTransactionController } from './financial-transaction.controller';
import { FinancialTransactionRepository } from './repositories/financial-transaction.repository';
import { FinancialTransactionService } from './financial-transaction.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([FinancialTransactionRepository])],
    controllers: [FinancialTransactionController],
    providers: [FinancialTransactionService],
})
export class FinancialTransactionModule {}
