import { Card, Col, Row, Skeleton } from 'antd'

import React from 'react'

const ProductList = () => {
    return (
        <Row gutter={[32, 32]}>
            {Array(9)
                .fill(0)
                .map((_, index) => {
                    return (
                        <Col span={8} key={`skeleton-product-list-${index}`}>
                            <Card className='p-8'>
                                <div className='mb-5'>
                                    <Skeleton.Image />
                                </div>
                                <Skeleton />
                                <div className='mt-5 flex w-full items-center justify-between'>
                                    <Skeleton.Button />
                                    <Skeleton.Button />
                                </div>
                            </Card>
                        </Col>
                    )
                })}
        </Row>
    )
}

export default ProductList
