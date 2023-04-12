import { Avatar, Button, Col, Divider, InputNumber, Row, Tag } from 'antd'
import { FC } from 'react'
import { Buy } from 'react-iconly'
import { Link } from 'react-router-dom'

import Popover from '../Popover'

import ImageProduct from 'src/assets/images/products/watch-1.png'

const HeaderCard: FC = (): JSX.Element => {
    return (
        <Col className='ml-4 flex items-center justify-center'>
            <Popover
                renderPopover={
                    <div>
                        <Row gutter={[8, 8]} align='middle' justify='space-between' style={{ height: 64 }}>
                            <Col>
                                <h5 className='text-xl text-white'>My cart</h5>
                            </Col>
                            <Col>
                                <Tag className='rounded-md bg-white text-green-600'>1 Item</Tag>
                            </Col>
                        </Row>
                        <Divider className='my-0 bg-@dark-80' />
                        <div className='my-4'>
                            <Row align='middle' justify='space-between' wrap={false}>
                                <Col flex='1 0 0'>
                                    <Row wrap={false}>
                                        <Col flex='0 0 32px' className='hp-mt-4'>
                                            <Link to={`/`}>
                                                <Avatar
                                                    size={40}
                                                    src={ImageProduct}
                                                    className='hp-bg-black-0 hp-bg-dark-100'
                                                />
                                            </Link>
                                        </Col>
                                        <Col flex='0 0 110px' className='mx-5'>
                                            <Link to={`/`}>
                                                <h5 className='min-h-[30px] text-lg text-white'>Smart watch 3</h5>

                                                <p className='text-sm text-white' style={{ marginTop: 1 }}>
                                                    By <span className='pt-3 text-sm text-@dark-80'>Sony</span>
                                                </p>
                                            </Link>
                                        </Col>
                                        <Col flex='0 0 90px' className=''>
                                            <InputNumber
                                                min={1}
                                                value={1}
                                                disabled
                                                max={99}
                                                className='bg-transparent py-1 text-white'
                                            />
                                            <div className='cursor-pointer pt-2 text-sm font-medium text-@dark-80 underline'>
                                                Remove Item
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <p className=' text-md pl-4 pb-2 font-medium text-green-600'>$55.00</p>
                                </Col>
                            </Row>
                        </div>
                        <Divider className='my-0 bg-@dark-80' />
                        <Row className='mt-4 mb-2' gutter={[16, 16]}>
                            <Col span={12}>
                                <Button size='large' className='w-full bg-transparent hover:bg-transparent' type='text'>
                                    View Cart
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button className='w-full' type='primary' size='large'>
                                    Checkout
                                </Button>
                            </Col>
                        </Row>
                    </div>
                }
                className='rounded-md border border-solid border-@border-dark bg-black p-3 '
            >
                <Button className='btn-icon' type='text' icon={<Buy set='curved' primaryColor='#b2bec3' />} />
            </Popover>
        </Col>
    )
}

export default HeaderCard
