import React, { useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Col, Row, Pagination } from 'antd'

import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import { productApi } from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import { PAGINATION_DEFAULT } from 'src/constants/pagination'
import { SkeletonProductList } from 'src/components/Skeletons'
import useQueryConfig from 'src/hooks/useQueryConfig'

const ProductList = (): JSX.Element => {
    const refDiv = useRef<HTMLDivElement | null>(null)
    const [_, setSearchParams] = useSearchParams({})
    const { queryConfig } = useQueryConfig()

    const { data, isLoading } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
        staleTime: 3 * 60 * 1000
    })

    const totalItems = useMemo(
        () => Number(data?.data.data.pagination.limit || 1) * Number(data?.data.data.pagination.page_size || 1),
        [data]
    )

    const productsList = data?.data.data.products || []
    const pageSize = Number(data?.data.data.pagination.page_size) || 0
    return (
        <Row gutter={[32, 32]} className='pb-8'>
            <div ref={refDiv} />
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
                                    onChange={(page) => {
                                        refDiv.current?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        })
                                        setSearchParams({ ...queryConfig, page: String(page) })
                                    }}
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
