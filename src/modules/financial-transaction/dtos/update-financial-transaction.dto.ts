import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class UpdateFinancialTransactionDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    amount?: number;

    @IsOptional()
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
    date?: string;
}
