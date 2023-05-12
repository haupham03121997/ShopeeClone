import { Col, Row, Slider } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Wallet } from 'react-iconly'

const Price = (): JSX.Element => {
    const { t: translate } = useTranslation()

    const priceMinValue = 0
    const priceMaxValue = 500
    const [priceMin, setPriceMin] = useState<number>(priceMinValue)
    const [priceMax, setPriceMax] = useState<number>(priceMaxValue)

    const priceOnChange = (value: [number, number]) => {
        setPriceMin(value[0])
        setPriceMax(value[1])
    }
    return (
        <Row className='my-6'>
            <Col span={24} className='mb-3'>
                <div>
                    <div className='flex items-center'>
                        <Wallet set='curved' size={20} primaryColor='#6b7280' />
                        <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                            {translate('Price')}
                        </span>
                    </div>
                </div>
            </Col>
            <Col span={24} className='pt-4'>
                <Row align={'middle'} justify='space-between'>
                    <Col span={11}>
                        <div className='border-lg w-full rounded-lg border border-solid border-@dark-80 py-3 pl-3'>
                            <span className='text-gray-400'>$ {priceMin}</span>
                        </div>
                    </Col>
                    <Col span={2} className='flex items-center justify-center text-@dark-80'>
                        -
                    </Col>
                    <Col span={11}>
                        <div className='border-lg w-full rounded-lg border border-solid border-@dark-80 py-3 pl-3'>
                            <span className='text-gray-400'>$ {priceMax}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span={24} className='pt-4'>
                <Slider
                    range
                    defaultValue={[priceMin, priceMax]}
                    min={priceMinValue}
                    max={priceMaxValue}
                    onChange={priceOnChange}
                />
            </Col>
        </Row>
    )
}

export default Price
