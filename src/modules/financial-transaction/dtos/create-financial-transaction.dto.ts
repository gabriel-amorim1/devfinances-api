import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateFinancialTransactionDTO {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;

    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    date: string;
}
