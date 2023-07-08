import Slider from 'react-slick'
import { Star } from 'react-iconly'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { Breadcrumb, Button, Card, Col, Divider, Row, Space, Tag, Typography } from 'antd'
import { RiCheckboxCircleLine, RiShieldLine, RiShoppingBagLine, RiTimeLine, RiTruckLine } from 'react-icons/ri'

import { productApi } from 'src/apis/product.api'
import { formatCurrency } from 'src/utils/utils'

const ProductDetail = (): JSX.Element => {
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productApi.getProductDetail(id as string)
    })

    const product = data?.data.data

    const images = product?.images || []

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Breadcrumb>
                    <BreadcrumbItem className='dark:text-white'>Home</BreadcrumbItem>
                    <BreadcrumbItem className='dark:text-gray-300'>Product Detail</BreadcrumbItem>
                </Breadcrumb>
            </Col>
            <Col span={24}>
                {product && (
                    <Card className='relative rounded-md border border-slate-500  bg-@dark-100 p-8'>
                        <Row gutter={[32, 0]}>
                            <Tag
                                className='absolute left-10 top-10 z-10 border-none bg-blue-600 bg-transparent text-white '
                                color='blue'
                            >
                                Featured
                            </Tag>
                            <Col lg={12} span={24}>
                                <Slider infinite={false} arrows={false}>
                                    {images.map((item) => (
                                        <div className='flex items-center justify-center overflow-hidden rounded-xl  border-2'>
                                            <img
                                                src={item}
                                                width={'100%'}
                                                height={'502px'}
                                                className='object-cover'
                                                alt=''
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <Slider
                                    slidesToShow={4}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    infinite={false}
                                    className='mt-8'
                                    arrows={false}
                                    // responsive={[
                                    //     {
                                    //         breakpoint: 767,
                                    //         settings: {
                                    //             slidesToShow: 3
                                    //         }
                                    //     }
                                    // ]}
                                >
                                    {images.map((item) => {
                                        return (
                                            <>
                                                <div className='mx-2 cursor-pointer overflow-hidden rounded-md border border-solid border-gray-500'>
                                                    <img src={item} height={80} width={'100%'} />
                                                </div>
                                            </>
                                        )
                                    })}
                                </Slider>
                            </Col>
                            <Col lg={12} span={24}>
                                <h2 className='mb-4 text-2xl font-semibold text-neutral-50'>{product?.name}</h2>
                                <span className='text-sm italic text-zinc-400'>
                                    Thể loại{' '}
                                    <span className='text-sm font-medium text-neutral-200'>
                                        {product?.category.name}
                                    </span>{' '}
                                </span>
                                <Row className='mt-8' justify={'space-between'} align={'middle'}>
                                    <Col span={24} md={12}>
                                        <Row gutter={[24, 0]} align={'middle'}>
                                            <Col span={24} md={12} className='flex items-center '>
                                                <div className='mr-4 inline-block rounded-lg bg-red-600 p-1.5 text-xs  font-medium text-cyan-50'>
                                                    Save <br /> %{' '}
                                                    {(
                                                        ((product?.price_before_discount - product?.price) /
                                                            product?.price_before_discount) *
                                                        100
                                                    ).toFixed(0)}
                                                </div>
                                                <span className='text-3xl font-semibold text-neutral-50'>
                                                    {formatCurrency(product?.price || 0)}
                                                    <Typography className='text-xs text-gray-400 line-through'>
                                                        {formatCurrency(product?.price_before_discount || 0)}
                                                    </Typography>
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24} md={12} className=' text-end'>
                                        <Space size={4}>
                                            <Star size={14} set='bold' primaryColor='#fadb14' />
                                            <Star size={14} set='bold' primaryColor='#fadb14' />
                                            <Star size={14} set='bold' primaryColor='#fadb14' />
                                            <Star size={14} set='bold' primaryColor='#fadb14' />
                                            <Star size={14} set='bold' primaryColor='#fadb14' />
                                            <span className='inline-block pb-2 pl-1 text-sm font-medium  text-gray-400'>
                                                {product?.rating || 0}
                                            </span>
                                        </Space>
                                        <Typography className='text-sm font-medium dark:text-gray-400'>
                                            12 Ratings
                                        </Typography>
                                    </Col>
                                </Row>
                                <Divider className='bg-gray-500' />
                                <Row gutter={[0, 24]}>
                                    <Col>
                                        <Button
                                            type='primary'
                                            size='large'
                                            icon={<RiShoppingBagLine fontSize={20} className='pt-0.5' />}
                                        >
                                            Thêm giỏ hàng
                                        </Button>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 12]}>
                                            <Col span={24} className='flex items-center gap-2'>
                                                <RiTruckLine className='text-blue-800' />
                                                <span className='text-xs text-white'>Free Shipping Worldwide</span>
                                            </Col>

                                            <Col span={24} className='flex items-center gap-2'>
                                                <RiCheckboxCircleLine className='text-blue-800' />
                                                <span className='text-xs text-white'>Available in stocks</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Divider className=' bg-gray-500' />
                                <Row>
                                    <Col span={12}>
                                        <Row align={'middle'} gutter={[12, 0]}>
                                            <Col
                                                className='flex items-center justify-center rounded-full bg-slate-300'
                                                style={{ width: 36, height: 36 }}
                                            >
                                                <RiShieldLine className='text-blue-800' size={24} />
                                            </Col>
                                            <Col className='leading-5'>
                                                <span className='block text-white'>1 Year Warranty</span>
                                                <span className='text-xs dark:text-gray-400'>
                                                    Lorem ipsum dolor sit amet.
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row align={'middle'} gutter={[12, 0]}>
                                            <Col
                                                className='flex items-center justify-center rounded-full bg-slate-300'
                                                style={{ width: 36, height: 36 }}
                                            >
                                                <RiTimeLine className='text-blue-800' size={24} />
                                            </Col>
                                            <Col className='leading-5'>
                                                <span className='block text-white'>14 Days Replacement</span>
                                                <span className='text-xs dark:text-gray-400'>
                                                    Lorem ipsum dolor sit amet.
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                )}
            </Col>
        </Row>
    )
}

export default ProductDetail
