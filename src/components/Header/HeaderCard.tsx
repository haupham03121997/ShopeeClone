import { Avatar, Badge, Button, Col, Divider, Dropdown, InputNumber, Row, Tag, Tooltip, Typography } from 'antd'
import { FC, MouseEventHandler, useState } from 'react'
import { Buy } from 'react-iconly'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

import { useMutation, useQuery } from '@tanstack/react-query'
import { purchaseApi } from 'src/apis/purchase.api'
import { PURCHASE_STATUS } from 'src/constants/purchase'
import { formatCurrency } from 'src/utils/utils'
import { queryClient } from 'src/main'
import { PATH } from 'src/constants/path'

const HeaderCard: FC = (): JSX.Element => {
    const navigate = useNavigate()
    const { data } = useQuery({
        queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }],
        queryFn: () => purchaseApi.getPurchases({ status: PURCHASE_STATUS.IN_CART })
    })

    const [selectedId, setSelectedId] = useState('')

    const deleteItemInCart = useMutation({
        mutationFn: (body: string[]) => purchaseApi.deletePurchase(body)
    })

    const listCart = data?.data.data || []
    const isDeleting = deleteItemInCart.isLoading

    const handleRemove = (id: string) => {
        setSelectedId(id)
        deleteItemInCart.mutate([id], {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }] })
            }
        })
    }

    const handleViewProduct = (id: string) => {
        navigate(`${PATH.PRODUCT_DETAIL}/${id}`)
    }

    return (
        <Col className='ml-4 flex items-center justify-center'>
            <Dropdown
                arrow
                dropdownRender={() => {
                    return (
                        <div className='dropdown-render'>
                            <Row gutter={[8, 8]} align='middle' justify='space-between' style={{ height: 64 }}>
                                <Col>
                                    <h5 className='text-xl text-white'>My cart </h5>
                                </Col>
                                <Col>
                                    <Tag className='rounded-md bg-white text-green-600'>{`${listCart.length} Item${
                                        listCart.length > 1 ? 's' : ''
                                    }`}</Tag>
                                </Col>
                            </Row>
                            <Divider className='my-0 bg-@dark-80' />
                            {listCart.slice(0, 5).map((item) => {
                                return (
                                    <>
                                        <div className='my-4' key={item._id}>
                                            <Row
                                                align='middle'
                                                justify='space-between'
                                                wrap={false}
                                                className='rounded p-4 transition-all duration-300 hover:bg-gray-900'
                                            >
                                                <Col flex='1 0 0'>
                                                    <Row wrap={false}>
                                                        <Col
                                                            flex='0 0 32px'
                                                            className='hp-mt-4 cursor-pointer '
                                                            onClick={() => handleViewProduct(item.product._id)}
                                                        >
                                                            <Avatar
                                                                size={40}
                                                                src={item.product.image}
                                                                className='hp-bg-black-0 hp-bg-dark-100'
                                                            />
                                                        </Col>
                                                        <Col
                                                            flex='0 0 110px'
                                                            className='mx-5 cursor-pointer'
                                                            onClick={() => handleViewProduct(item.product._id)}
                                                        >
                                                            <Tooltip
                                                                title={item.product.name}
                                                                className='text-sm'
                                                                overlayInnerStyle={{ fontSize: 12 }}
                                                            >
                                                                <Typography.Paragraph
                                                                    ellipsis={{
                                                                        rows: 1,
                                                                        expandable: false
                                                                    }}
                                                                    className='text-lg text-white'
                                                                >
                                                                    {item.product.name}
                                                                </Typography.Paragraph>
                                                            </Tooltip>

                                                            <p className='text-sm text-white'>
                                                                By{' '}
                                                                <span className='pt-3 text-sm text-@dark-80'>
                                                                    {item.product.category.name}
                                                                </span>
                                                            </p>
                                                        </Col>
                                                        <Col flex='0 0 90px' className=''>
                                                            <InputNumber
                                                                min={1}
                                                                value={item.buy_count}
                                                                disabled
                                                                max={99}
                                                                className='bg-transparent py-1 text-white'
                                                            />
                                                            <div
                                                                onClick={() => handleRemove(item._id)}
                                                                className='cursor-pointer pt-2 text-sm font-medium text-@dark-80 underline'
                                                            >
                                                                {isDeleting && selectedId === item._id ? (
                                                                    <>
                                                                        Deleting <LoadingOutlined />
                                                                    </>
                                                                ) : (
                                                                    'Remove Item'
                                                                )}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <p className=' text-md pl-4  font-medium text-green-600'>
                                                        {`${formatCurrency(item.price * item.buy_count)}đ`}
                                                    </p>
                                                    <p className='pl-4 pb-2 text-end'>
                                                        <span className='text-xs text-gray-600 line-through'>
                                                            {formatCurrency(
                                                                item.price_before_discount * item.buy_count
                                                            ) + 'đ'}
                                                        </span>
                                                    </p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Divider className='my-0 bg-@dark-80' />
                                    </>
                                )
                            })}

                            <Row className='mt-4 mb-2' gutter={[16, 16]}>
                                <Col span={24}>
                                    <Button
                                        onClick={() => navigate(PATH.CART)}
                                        className='w-full'
                                        type='primary'
                                        size='large'
                                    >
                                        View Cart
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )
                }}
            >
                <Badge count={listCart.length} size='small' className='text-xs'>
                    <Button className='btn-icon' type='text' icon={<Buy set='curved' primaryColor='#b2bec3' />} />
                </Badge>
            </Dropdown>
        </Col>
    )
}

export default HeaderCard
