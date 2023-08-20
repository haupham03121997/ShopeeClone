import { Col, Divider, Radio, RadioChangeEvent, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import classnames from 'classnames'
import PaymentWrapper from 'src/components/PaymentWrapper'

import MotorIcon from 'src/assets/icons/motor.svg'

import PlaneIcon from 'src/assets/icons/plane.svg'
import { TickSquare } from 'react-iconly'

const PAYMENT_OPTIONS = {
    CREDIT_CARD: 'CREDIT_CARD',
    DELIVERY: 'DELIVERY'
}

const DELIVERY_OPTIONS = {
    STANDARD: 'STANDARD',
    SWIFT: 'SWIFT'
}

const deliveryItems = [
    {
        title: 'Standard Shipping',
        subTitle: 'This is method of delivery you will meet when order from',
        icon: MotorIcon,
        key: DELIVERY_OPTIONS.STANDARD
    },
    {
        title: 'Swift Shipping',
        subTitle: 'This is method of delivery you will meet when order from',
        icon: PlaneIcon,
        key: DELIVERY_OPTIONS.SWIFT
    }
]

const PaymentOptions: React.FC = (): JSX.Element => {
    const [optionPayment, setOptionPayment] = useState(PAYMENT_OPTIONS.DELIVERY)
    const [optionDelivery, setDelivery] = useState(DELIVERY_OPTIONS.STANDARD)

    const handleOptionsPayment = (event: RadioChangeEvent) => {
        setOptionPayment(event.target.value)
    }
    return (
        <PaymentWrapper>
            <Row gutter={[0, 32]} className='mt-8 rounded-lg border-solid border-@dark-80 bg-black p-6'>
                <Col span={24}>
                    <Typography className='text-2xl'>Payment Options</Typography>
                    <Typography className='text-sm text-gray-500'>
                        Be sure to click on correct payment option.
                    </Typography>
                </Col>
                <Col span={24}>
                    <Radio.Group value={optionPayment} onChange={handleOptionsPayment}>
                        <Radio value={PAYMENT_OPTIONS.DELIVERY}>Payment on delivery</Radio>
                        <Radio disabled value={PAYMENT_OPTIONS.CREDIT_CARD}>
                            Credit card (Coming soon)
                        </Radio>
                    </Radio.Group>
                </Col>
                <Col span={24}>
                    <Divider className='my-2' />
                </Col>
                <Col span={24}>
                    <Typography className='mb-8 text-2xl'>Shipping Options</Typography>
                    <Row gutter={[32, 32]}>
                        {deliveryItems.map((item) => (
                            <Col xs={24} sm={12} key={item.key} onClick={() => setDelivery(item.key)}>
                                <div
                                    className={classnames(
                                        'border-sky-500" relative flex cursor-pointer gap-6 rounded-lg border-solid border-@dark-80 bg-@dark-90 p-8 duration-500 hover:border-@primary-2',
                                        {
                                            'border-@primary-2': item.key === optionDelivery
                                        }
                                    )}
                                >
                                    <Space direction='vertical' size={12}>
                                        <Typography>{item.title}</Typography>
                                        <Typography className='text-sm text-gray-500'>{item.subTitle}</Typography>
                                    </Space>
                                    <div className='flex items-center justify-center'>
                                        <img src={item.icon} width={60} height={60} alt='img' />
                                    </div>
                                    {item.key === optionDelivery && (
                                        <div className='absolute top-3 right-3'>
                                            <TickSquare primaryColor={'#0049F8'} size={18} />
                                        </div>
                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </PaymentWrapper>
    )
}

export default PaymentOptions
