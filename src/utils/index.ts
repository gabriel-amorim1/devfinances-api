import { dynamicFilter } from './filter';
import {
    OptionsTypeOrmGetAllWithoutPagination,
    OptionsTypeOrmGetAllWithPagination,
    PaginateResponseProperties,
    RequestGetAllInterface,
} from './interfaces';
import {
    buildSortParams,
    formatPaginateDataToResponse,
    getPaginationParams,
} from './paginate';

const formatParamsToTypeOrmOptionsWithPaginate = <T>(
    queryParams: T & RequestGetAllInterface,
): OptionsTypeOrmGetAllWithPagination => {
    const { sortParam, sortOrder } = buildSortParams(queryParams);

    const query = { ...queryParams };

    const where = dynamicFilter(query);

    const { take, skip } = getPaginationParams(queryParams);

    return {
        where,
        take,
        skip,
        order: { [sortParam]: `${sortOrder}` },
        orderBy: {
            columnName: sortParam,
            order: <'DESC' | 'ASC'>`${sortOrder}`,
        },
    };
};

export {
    formatParamsToTypeOrmOptionsWithPaginate,
    formatPaginateDataToResponse,
    RequestGetAllInterface,
    OptionsTypeOrmGetAllWithPagination,
    OptionsTypeOrmGetAllWithoutPagination,
    PaginateResponseProperties,
};
