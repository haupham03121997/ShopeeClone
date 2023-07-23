import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Breadcrumb, Button, Col, Row, Space, Steps, Typography } from 'antd'

import { PATH } from 'src/constants/path'
import { formatCurrency, formatDate } from 'src/utils/utils'
import { purchaseApi } from 'src/apis/purchase.api'
import { PURCHASE_STATUS } from 'src/constants/purchase'
import QuantityController from 'src/components/QuantityController'
import dayjs from 'dayjs'

interface Props {}
const Cart: React.FC<Props> = (): JSX.Element => {
    const { data } = useQuery({
        queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }],
        queryFn: () => purchaseApi.getPurchases({ status: PURCHASE_STATUS.IN_CART })
    })

    const listCart = data?.data.data || []

    console.log(listCart)

    return (
        <Row gutter={[28, 28]}>
            <Col span={24}>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={PATH.HOME}>Home</Link>
                        },
                        {
                            title: 'Cart'
                        }
                    ]}
                />
            </Col>
            <Col xs={24} lg={18}>
                <Row className='rounded-lg border-solid border-@dark-80 bg-black px-6 py-6'>
                    <Steps
                        size='small'
                        current={0}
                        items={[
                            {
                                title: 'Order Details'
                            },
                            {
                                title: 'Address Informations'
                            },
                            {
                                title: 'Payment'
                            }
                        ]}
                    />
                </Row>
                <Row className='my-8 px-6' gutter={[0, 0]}>
                    <Col span={6} />
                    <Col span={10}>
                        <Typography>Name</Typography>
                    </Col>
                    <Col span={5}>
                        <Typography>Quantity</Typography>
                    </Col>
                    <Col span={3}>
                        {' '}
                        <Typography>Price</Typography>
                    </Col>
                </Row>
                <div>
                    {listCart.map((item) => {
                        return (
                            <Row
                                key={`cart-${item._id}`}
                                gutter={[0, 32]}
                                className='mb-6 rounded-lg border-solid border-@dark-80 bg-black px-6 py-6'
                            >
                                <Col span={6}>
                                    <img src={item.product.image} width={'80%'} className='rounded-lg' />{' '}
                                </Col>
                                <Col span={10} className='flex items-center lg:pr-8'>
                                    <Space direction='vertical'>
                                        <Typography className='text-xl font-medium'>{item.product.name}</Typography>
                                        <Typography>
                                            <span className='text-sm italic text-zinc-400'>
                                                By{' '}
                                                <span className='text-sm font-medium text-neutral-200'>
                                                    {item.product.category.name}
                                                </span>{' '}
                                            </span>
                                        </Typography>
                                        <Typography className='text-sm text-zinc-400'>
                                            {` Ships by no later than ${formatDate(dayjs(new Date()).add(5))}`}
                                        </Typography>
                                    </Space>
                                </Col>
                                <Col span={4} className='flex items-center'>
                                    <Space direction='vertical'>
                                        <QuantityController
                                            defaultValue={item.buy_count}
                                            onChangeValue={(value) => console.log(value)}
                                        />
                                        <Typography className='text-sm text-@dark-80 underline'>Remove Item</Typography>
                                    </Space>
                                </Col>
                                <Col span={4} className='flex items-center justify-end'>
                                    <Space direction='vertical'>
                                        <Typography className='text-2xl'>
                                            {`${formatCurrency(item.price * item.buy_count)}đ`}
                                        </Typography>
                                        <Typography className='flex  items-center justify-end gap-1 text-green-600'>
                                            <RiCheckboxCircleFill />
                                            <span className='text-xs underline'>Free Shipping</span>
                                        </Typography>
                                    </Space>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
            </Col>
            <Col xs={24} lg={6}>
                <Row className='rounded-lg border-solid border-@dark-80 bg-black px-6 py-6'>
                    <Col span={24}>
                        <Space direction='vertical' size={16}>
                            <Space direction='vertical' size={0}>
                                <Typography className='text-3xl'>Summary</Typography>
                                <Typography className='text-sm text-zinc-400'>1 Product</Typography>
                            </Space>
                            <Typography className='my-4 text-sm text-zinc-400'>
                                General information of the product.
                            </Typography>
                            <Space className='w-full' direction='vertical' size={12}>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Suptotal</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-1'>
                                        {formatCurrency(70000000)}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Delivery</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-1'>Free</Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Tax</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-1'>
                                        {formatCurrency(70000000 * 0.1)}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Insurance</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-1'>
                                        {formatCurrency(70000000 * 0.01)}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='font-semibold text-@primary-1'>Total</Typography>
                                    <Typography className='text-xl font-semibold text-@primary-1'>
                                        {formatCurrency(70000000 * 0.01)}
                                    </Typography>
                                </div>
                                <Button type='primary' className='my-2 w-full' size='large'>
                                    Next Step
                                </Button>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Cart
