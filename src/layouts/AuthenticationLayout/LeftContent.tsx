import { Col, Row } from 'antd'
import React from 'react'

import bgDark from '../../assets/images/pages/authentication/authentication-bg-dark.svg'

export default function LeftContent() {
    return (
        <Col lg={12} span={24} className='w-100  h-full dark:bg-color-dark'>
            <Row className='relative h-full'>
                <Col span={24}>
                    <Row align='middle' justify='center' className='pt-20'>
                        <Col xl={20} span={24} className='mb-2 text-center'>
                            <img src={bgDark} alt='bg-images' />
                        </Col>
                    </Row>
                </Col>
                <Col className='absolute top-3/4 left-2/4 w-9/12 -translate-x-2/4 -translate-y-2/4 pt-36 text-center'>
                    <h2 className='mb-5 text-center text-3xl font-medium text-white'>
                        Very good works are waiting for you 🤞
                    </h2>

                    <p className='px-5 text-base text-slate-400'>
                        {` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever.`}
                    </p>
                </Col>
            </Row>
        </Col>
    )
}
