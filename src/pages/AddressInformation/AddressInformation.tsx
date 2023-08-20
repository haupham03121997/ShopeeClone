import React from 'react'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Form, Input, Row, Typography } from 'antd'

import PaymentWrapper from 'src/components/PaymentWrapper'
import { PATTERN } from 'src/constants/patten'

const { TextArea } = Input

const schema = yup
    .object({
        fullName: yup.string().required('The full name field not blank. Please try again!'),
        phone: yup
            .string()
            .required('The phone field not blank. Please try again!')
            .matches(PATTERN.PHONE, 'Phone is not formatted correctly. Please try again!'),
        city: yup.string().required('The city field not blank. Please try again!'),
        district: yup.string().required('The district field not blank. Please try again!'),
        address: yup
            .string()
            .required('The district field not blank. Please try again!')
            .max(150, 'The address no more than 150 characters.  Please try again!')
    })
    .required()

type FormData = yup.InferType<typeof schema>

const AddressInformation: React.FC = (): JSX.Element => {
    const {
        control,
        formState: { errors, isValid }
    } = useForm<FormData>({
        defaultValues: {
            fullName: '',
            phone: '',
            city: ''
        },
        mode: 'all',
        resolver: yupResolver(schema)
    })

    return (
        <>
            <PaymentWrapper isValid={isValid}>
                <React.Fragment>
                    <Row gutter={[0, 32]} className='mt-8 rounded-lg border-solid border-@dark-80 bg-black p-6'>
                        <Col span={24}>
                            <Typography className='text-2xl'>Address</Typography>
                        </Col>
                        <Col span={24}>
                            <Form>
                                <Row gutter={[32, 32]}>
                                    <Col xs={24} md={12}>
                                        <span className=' block pb-2  text-white dark:text-@dark-10'>
                                            <span className='text-@danger-1'>*</span> Full name :
                                        </span>
                                        <Controller
                                            control={control}
                                            name='fullName'
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            name='fullName'
                                                            className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                        />
                                                        {errors.fullName?.message && (
                                                            <span className='block pt-2 text-sm text-rose-500'>
                                                                {errors.fullName?.message}
                                                            </span>
                                                        )}
                                                    </>
                                                )
                                            }}
                                        />
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <span className=' block pb-2  text-white dark:text-@dark-10'>
                                            <span className='text-@danger-1'>*</span>
                                            Phone :
                                        </span>
                                        <Controller
                                            control={control}
                                            name='phone'
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            name='phone'
                                                            className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                        />
                                                        {errors.phone?.message && (
                                                            <span className='block pt-2 text-sm text-rose-500'>
                                                                {errors.phone?.message}
                                                            </span>
                                                        )}
                                                    </>
                                                )
                                            }}
                                        />
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <span className=' block pb-2  text-white dark:text-@dark-10'>
                                            {' '}
                                            <span className='text-@danger-1'>*</span> City :
                                        </span>
                                        <Controller
                                            control={control}
                                            name='city'
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            name='city'
                                                            className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                        />
                                                        {errors.city?.message && (
                                                            <span className='block pt-2 text-sm text-rose-500'>
                                                                {errors.city?.message}
                                                            </span>
                                                        )}
                                                    </>
                                                )
                                            }}
                                        />
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <span className=' block pb-2  text-white dark:text-@dark-10'>
                                            {' '}
                                            <span className='text-@danger-1'>*</span> District :
                                        </span>
                                        <Controller
                                            control={control}
                                            name='district'
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <Input
                                                            {...field}
                                                            name='district'
                                                            className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                        />
                                                        {errors.district?.message && (
                                                            <span className='block pt-2 text-sm text-rose-500'>
                                                                {errors.district?.message}
                                                            </span>
                                                        )}
                                                    </>
                                                )
                                            }}
                                        />
                                    </Col>
                                    <Col xs={24}>
                                        <span className=' block pb-2  text-white dark:text-@dark-10'>
                                            {' '}
                                            <span className='text-@danger-1'>*</span> Address :
                                        </span>
                                        <Controller
                                            control={control}
                                            name='address'
                                            render={({ field }) => {
                                                return (
                                                    <>
                                                        <TextArea
                                                            {...field}
                                                            name='address'
                                                            autoSize={{ minRows: 2, maxRows: 4 }}
                                                            className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                        />
                                                        {errors.address?.message && (
                                                            <span className='block pt-2 text-sm text-rose-500'>
                                                                {errors.address?.message}
                                                            </span>
                                                        )}
                                                    </>
                                                )
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </React.Fragment>
            </PaymentWrapper>
        </>
    )
}

export default AddressInformation
