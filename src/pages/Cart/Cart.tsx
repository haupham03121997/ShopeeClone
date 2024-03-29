import dayjs from 'dayjs'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Checkbox, Col, Empty, FloatButton, Row, Space, Typography } from 'antd'
import { DeleteFilled } from '@ant-design/icons'

import { PATH } from 'src/constants/path'
import { Purchase } from 'src/types/purchaces.type'
import { purchaseApi } from 'src/apis/purchase.api'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { PURCHASE_STATUS } from 'src/constants/purchase'
import { useExtendedPurchaseSlice } from 'src/store/store'
import { formatCurrency, formatDate } from 'src/utils/utils'
import QuantityController from 'src/components/QuantityController'
import PaymentWrapper from 'src/components/PaymentWrapper'

interface ExtendedPurchase extends Purchase {
    disabled: boolean
    checked: boolean
}

const Cart: React.FC = (): JSX.Element => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { state, pathname } = useLocation()
    const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
    const { setProducts } = useExtendedPurchaseSlice((state) => state)

    const idProductBuyNoFromLocation = (state as { idProductBuyNow: string | null })?.idProductBuyNow
    const { data } = useQuery({
        queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }],
        queryFn: () => purchaseApi.getPurchases({ status: PURCHASE_STATUS.IN_CART })
    })
    const updatePurchaseMutate = useMutation({
        mutationFn: purchaseApi.updatePurchase,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', { status: PURCHASE_STATUS.IN_CART }])
        }
    })

    const deleteItemInCart = useMutation({
        mutationFn: (body: string[]) => purchaseApi.deletePurchase(body)
    })

    const listCart = useMemo(() => data?.data.data || [], [data])

    const isCheckedAll = useMemo(
        () => extendedPurchase.length > 0 && extendedPurchase.every((item) => item.checked),
        [extendedPurchase]
    )

    const countChecking = useMemo(() => extendedPurchase.filter((item) => item.checked), [extendedPurchase])

    const productBuying = useMemo(() => extendedPurchase.filter((item) => item.checked), [extendedPurchase])

    const totalPriceBuying = useMemo(
        () => productBuying.reduce((total, value) => (total += value.price * value.buy_count), 0),
        [productBuying]
    )

    useEffect(() => {
        setExtendedPurchase((prev) => {
            const extendedPurchaseObject = keyBy(prev, '_id')
            return (
                listCart.map((item) => {
                    const isChooseBuyNowFromLocation = idProductBuyNoFromLocation === item.product._id
                    return {
                        ...item,
                        disabled: false,
                        checked: isChooseBuyNowFromLocation || Boolean(extendedPurchaseObject[item._id]?.checked)
                    }
                }) || []
            )
        })
    }, [listCart, idProductBuyNoFromLocation])

    useEffect(() => {
        navigate(pathname)
    }, [navigate, pathname])

    useEffect(() => {
        setProducts(extendedPurchase.filter((item) => item.checked))
    }, [extendedPurchase, setProducts])

    const handleChecked = (purchaseIndex: number) => (event: CheckboxChangeEvent) => {
        setExtendedPurchase(
            produce((draft) => {
                draft[purchaseIndex].checked = event.target.checked
            })
        )
    }

    const handleCheckedAll = () => {
        setExtendedPurchase((prev) => prev.map((item) => ({ ...item, checked: !isCheckedAll })))
    }

    const handleQuantity = (productIndex: number, value: number) => {
        const product = extendedPurchase[productIndex]
        updatePurchaseMutate.mutate({ product_id: product.product._id, buy_count: value })
    }

    const handleRemove = (id: string) => {
        deleteItemInCart.mutate([id], {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }] })
            }
        })
    }

    const handleDelete = () => {
        const ids = productBuying.map((item) => item._id)
        deleteItemInCart.mutate(ids, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cart', { status: PURCHASE_STATUS.IN_CART }] })
            }
        })
    }

    return (
        <>
            {listCart.length > 0 ? (
                <React.Fragment>
                    <PaymentWrapper>
                        <React.Fragment>
                            <Row className='my-8 px-6' gutter={[0, 0]}>
                                <Col span={6}>
                                    <Space>
                                        <Checkbox checked={isCheckedAll} onChange={handleCheckedAll} />
                                        <Typography>{`Product${
                                            countChecking.length > 0 ? `(${countChecking.length})` : ''
                                        }`}</Typography>
                                    </Space>
                                </Col>
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
                                {extendedPurchase.map((item, index) => {
                                    return (
                                        <Row
                                            key={`cart-${item._id}`}
                                            gutter={[0, 32]}
                                            className='mb-6 rounded-lg border-solid border-@dark-80 bg-black px-6 py-6'
                                        >
                                            <Col span={1}>
                                                <Checkbox
                                                    disabled={item.disabled}
                                                    checked={item.checked}
                                                    onChange={handleChecked(index)}
                                                />
                                            </Col>
                                            <Col span={5}>
                                                <div
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        navigate(`${PATH.PRODUCT_DETAIL}/${item.product._id}`)
                                                    }
                                                >
                                                    <img
                                                        src={item.product.image}
                                                        width={'80%'}
                                                        className='rounded-lg'
                                                        alt={item.product.name}
                                                    />{' '}
                                                </div>
                                            </Col>
                                            <Col span={9} className='flex items-center'>
                                                <Space direction='vertical'>
                                                    <Typography
                                                        onClick={() =>
                                                            navigate(`${PATH.PRODUCT_DETAIL}/${item.product._id}`)
                                                        }
                                                        className='cursor-pointer text-xl font-medium transition-all duration-500 hover:text-@primary-1'
                                                    >
                                                        {item.product.name}
                                                    </Typography>
                                                    <Typography>
                                                        <span className='text-sm italic text-zinc-400'>
                                                            By{' '}
                                                            <span className='text-sm font-medium text-neutral-200'>
                                                                {item.product.category.name}
                                                            </span>{' '}
                                                        </span>
                                                    </Typography>
                                                    <Typography className='text-sm text-zinc-400'>
                                                        {` Ships by no later than ${formatDate(
                                                            dayjs(new Date()).add(5)
                                                        )}`}
                                                    </Typography>
                                                </Space>
                                            </Col>
                                            <Col span={4} className='flex items-center'>
                                                <Space direction='vertical'>
                                                    <QuantityController
                                                        defaultValue={item.buy_count}
                                                        onChangeValue={(value) =>
                                                            handleQuantity(index, value as number)
                                                        }
                                                    />
                                                    <Typography
                                                        onClick={() => handleRemove(item._id)}
                                                        className='cursor-pointer text-sm text-@dark-80 underline'
                                                    >
                                                        Remove Item
                                                    </Typography>
                                                </Space>
                                            </Col>
                                            <Col span={5} className='flex items-center justify-end'>
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
                        </React.Fragment>
                    </PaymentWrapper>
                    {totalPriceBuying > 0 && (
                        <FloatButton
                            onClick={handleDelete}
                            icon={<DeleteFilled />}
                            type='primary'
                            tooltip='Delete selected product'
                        />
                    )}
                </React.Fragment>
            ) : (
                <Empty description={<h5>Your cart is empty</h5>} />
            )}
        </>
    )
}

export default Cart
