import { Avatar, Button, Card, Col, DatePicker, Form, Input, Radio, Row, Select, Space, Typography } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Camera, User } from 'react-iconly'
import useAppContext from 'src/hooks/useAppContext'

const UserProfile: React.FC = (): JSX.Element => {
    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm<{
        email: string
        username: string
        fullName: string
        phone: string
        gender: string
        birthDay: string
    }>({
        defaultValues: {
            email: '',
            username: '',
            fullName: '',
            phone: '',
            gender: '',
            birthDay: ''
        }
    })
    const { currentUser } = useAppContext()
    return (
        <Card className='relative rounded-md border border-@dark-80  bg-@dark-100 p-8'>
            <Typography className='mb-8 text-xl'>My Account</Typography>
            <Row>
                <Col span={24} sm={8}>
                    <Space direction='vertical' className='flex flex-col items-center justify-center' size={8}>
                        <div className='relative'>
                            <Avatar size={80} icon={<User />} style={{ backgroundColor: '#5d5f6d64' }} />
                            <div className='absolute bottom-0 right-0 cursor-pointer'>
                                <Camera set='curved' style={{ color: '#273ae8' }} />
                            </div>
                        </div>
                        <Typography className='text-sm'>{currentUser?.email}</Typography>
                    </Space>
                </Col>
                <Col span={24} sm={16}>
                    <Form onFinish={handleSubmit((values) => console.log(values))}>
                        <Row className='w-full' gutter={[0, 32]}>
                            <Col span={24}>
                                <span className='block pb-2  text-white dark:text-@dark-10'>Username :</span>
                                <Controller
                                    control={control}
                                    name='email'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Input
                                                    {...field}
                                                    name='email'
                                                    id='error'
                                                    className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                />
                                                {errors.email?.message && (
                                                    <span className='block pt-2 text-sm text-rose-500'>
                                                        {errors.email?.message}
                                                    </span>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <span className='block pb-2  text-white dark:text-@dark-10'>Full name :</span>
                                <Controller
                                    control={control}
                                    name='fullName'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Input
                                                    {...field}
                                                    name='email'
                                                    id='error'
                                                    className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                />
                                                {errors.email?.message && (
                                                    <span className='block pt-2 text-sm text-rose-500'>
                                                        {errors.email?.message}
                                                    </span>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <span className='block pb-2  text-white dark:text-@dark-10'>Email :</span>
                                <Controller
                                    control={control}
                                    name='email'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Input
                                                    {...field}
                                                    name='email'
                                                    id='error'
                                                    className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                />
                                                {errors.email?.message && (
                                                    <span className='block pt-2 text-sm text-rose-500'>
                                                        {errors.email?.message}
                                                    </span>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <span className='block pb-2  text-white dark:text-@dark-10'>Phone :</span>
                                <Controller
                                    control={control}
                                    name='phone'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Input
                                                    {...field}
                                                    name='email'
                                                    id='error'
                                                    className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                />
                                                {errors.email?.message && (
                                                    <span className='block pt-2 text-sm text-rose-500'>
                                                        {errors.email?.message}
                                                    </span>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            </Col>
                            <Col span={12}>
                                <span className='block pb-2  text-white dark:text-@dark-10'>Gender :</span>
                                <Controller
                                    control={control}
                                    name='gender'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Radio.Group {...field} size='large'>
                                                    <Space size={20}>
                                                        <Radio value={'M'}>Male</Radio>
                                                        <Radio value={'F'}>Female </Radio>
                                                        <Radio value={'O'}>Other</Radio>
                                                    </Space>
                                                </Radio.Group>
                                                {errors.email?.message && (
                                                    <span className='block pt-2 text-sm text-rose-500'>
                                                        {errors.email?.message}
                                                    </span>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            </Col>

                            <Col span={12}>
                                <span className='block pb-2  text-white dark:text-@dark-10'>Birthday :</span>
                                <Controller
                                    control={control}
                                    name='birthDay'
                                    render={({ field: { onChange, value, ...field } }) => {
                                        return (
                                            <>
                                                <DatePicker
                                                    {...field}
                                                    value={value ? dayjs('03/12/1997', 'DD/MM/YYYY') : null}
                                                    onChange={(date) => onChange(date ? date.valueOf() : null)}
                                                    placeholder='Select a date'
                                                    format={'DD/MM/YYYY'}
                                                    size='large'
                                                    className='w-full'
                                                />
                                            </>
                                        )
                                    }}
                                />
                            </Col>
                            <Col span={24} className='text-end'>
                                <Button type='primary' htmlType='submit' size='large'>
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default UserProfile
