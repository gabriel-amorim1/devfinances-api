import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Matches,
} from 'class-validator';

export class FinancialTransactionDTO {
    @IsUUID('4')
    id: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    amount: number;

    @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
    date: string;

    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date;
}
