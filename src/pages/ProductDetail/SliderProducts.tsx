/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { Col } from 'antd'
import Slider from 'react-slick'
interface Props {
    images: string[]
}
const SliderProducts: FC<Props> = ({ images }): JSX.Element => {
    const [nav1, setNav1] = useState<any>(null)
    const [nav2, setNav2] = useState<any>(null)

    let slider1: any = []
    let slider2: any = []

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider1, slider2])

    return (
        <Col lg={12} span={24}>
            <Slider infinite={false} asNavFor={nav2} arrows={false} ref={(slider) => (slider1 = slider)}>
                {images.map((item, index) => (
                    <div
                        key={`image-nav2-${index}`}
                        className='flex items-center justify-center overflow-hidden rounded'
                    >
                        <img src={item} width={'100%'} height={'502px'} className='rounded object-cover' alt='' />
                    </div>
                ))}
            </Slider>
            <Slider
                asNavFor={nav1}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
                infinite={false}
                className='mt-8'
                ref={(slider) => (slider2 = slider)}
                arrows={false}
                responsive={[
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                ]}
            >
                {images.map((item, index) => (
                    <div key={`image-nav1-${index}`}>
                        <div className='mx-2 cursor-pointer overflow-hidden rounded-md border border-solid border-gray-500'>
                            <img src={item} height={80} width={'100%'} />
                        </div>
                    </div>
                ))}
            </Slider>
        </Col>
    )
}

export default SliderProducts
