import { Button, Space, Typography } from 'antd'
import React, { FC, useRef } from 'react'
import { Star } from 'react-iconly'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { PATH } from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'

interface Props {
    data: Product[]
}

const ProductListLatest: FC<Props> = ({ data }): JSX.Element => {
    const navigate = useNavigate()
    const sliderRef = useRef<any>(null)
    // Other Slide
    function SampleNextArrow() {
        return (
            <Button
                className='next-slick bg-transparent'
                onClick={() => sliderRef?.current?.slickNext()}
                icon={<RiArrowRightSLine className='remix-icon' size={18} />}
            ></Button>
        )
    }

    function SamplePrevArrow() {
        return (
            <Button
                className='prev-slick bg-transparent'
                onClick={() => sliderRef?.current?.slickPrev()}
                icon={<RiArrowLeftSLine className='remix-icon' size={18} />}
            ></Button>
        )
    }

    return (
        <Slider
            ref={sliderRef}
            infinite={false}
            slidesToShow={5}
            slidesToScroll={1}
            arrows={true}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
            className={data.length > 5 ? 'slick-other' : 'slick-other-original'}
            responsive={[
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]}
        >
            {data.map((item) => {
                return (
                    <div className='px-2' key={item._id}>
                        <div
                            onClick={() => navigate(`${PATH.PRODUCT_DETAIL}/${item._id}`)}
                            className='flex cursor-pointer flex-col justify-items-center rounded-md border border-solid border-slate-500  p-4'
                        >
                            <div className='mb-4 flex w-full items-center justify-items-center'>
                                <img
                                    src={item.image}
                                    width={'100%'}
                                    height={100}
                                    className='mx-auto inline-block rounded-md object-cover'
                                />
                            </div>

                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 2
                                }}
                                className='mx-1 text-sm dark:text-slate-400'
                            >
                                {item.name}
                            </Typography.Paragraph>
                            <div className='flex items-center justify-between'>
                                <div className='mb-3 w-fit  rounded-lg bg-red-600  p-1.5 text-xs  font-medium text-cyan-50'>
                                    Save <br /> %
                                    {(
                                        ((item?.price_before_discount - item?.price) / item?.price_before_discount) *
                                        100
                                    ).toFixed(0)}
                                </div>
                                <Space size={1}>
                                    <Star size={14} set='bold' primaryColor='#fadb14' />
                                    <span className='inline-block pb-2  text-sm font-medium  text-gray-400'>
                                        {(item?.rating || 0).toFixed(1)}
                                    </span>
                                </Space>
                            </div>
                            <Space size={2} direction='vertical'>
                                <span className='text-center text-2xl font-bold text-blue-600'>
                                    {formatCurrency(item.price)}
                                </span>
                                <span className='block text-sm font-semibold line-through dark:text-slate-600'>
                                    {formatCurrency(item.price_before_discount)}
                                </span>
                            </Space>
                        </div>
                    </div>
                )
            })}
        </Slider>
    )
}

export default ProductListLatest
