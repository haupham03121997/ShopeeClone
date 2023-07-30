import { omit } from 'lodash'
import { Col, Row, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Wallet, CloseSquare } from 'react-iconly'
import { useNavigate, createSearchParams } from 'react-router-dom'

import { PATH } from 'src/constants/path'
import { CURRENCY_USD } from 'src/constants/app'
import useDebounce from 'src/hooks/useDebounce'
import useQueryParams from 'src/hooks/useQueryParams'

import { formatCurrency } from 'src/utils/utils'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface PriceProps {
    priceMin: number
    priceMax: number
}

const priceMinValue = 0
const priceMaxValue = 99000

const Price = (): JSX.Element => {
    const { t: translate } = useTranslation()
    const navigate = useNavigate()
    const [isChanged, setIsChanged] = useState(false)

    const queryParams: QueryConfig = useQueryParams()

    // const [priceMin, setPriceMin] = useState<number>(priceMinValue)
    // const [priceMax, setPriceMax] = useState<number>(priceMaxValue)

    const hasPriceParams = 'price_min' in queryParams || 'price_max' in queryParams

    const [outGoingValues, setOutGoingValues] = useState<PriceProps>({
        priceMin: Number(queryParams.price_min) / CURRENCY_USD || priceMinValue,
        priceMax: Number(queryParams.price_max) / CURRENCY_USD || priceMaxValue
    })

    const debouncePriceValues = useDebounce<PriceProps>(outGoingValues, 800)

    useEffect(() => {
        if (isChanged) {
            navigate({
                pathname: PATH.HOME,
                search: createSearchParams({
                    ...queryParams,
                    price_min: String(debouncePriceValues.priceMin * CURRENCY_USD),
                    price_max: String(debouncePriceValues.priceMax * CURRENCY_USD)
                }).toString()
            })
        }
    }, [debouncePriceValues, isChanged])

    const priceOnChange = (value: [number, number]) => {
        setOutGoingValues({
            priceMin: value[0],
            priceMax: value[1]
        })
        setIsChanged(true)
    }

    const handleClearFilter = () => {
        const newParams = omit({ ...queryParams }, ['price_min', 'price_max'])
        setOutGoingValues({
            priceMin: priceMinValue,
            priceMax: priceMaxValue
        })
        setIsChanged(false)
        navigate({
            pathname: PATH.HOME,
            search: createSearchParams(newParams).toString()
        })
    }

    return (
        <Row className='my-6'>
            <Col span={24} className='mb-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Wallet set='curved' size={20} primaryColor='#6b7280' />
                        <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                            {translate('Price')}
                        </span>
                    </div>
                    {hasPriceParams && (
                        <span className='cursor-pointer text-xs text-red-600' onClick={handleClearFilter}>
                            <CloseSquare size={14} />
                        </span>
                    )}
                </div>
            </Col>
            <Col span={24} className='pt-4'>
                <Row align={'middle'} justify='space-between'>
                    <Col span={11}>
                        <div className='border-lg w-full rounded-lg border border-solid border-@dark-80 py-3 pl-3 pr-0'>
                            <span className='text-gray-400'>$ {outGoingValues.priceMin}</span>
                        </div>
                    </Col>
                    <Col span={2} className='flex items-center justify-center text-@dark-80'>
                        -
                    </Col>
                    <Col span={11}>
                        <div className='border-lg w-full rounded-lg border border-solid border-@dark-80 py-3 pl-3 pr-0'>
                            <span className='text-gray-400'>$ {outGoingValues.priceMax}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span={24} className='pt-4'>
                <Slider
                    range
                    tooltip={{
                        formatter: (node) => {
                            const parserNumber = node || 0
                            return <span>{`${formatCurrency(parserNumber * CURRENCY_USD)} đ`}</span>
                        }
                    }}
                    defaultValue={[outGoingValues.priceMin, outGoingValues.priceMax]}
                    value={[outGoingValues.priceMin, outGoingValues.priceMax]}
                    min={priceMinValue}
                    max={priceMaxValue}
                    onChange={priceOnChange}
                />
            </Col>
        </Row>
    )
}

export default Price
