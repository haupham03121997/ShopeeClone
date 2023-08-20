import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Avatar, Button, Card, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Space, Typography } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Camera, User as UserIcon } from 'react-iconly'
import userApi from 'src/apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from 'src/utils/rules'
import { User } from 'src/types/user.type'
import { toast } from 'react-hot-toast'

const { TextArea } = Input

const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])
type FormData = Pick<User, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>

const UserProfile: React.FC = (): JSX.Element => {
    const { data: profileData, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile
    })
    const [isConfirm, setIsConfirm] = useState(false)
    const { mutate: updateUserMutate } = useMutation({
        mutationFn: userApi.updateProfile
    })
    const profile = profileData?.data.data

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            avatar: '',
            phone: '',
            address: '',
            date_of_birth: '01/01/1990'
        },
        resolver: yupResolver(profileSchema)
    })

    useEffect(() => {
        setValue('name', profile?.name || '')
        setValue('phone', profile?.phone || '')
        setValue('address', profile?.address || '')
        setValue('avatar', profile?.avatar || '')
        setValue('date_of_birth', dayjs(profile?.date_of_birth || '01/01/1990').format('DD/MM/YYYY'))
    }, [profile, setValue])

    const onSubmit = () => {
        setIsConfirm(true)
    }

    const handleUpdate = async () => {
        const parsedDate = dayjs(getValues('date_of_birth'), 'DD/MM/YYYY')
        const formattedDate = parsedDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ')

        try {
            const body = {
                name: getValues('name'),
                address: getValues('address'),
                phone: getValues('phone'),
                date_of_birth: formattedDate,
                avatar: getValues('avatar')
            }
            await updateUserMutate(body)
            setIsConfirm(false)
            refetch()
            toast.success('Updated successfully! 🙈')
        } catch {
            toast.error('An error has occurred. Please try again!')
        }
    }

    return (
        <>
            <Card className='relative rounded-md border border-@dark-80  bg-@dark-100 p-8'>
                <Typography className='mb-8 text-xl'>My Account</Typography>
                <Row>
                    <Col span={24} sm={8}>
                        <Space direction='vertical' className='flex flex-col items-center justify-center' size={8}>
                            <div className='relative'>
                                <Avatar size={80} icon={<UserIcon />} style={{ backgroundColor: '#5d5f6d64' }} />
                                <div className='absolute bottom-0 right-0 cursor-pointer'>
                                    <Camera set='curved' style={{ color: '#273ae8' }} />
                                </div>
                            </div>
                            <Typography className='text-sm'>{profile?.email}</Typography>
                        </Space>
                    </Col>
                    <Col span={24} sm={16}>
                        <Form onFinish={handleSubmit(onSubmit)}>
                            <Row className='w-full' gutter={[32, 32]}>
                                <Col span={24}>
                                    <span className='block pb-2  text-white dark:text-@dark-10'>Name :</span>
                                    <Controller
                                        control={control}
                                        name='name'
                                        render={({ field }) => {
                                            return (
                                                <>
                                                    <Input
                                                        {...field}
                                                        name='name'
                                                        id='error'
                                                        className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                                                    />
                                                    {errors.name?.message && (
                                                        <span className='block pt-2 text-sm text-rose-500'>
                                                            {errors.name?.message}
                                                        </span>
                                                    )}
                                                </>
                                            )
                                        }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <span className='block pb-2  text-white dark:text-@dark-10'>Phone :</span>
                                    <Controller
                                        control={control}
                                        name='phone'
                                        render={({ field }) => {
                                            return (
                                                <>
                                                    <Input
                                                        {...field}
                                                        name='phone'
                                                        id='error'
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
                                <Col span={12}>
                                    <span className='block pb-2  text-white dark:text-@dark-10'>Birthday :</span>
                                    <Controller
                                        control={control}
                                        name='date_of_birth'
                                        render={({ field: { onChange, value, ...field } }) => {
                                            console.log(value)
                                            return (
                                                <>
                                                    <DatePicker
                                                        {...field}
                                                        value={value ? dayjs(value, 'DD/MM/YYYY') : null}
                                                        onChange={(_, dateString) =>
                                                            onChange(dateString ? dateString : null)
                                                        }
                                                        placeholder='Select a date'
                                                        format={'DD/MM/YYYY'}
                                                        size='large'
                                                        className='w-full'
                                                    />
                                                </>
                                            )
                                        }}
                                    />
                                </Col>{' '}
                                <Col span={24}>
                                    <span className='block pb-2  text-white dark:text-@dark-10'>Address :</span>
                                    <Controller
                                        control={control}
                                        name='address'
                                        render={({ field }) => {
                                            return (
                                                <>
                                                    <TextArea
                                                        {...field}
                                                        name='address'
                                                        id='error'
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
            <Modal title='Update Profile' open={isConfirm} onOk={handleUpdate}>
                <Typography>Do you want to change this information?</Typography>
            </Modal>
        </>
    )
}

export default UserProfile
