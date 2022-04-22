import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';

import { COMMON_DATE_FILTERS } from '../../../utils/constants';

const dateFilters = [...COMMON_DATE_FILTERS, 'date'];
const sortParams = [...dateFilters, 'description', 'amount'];

export class GetAllFinancialTransactionsDTO {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Matches(/^\d*(\.\d{1,2})?$/)
    amount?: number;

    @IsOptional()
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/)
    date?: string;

    @IsOptional()
    @Matches(/\d/)
    readonly page?: string;

    @IsOptional()
    @Matches(/\d/)
    readonly size?: string;

    @IsOptional()
    @IsEnum(['desc', 'DESC', 'asc', 'ASC'], {
        message: `sortOrder must be one of: ${['desc', 'DESC', 'asc', 'ASC']}`,
    })
    readonly sortOrder?: string;

    @IsOptional()
    @IsString()
    readonly created_at?: string;

    @IsOptional()
    @IsString()
    readonly updated_at?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    readonly startDateFilter?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    readonly endDateFilter?: string;

    @IsOptional()
    @IsEnum(dateFilters, {
        message: `dateFilter must be one of: ${dateFilters.join(', ')}`,
    })
    readonly dateFilter?: string;

    @IsOptional()
    @IsEnum(sortParams, {
        message: `sortParam must be one of: ${sortParams.join(', ')}`,
    })
    readonly sortParam?: string;
}
