import { useMemo, useState } from 'react'
import { isUndefined, omitBy } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Col, Row, Pagination } from 'antd'

import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import { productApi } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import { PAGINATION_DEFAULT } from 'src/constants/pagination'
import { SORT_PRODUCT } from 'src/constants/sort'
import { SkeletonProductList } from 'src/components/Skeletons'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}

const ProductList = (): JSX.Element => {
    const [_, setSearchParams] = useSearchParams({})
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
            category: queryParams.category
        },
        isUndefined
    )

    const { data, isLoading } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig as ProductListConfig)
    })

    const totalItems = useMemo(
        () => Number(data?.data.data.pagination.limit || 1) * Number(data?.data.data.pagination.page_size || 1),
        [data]
    )

    const productsList = data?.data.data.products || []
    const pageSize = Number(data?.data.data.pagination.page_size) || 0
    return (
        <Row gutter={[32, 32]} className='pb-8'>
            <Col span={24}>
                <SortProductList queryConfig={queryConfig} />
            </Col>
            <Col span={24}>
                {isLoading && <SkeletonProductList />}
                {!isLoading && (
                    <Row gutter={[32, 32]}>
                        {productsList.map((item) => (
                            <Col span={8} key={item._id}>
                                <Product product={item} />
                            </Col>
                        ))}

                        {pageSize > 1 && (
                            <Col span={24} className='mb-8 flex justify-end'>
                                <Pagination
                                    total={totalItems}
                                    current={Number(queryConfig.page)}
                                    pageSize={PAGINATION_DEFAULT.LIMIT}
                                    showSizeChanger={false}
                                    onChange={(page) => setSearchParams({ ...queryConfig, page: String(page) })}
                                />
                            </Col>
                        )}
                    </Row>
                )}
            </Col>
        </Row>
    )
}

export default ProductList
