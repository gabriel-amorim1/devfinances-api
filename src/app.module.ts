import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { FinancialTransactionModule } from './modules/financial-transaction/financial-transaction.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        FinancialTransactionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
