import { useQuery } from '@tanstack/react-query'
import { Col, Pagination, Row, Space, Tag, Typography } from 'antd'
import { CloseSquare } from 'react-iconly'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { productApi } from 'src/apis/product.api'
import Product from 'src/components/Product'
import { SkeletonProductList } from 'src/components/Skeletons'
import SortProductList from 'src/components/SortProductList'
import { PAGINATION_DEFAULT } from 'src/constants/pagination'
import { PATH } from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

const SearchProducts = (): JSX.Element => {
    const navigate = useNavigate()
    const [_, setSearchParams] = useSearchParams()
    const { queryConfig } = useQueryConfig()
    const { data, isLoading } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig as ProductListConfig)
    })

    const totalItems = Number(data?.data.data.pagination.limit || 1) * Number(data?.data.data.pagination.page_size || 1)

    const productsList = data?.data.data.products || []
    const pageSize = Number(data?.data.data.pagination.page_size) || 0

    return (
        <Row gutter={[32, 32]} className='pb-8'>
            <Col span={24}>
                <SortProductList queryConfig={queryConfig} />
            </Col>
            <Col span={24}>
                <Space size={12} className='mb-8'>
                    <Typography className=' text-2xl font-semibold dark:text-white'>Kết quả tìm kiếm</Typography>
                    <Tag
                        color='blue'
                        className='bg-transparent px-3'
                        closable
                        closeIcon={<CloseSquare size={16} style={{ color: '#0958d9', paddingTop: 7 }} />}
                        onClose={() => navigate(PATH.HOME)}
                    >
                        {queryConfig.name}
                    </Tag>
                </Space>
                <Row>
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
            </Col>
        </Row>
    )
}

export default SearchProducts
