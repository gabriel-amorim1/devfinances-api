export interface RequestGetAllInterface {
    page?: string;
    size?: string;
    sortParam?: string;
    sortOrder?: string;
    dateFilter?: string;
    startDateFilter?: string;
    endDateFilter?: string;
}

export interface OptionsTypeOrmGetAllWithPagination
    extends OptionsTypeOrmGetAllWithoutPagination {
    take: number;
    skip: number;
}

export interface OptionsTypeOrmGetAllWithoutPagination {
    where: Record<string, unknown>;
    order: {
        created_at?: 'DESC' | 'ASC';
    };
    orderBy: {
        columnName: string;
        order: 'DESC' | 'ASC';
    };
}

export interface PaginateResponseProperties {
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
