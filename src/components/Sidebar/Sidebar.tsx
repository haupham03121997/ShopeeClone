import React from 'react'
import { Button, Col, Layout, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { PATH } from 'src/constants/path'
import AsideFilter from '../AsideFilter'
import { Graph } from 'react-iconly'

const { Sider } = Layout

const Sidebar = () => {
    return (
        <Sider trigger={null} collapsible collapsed={false} width={256} className='bg-black'>
            <div className='mx-8 flex flex-col'>
                <Row align='bottom' className='mt-8 '>
                    <Graph set='bold' size={30} primaryColor='#ffff' />

                    {/* <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-12 w-12 text-gray-50'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
                        />
                    </svg> */}

                    <Link to={PATH.HOME}>
                        <span className='mx-2 text-xl font-semibold text-gray-50'>{`Shop's Pe`}</span>
                    </Link>
                </Row>
                <Row className='flex-1'>
                    <AsideFilter />
                </Row>
                <Row>
                    <Link to={PATH.LOGIN} className='w-full'>
                        <Button size='large' className='w-full py-5' type='primary'>
                            Sign in
                        </Button>
                    </Link>
                </Row>
            </div>
            {/* <Row className='mx-8 h-full' justify={'space-between'}>
                <Col span={24}>
                    <Row align='bottom' className='mt-8 items-center' justify={'center'}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-12 w-12 text-gray-50'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
                            />
                        </svg>

                        <span className='mx-2 text-2xl font-semibold text-gray-50'>{`Shop's Pe`}</span>
                    </Row>
                </Col>
                <Col span={24}>
                    <Link to={PATH.LOGIN}>
                        <Button size='large' className='w-full py-5' type='primary'>
                            Sign in
                        </Button>
                    </Link>
                </Col>
            </Row> */}
        </Sider>
    )
}

export default Sidebar
