/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { ChevronDown } from 'react-iconly'
import omit from 'lodash/omit'
import { PRICE, SORT_PRODUCT } from 'src/constants/sort'
import SortProductItem from './SortProductItem'

import { ProductListConfig } from 'src/types/product.type'
import { useSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
    queryConfig: QueryConfig
}

const SortProductList: FC<Props> = ({ queryConfig }): JSX.Element => {
    const { sort_by, order } = queryConfig

    const [, setSearchParams] = useSearchParams({ ...queryConfig })
    const [value, setValue] = useState<string>(SORT_PRODUCT.CREATED_AT)

    const onSelectSort = (value: Exclude<ProductListConfig['sort_by'], undefined>) => {
        setValue(value)
        setSearchParams(omit({ ...queryConfig, sort_by: value }, ['order']))
    }

    useEffect(() => {
        setValue(sort_by || SORT_PRODUCT.CREATED_AT)
    }, [queryConfig, sort_by])

    const items = [
        {
            key: SORT_PRODUCT.CREATED_AT,
            text: 'Latest'
        },
        {
            key: SORT_PRODUCT.VIEW,
            text: 'Popular'
        },
        {
            key: SORT_PRODUCT.SOLD,
            text: 'Best Selling'
        }
    ]

    const handlePriceOrder = (value: Exclude<ProductListConfig['order'], undefined>) => {
        setSearchParams({ ...queryConfig, order: value })
    }

    return (
        <Row gutter={[12, 24]} justify='space-between' className='mx-0 mt-4'>
            <Col className='w-full'>
                <Row gutter={[24, 24]} justify={'space-between'} className='w-full'>
                    <Col>
                        <Row className='flex gap-4'>
                            {items.map((item) => (
                                <SortProductItem
                                    value={value}
                                    text={item.text}
                                    key={item.key}
                                    isActive={value === item.key}
                                    handleClick={() => onSelectSort(item.key)}
                                />
                            ))}
                        </Row>
                    </Col>

                    <Row>
                        <Col>
                            <Select
                                size='large'
                                placeholder='Choose price'
                                className='border border-@dark-80  py-2'
                                style={{ width: 160 }}
                                onChange={handlePriceOrder}
                                value={(order as any) || 'desc'}
                                options={[
                                    {
                                        value: PRICE.DESC,
                                        label: 'Price hight to low'
                                    },
                                    {
                                        value: PRICE.ASC,
                                        label: 'Price low to hight'
                                    }
                                ]}
                                suffixIcon={<ChevronDown set='bold' size={18} primaryColor='white' />}
                            />
                        </Col>
                    </Row>
                </Row>
            </Col>
        </Row>
    )
}

export default SortProductList
