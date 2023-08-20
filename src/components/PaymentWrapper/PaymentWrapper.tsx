import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb, Button, Col, Row, Space, Steps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { purchaseApi } from 'src/apis/purchase.api'
import { PATH } from 'src/constants/path'
import { PURCHASE_STATUS } from 'src/constants/purchase'
import { useExtendedPurchaseSlice } from 'src/store/store'
import { formatCurrency } from 'src/utils/utils'

interface Props {
    children: React.ReactNode
    isValid?: boolean
}

const PaymentWrapper: React.FC<Props> = ({ children, isValid }): JSX.Element => {
    const queryClient = useQueryClient()
    const { state } = useLocation()
    const navigate = useNavigate()
    const { extendedPurchaseStore } = useExtendedPurchaseSlice((state) => state)

    const currentStep = state?.currentStep || 0
    const [current, setCurrent] = useState(currentStep)

    const buyPurchaseMutate = useMutation({
        mutationFn: purchaseApi.buyPurchase,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', { status: PURCHASE_STATUS.IN_CART }]),
                toast.success('Your payment was successfully! 🚀', {
                    position: 'top-right'
                })
            setTimeout(() => {
                navigate(PATH.CART, {
                    state: {
                        currentStep: 0
                    }
                })
                setCurrent(0)
            }, 1000)
        }
    })

    const steps = [
        {
            title: 'Order detail',
            content: children
        },
        {
            title: 'Address Informations',
            content: children
        },
        {
            title: 'Payment',
            content: children
        }
    ]

    const items = steps.map((item) => ({ key: item.title, title: item.title }))

    const productBuying = extendedPurchaseStore.filter((item) => item.checked)

    const totalPriceBuying = productBuying.reduce((total, value) => (total += value.price * value.buy_count), 0)

    const totalPriceBeforeDiscount = productBuying.reduce(
        (total, value) => (total += value.price_before_discount * value.buy_count),
        0
    )

    const next = () => {
        switch (current) {
            case 0:
                navigate(PATH.ADDRESS_INFORMATION, {
                    state: {
                        currentStep: current + 1
                    }
                })
                break
            case 1:
                navigate(PATH.PAYMENT_OPTIONS, {
                    state: {
                        currentStep: current + 1
                    }
                })
                break
            default:
                break
        }

        setCurrent(current + 1)
    }

    const goBack = () => {
        switch (current) {
            case 1:
                navigate(PATH.CART, {
                    state: {
                        currentStep: current - 1
                    }
                })
                break
            case 2:
                navigate(PATH.ADDRESS_INFORMATION, {
                    state: {
                        currentStep: current - 1
                    }
                })
                break
            default:
                break
        }

        setCurrent(current - 1)
    }

    useEffect(() => {
        if (productBuying.length === 0 && current > 0) {
            navigate(PATH.CART, {
                state: {
                    currentStep: 0
                }
            })
            setCurrent(0)
        }
    }, [productBuying, current, navigate])

    const handlePayment = () => {
        buyPurchaseMutate.mutate(
            productBuying.map((item) => ({ product_id: item.product._id, buy_count: item.buy_count }))
        )
    }

    return (
        <Row gutter={[28, 28]}>
            <Col span={24}>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={PATH.HOME}>Home</Link>
                        },
                        {
                            title: 'Checkout'
                        }
                    ]}
                />
            </Col>
            <Col xs={24} lg={18}>
                <Row className='rounded-lg border-solid border-@dark-80 bg-black px-6 py-6'>
                    <Steps size='small' current={current} items={items} />
                </Row>
                {steps[current]?.content}
            </Col>
            <Col xs={24} lg={6}>
                <Row className='rounded-lg border-solid border-@dark-80 bg-black px-6 py-6'>
                    <Col span={24}>
                        <Space direction='vertical' size={16}>
                            <Space direction='vertical' size={0}>
                                <Typography className='text-3xl'>Summary</Typography>
                                <Typography className='text-sm text-zinc-400'>
                                    {productBuying.length} Product
                                </Typography>
                            </Space>
                            <Typography className='my-4 text-sm text-zinc-400'>
                                General information of the product.
                            </Typography>
                            <Space className='w-full' direction='vertical' size={12}>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Suptotal</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-2'>
                                        {formatCurrency(totalPriceBuying)}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Delivery</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-2'>Free</Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Tax</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-2'>
                                        {formatCurrency(totalPriceBuying * 0.01)}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs'>Insurance</Typography>
                                    <Typography className='text-sm font-semibold text-@primary-2'>
                                        {formatCurrency(totalPriceBuying * 0.001)}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='font-semibold text-@primary-2'>Total</Typography>
                                    <Typography className='text-xl font-semibold text-@primary-2'>
                                        {formatCurrency(
                                            totalPriceBuying - totalPriceBuying * 0.01 - totalPriceBuying * 0.001
                                        )}
                                    </Typography>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Typography className='text-xs font-semibold text-@primary-2'>Saving</Typography>
                                    <Typography className='text-xs font-semibold text-@primary-2'>
                                        {formatCurrency(totalPriceBeforeDiscount - totalPriceBuying)} đ
                                    </Typography>
                                </div>
                                <div className='flex w-full items-center justify-between gap-3'>
                                    {current > 0 && !buyPurchaseMutate.isLoading && (
                                        <Button
                                            type='primary'
                                            className='my-2 w-full'
                                            size='large'
                                            onClick={() => goBack()}
                                        >
                                            Go back
                                        </Button>
                                    )}

                                    <div className='w-full'>
                                        <Button
                                            loading={buyPurchaseMutate.isLoading}
                                            type='primary'
                                            className='my-2 w-full'
                                            size='large'
                                            disabled={!totalPriceBuying || isValid === false}
                                            onClick={() => (current === 2 ? handlePayment() : next())}
                                        >
                                            {current === 2 ? 'Payment' : 'Next Step'}
                                        </Button>
                                    </div>
                                </div>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PaymentWrapper
