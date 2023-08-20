import { Col } from 'antd'
import React from 'react'

const HeaderText: React.FC = (): JSX.Element => {
    return (
        <Col xl={16} lg={14} className='flex items-center justify-start'>
            <p className='text-gray-50'>
                Do you know the latest update of 2021? 🎉 &nbsp;
                <span className='font-light text-@danger-3'>Our roadmap is alive for future updates.</span>
            </p>
        </Col>
    )
}

export default HeaderText
