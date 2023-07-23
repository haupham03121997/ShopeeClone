import { Star } from 'react-iconly'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { Breadcrumb, Button, Card, Col, Divider, Row, Space, Tag, Typography } from 'antd'
import { RiCheckboxCircleLine, RiShieldLine, RiShoppingBagLine, RiTimeLine, RiTruckLine } from 'react-icons/ri'

import { productApi } from 'src/apis/product.api'
import { formatCurrency } from 'src/utils/utils'
import { ProductListConfig } from 'src/types/product.type'
import ProductListLatest from 'src/components/ProductListLatest'
import SliderProducts from './SliderProducts'
import ProductDetailInfo from './ProductDetailInfo'

const ProductDetail = (): JSX.Element => {
    const { id } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productApi.getProductDetail(id as string)
    })
    const product = data?.data.data
    const queryConfig: ProductListConfig = { page: '1', limit: '20', category: product?.category._id }

    const { data: productRelated } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig),
        enabled: !!product,
        staleTime: 3 * 60 * 1000
    })

    const images = product?.images || []

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Breadcrumb>
                    <BreadcrumbItem className='dark:text-white'>Home</BreadcrumbItem>
                    <BreadcrumbItem className='dark:text-gray-300'>Product Detail</BreadcrumbItem>
                </Breadcrumb>
            </Col>
            <Col span={24}>
                {product && (
                    <Card className='relative rounded-md border border-@dark-80  bg-@dark-100 p-8'>
                        <Row gutter={[32, 0]}>
                            <Tag
                                className='absolute left-10 top-10 z-10 border-none bg-blue-600 bg-transparent text-white '
                                color='blue'
                            >
                                Featured
                            </Tag>

                            <SliderProducts images={images || []} />
                            <ProductDetailInfo product={product} />

                            <Col span={24}>
                                <Divider className='bg-@dark-80' />
                                <ProductListLatest data={productRelated?.data.data.products || []} />
                            </Col>
                        </Row>
                    </Card>
                )}
            </Col>
        </Row>
    )
}

export default ProductDetail
