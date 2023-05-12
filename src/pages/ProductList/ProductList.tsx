import { isUndefined, omitBy } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { Col, Pagination, Row } from 'antd'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import { productApi } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import { useSearchParams } from 'react-router-dom'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}

const ProductList = (): JSX.Element => {
    const [_, setSearchParams] = useSearchParams({})
    const queryParams: QueryConfig = useQueryParams()

    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || 1,
            sort_by: queryParams.sort_by,
            order: queryParams.order,
            exclude: queryParams.exclude,
            rating_filter: queryParams.rating_filter,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min
        },
        isUndefined
    )

    const { data, isLoading } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig as ProductListConfig)
    })
    console.log(queryConfig)
    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <SortProductList />
            </Col>
            <Col span={24}>
                <Row gutter={[32, 32]}>
                    {!isLoading &&
                        data?.data.data.products.map((item) => (
                            <Col span={8} key={item._id}>
                                <Product product={item} />
                            </Col>
                        ))}

                    <Col span={24} className='mb-8 flex justify-end'>
                        <Pagination
                            total={data?.data.data.pagination.page_size}
                            current={Number(queryConfig.page)}
                            pageSize={data?.data.data.pagination.limit || 1}
                            showSizeChanger={false}
                            onChange={(page) => {
                                setSearchParams({ ...queryConfig, page: String(page) })
                            }}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ProductList
