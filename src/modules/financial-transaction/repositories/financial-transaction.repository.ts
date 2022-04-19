import { EntityRepository, Repository } from 'typeorm';

import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';

@EntityRepository(FinancialTransactionEntity)
class FinancialTransactionRepository extends Repository<FinancialTransactionEntity> {}

export { FinancialTransactionRepository };
