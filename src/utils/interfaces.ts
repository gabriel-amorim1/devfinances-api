export interface RequestGetAllInterface {
    withPagination?: string;
    showInactive?: string;
    page?: string;
    size?: string;
    sortParam?: string;
    sortOrder?: string;
    dateFilter?: string;
    startDateFilter?: string;
    endDateFilter?: string;
    updated_by_name?: string;
    updated_by_email?: string;
    created_by_name?: string;
    created_by_email?: string;
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

export interface ActivateDataInterface {
    active?: boolean;
    inactivation_date?: Date;
}
export interface UserRequestInterface {
    username: string;
    useremail: string;
}
export interface CreatedByInterface {
    created_by_name?: string;
    created_by_email?: string;
}

export interface UpdatedByInterface {
    updated_by_name?: string;
    updated_by_email?: string;
}

export type CreatedByAndUpdatedByInterface = CreatedByInterface &
    UpdatedByInterface;

export interface PaginateResponseProperties {
    count: number;
    limit: number;
    page: number;
    totalPages: number;
}
