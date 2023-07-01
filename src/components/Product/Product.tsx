import { Card, Carousel, Typography } from 'antd'
import React, { FC, useState } from 'react'
import { Star, Buy } from 'react-iconly'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
    product: ProductType
}

const Product: FC<Props> = ({ product }): JSX.Element => {
    const [isHover, setIsHover] = useState<boolean>(false)

    const onMouseHover = () => setIsHover(true)
    const onLeaveHover = () => setIsHover(false)
    return (
        <Card className=' overflow-hidden border border-@dark-80 bg-black p-0'>
            <div
                className='relative h-[300px] overflow-hidden '
                onMouseEnter={onMouseHover}
                onMouseLeave={onLeaveHover}
            >
                <Carousel autoplay={false} autoplaySpeed={3000} dots={false}>
                    {product.images.map((image, index) => (
                        <div key={`${product._id}-image-${index}`}>
                            <img
                                src={image}
                                className='scale-1 h-full w-full cursor-pointer object-cover transition-all  duration-500 hover:scale-110'
                                alt=''
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className='flex flex-col gap-4 py-4 px-4 text-gray-300'>
                <Typography className='text-base font-medium text-gray-300 line-clamp-2'>{product.name}</Typography>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <Star size={14} set='bold' primaryColor='#fadb14' />
                        <span className='text-gray-4 text-sm font-medium'>({product.rating})</span>
                    </div>
                    <span className='text-sm font-medium dark:text-gray-600'>
                        {formatNumberToSocialStyle(product.sold)} Đã bán
                    </span>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex  items-center gap-2'>
                        <span className='text-sm text-gray-600 line-through'>
                            {formatCurrency(product.price_before_discount) + 'đ'}
                        </span>
                        <span className='font-semibold text-@primary-2'>{formatCurrency(product.price) + 'đ'}</span>
                    </div>
                    <div className='flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md bg-@primary-1 transition-all duration-300 hover:bg-@primary-2'>
                        <Buy set='curved' size={18} primaryColor='#b2bec3' />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Product
