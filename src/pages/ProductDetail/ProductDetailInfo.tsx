import { FC, useState } from 'react'
import { Star } from 'react-iconly'
import { Button, Col, Divider, Row, Space, Typography } from 'antd'
import { RiCheckboxCircleLine, RiShieldLine, RiShoppingBagLine, RiTimeLine, RiTruckLine } from 'react-icons/ri'

import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import QuantityController from 'src/components/QuantityController/QuantityController'
import { useMutation } from '@tanstack/react-query'
import { purchaseApi } from 'src/apis/purchase.api'
import { useParams } from 'react-router-dom'
import useAppContext from 'src/hooks/useAppContext'
import { toast } from 'react-hot-toast'
import { queryClient } from 'src/main'
import { PURCHASE_STATUS } from 'src/constants/purchase'
import { useModalLoginSlice } from 'src/store/store'

interface Props {
    product: Product
}

const ProductDetailInfo: FC<Props> = ({ product }): JSX.Element => {
    const { id } = useParams()
    const { isAuthenticated } = useAppContext()
    const { isOpenModalLogin, setIsOpenModalLogin } = useModalLoginSlice((state) => state)
    const [addToCartCheck, setAddToCartCheck] = useState(false)
    const [buyCount, setBuyCount] = useState<number | string | null>(0)
    const { mutate: addToCartMutation, isLoading, data } = useMutation(purchaseApi.addToCard)

    const addToCard = () => {
        addToCartMutation(
            { buy_count: (buyCount || 0) as number, product_id: id as string },
            {
                onSuccess: () => {
                    toast.success('Hàng đã vào trong giỏ của bạn!!! 🚀')
                    queryClient.invalidateQueries({ queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }] })
                },

                onError: () => toast.error('Opps! Đã xảy ra vấn đề. Vui lòng thử lại nhé 🤧')
            }
        )
    }

    const showQuantity = () => {
        if (!isAuthenticated) {
            return setIsOpenModalLogin(true)
        }
        setAddToCartCheck(true)
    }

    return (
        <Col lg={12} span={24}>
            <h2 className='mb-4 text-2xl font-semibold text-neutral-50'>{product?.name}</h2>
            <span className='text-sm italic text-zinc-400'>
                By <span className='text-sm font-medium text-neutral-200'>{product?.category.name}</span>{' '}
            </span>
            <Row className='mt-8' justify={'space-between'} align={'middle'}>
                <Col span={24} md={12}>
                    <Row gutter={[24, 0]} align={'middle'}>
                        <Col span={24} md={12} className='flex items-center '>
                            <div className='mr-4 inline-block rounded-lg bg-red-600  p-1.5 text-xs  font-medium text-cyan-50'>
                                Save <br /> %
                                {(
                                    ((product?.price_before_discount - product?.price) /
                                        product?.price_before_discount) *
                                    100
                                ).toFixed(0)}
                            </div>
                            <span className='text-3xl font-semibold text-neutral-50'>
                                {formatCurrency(product?.price || 0)}
                                <Typography className='text-xs text-gray-400 line-through'>
                                    {formatCurrency(product?.price_before_discount || 0)}
                                </Typography>
                            </span>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} md={12} className=' text-end'>
                    <Space size={4}>
                        <Star size={14} set='bold' primaryColor='#fadb14' />
                        <Star size={14} set='bold' primaryColor='#fadb14' />
                        <Star size={14} set='bold' primaryColor='#fadb14' />
                        <Star size={14} set='bold' primaryColor='#fadb14' />
                        <Star size={14} set='bold' primaryColor='#fadb14' />
                        <span className='inline-block pb-2 pl-1 text-sm font-medium  text-gray-400'>
                            {product?.rating || 0}
                        </span>
                    </Space>
                    <Typography className='text-sm font-medium dark:text-gray-400'>12 Ratings</Typography>
                </Col>
            </Row>
            <Divider className='bg-@dark-80' />
            <Row gutter={[0, 24]}>
                <Col>
                    <Space size={12}>
                        {addToCartCheck && <QuantityController onChangeValue={(value) => setBuyCount(value)} />}
                        <Button
                            type='primary'
                            size='large'
                            icon={<RiShoppingBagLine fontSize={20} />}
                            onClick={addToCartCheck ? addToCard : showQuantity}
                            loading={isLoading}
                            disabled={addToCartCheck && (isLoading || !buyCount)}
                        >
                            Add to Cart
                        </Button>
                    </Space>
                </Col>
                <Col span={24}>
                    <Row gutter={[0, 12]}>
                        <Col span={24} className='flex items-center gap-2'>
                            <RiTruckLine size={20} className='text-blue-800' />
                            <span className='text-xs text-white'>Free Shipping Worldwide</span>
                        </Col>

                        <Col span={24} className='flex items-center gap-2'>
                            <RiCheckboxCircleLine size={20} className='text-blue-800' />
                            <span className='text-xs text-white'>Available in stocks</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider className='bg-@dark-80' />
            <Row>
                <Col span={12}>
                    <Row align={'middle'} gutter={[12, 0]}>
                        <Col
                            className='flex items-center justify-center rounded-full bg-slate-300'
                            style={{ width: 36, height: 36 }}
                        >
                            <RiShieldLine className='text-blue-800' size={24} />
                        </Col>
                        <Col className='leading-5'>
                            <span className='block text-white'>1 Year Warranty</span>
                            <span className='text-xs dark:text-gray-400'>Lorem ipsum dolor sit amet.</span>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row align={'middle'} gutter={[12, 0]}>
                        <Col
                            className='flex items-center justify-center rounded-full bg-slate-300'
                            style={{ width: 36, height: 36 }}
                        >
                            <RiTimeLine className='text-blue-800' size={24} />
                        </Col>
                        <Col className='leading-5'>
                            <span className='block text-white'>14 Days Replacement</span>
                            <span className='text-xs dark:text-gray-400'>Lorem ipsum dolor sit amet.</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default ProductDetailInfo
