import { Col, Row } from 'antd'
import { Category as CategoryIcon } from 'react-iconly'
import React from 'react'

const Category = () => {
    return (
        <Row className='my-6'>
            <Col span={24} className='mb-3'>
                <div>
                    <div className='flex items-center'>
                        <CategoryIcon set='curved' size={20} primaryColor='#6b7280' />
                        <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                            Category
                        </span>
                    </div>
                </div>
            </Col>
            <Col span={24} className='flex flex-col gap-6 pt-4'>
                <div className='flex items-center gap-4'>
                    <div className='h-4 w-4 rounded-full bg-slate-400'></div>
                    <span className='text-gray-400'>{`T-shirt`}</span>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='border-1 h-4 w-4 rounded-full border-solid border-slate-400'></div>
                    <span className='text-gray-400'>{`Watch`}</span>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='border-1 h-4 w-4 rounded-full border-solid border-slate-400'></div>
                    <span className='text-gray-400'>{`Phone`}</span>
                </div>
            </Col>
        </Row>
    )
}

export default Category
