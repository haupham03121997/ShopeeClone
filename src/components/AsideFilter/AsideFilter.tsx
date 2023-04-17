import { Divider } from 'antd'
import React from 'react'
import Category from './Category'
import Price from './Price'
import Rating from './Rating'

const AsideFilter = () => {
    return (
        <div className=' mb-6'>
            <Category />
            <Divider className='my-6 h-[1px]  bg-@dark-80' />
            <Price />
            <Divider className='my-6 h-[1px]  bg-@dark-80' />
            <Rating />
        </div>
    )
}

export default AsideFilter
