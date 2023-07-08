import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'
import { PAGINATION_DEFAULT } from 'src/constants/pagination'
import { SORT_PRODUCT } from 'src/constants/sort'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}

function useQueryConfig() {
    const queryParams: QueryConfig = useQueryParams()

    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || PAGINATION_DEFAULT.CURRENT_PAGE,
            limit: queryParams.limit || PAGINATION_DEFAULT.LIMIT,
            sort_by: queryParams.sort_by || SORT_PRODUCT.CREATED_AT,
            order: queryParams.order || 'desc',
            exclude: queryParams.exclude,
            rating_filter: queryParams.rating_filter,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            category: queryParams.category,
            name: queryParams.name
        },
        isUndefined
    )
    return { queryConfig }
}
export default useQueryConfig
