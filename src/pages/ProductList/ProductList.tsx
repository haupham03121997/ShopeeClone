import { useQuery } from '@tanstack/react-query'
import { Col, Pagination, Row } from 'antd'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import { productApi } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'

const ProductList = (): JSX.Element => {
    const queryParams = useQueryParams()
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', queryParams],
        queryFn: () => productApi.getProductList(queryParams)
    })
    console.log(data)
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
                        <Pagination total={100} pageSize={8} defaultCurrent={1} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ProductList
