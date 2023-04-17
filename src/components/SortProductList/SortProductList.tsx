import { Col, Row, Select } from 'antd'
import { useState } from 'react'
import { ChevronDown } from 'react-iconly'
import { SORT_PRODUCT } from 'src/constants/sort'
import SortProductItem from './SortProductItem'

const SortProductList = (): JSX.Element => {
    const [value, setValue] = useState<string>(SORT_PRODUCT.ALL)

    const onSelectSort = (value: string) => {
        setValue(value)
    }

    const items = [
        {
            key: SORT_PRODUCT.ALL,
            text: 'All product'
        },
        {
            key: SORT_PRODUCT.POPULAR,
            text: 'Popular'
        },
        {
            key: SORT_PRODUCT.LATEST,
            text: 'Latest'
        },
        {
            key: SORT_PRODUCT.BEST_SELLING,
            text: 'Best Selling'
        }
    ]

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
                                    defaultValue={item.key}
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
                                options={[
                                    {
                                        value: 'Price hight to low'
                                    },
                                    {
                                        value: 'Price low to hight'
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
