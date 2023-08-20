import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Avatar, Button, Card, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Space, Typography } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Camera, User as UserIcon } from 'react-iconly'
import userApi from 'src/apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from 'src/utils/rules'
import { User } from 'src/types/user.type'
import { toast } from 'react-hot-toast'
import { getAvatarURL, isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'

const { TextArea } = Input

const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])
type FormData = Pick<User, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
    date_of_birth: string
}

const EXTENSION_FILE_UPLOAD = ['jpg', 'png', 'jpeg']

const UserProfile: React.FC = (): JSX.Element => {
    const refUpload = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>()
    const previewImage = useMemo(() => {
        return file ? URL.createObjectURL(file) : ''
    }, [file])
    const { data: profileData, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile
    })
    const [isConfirm, setIsConfirm] = useState(false)
    const { mutate: updateUserMutate, isLoading } = useMutation({
        mutationFn: userApi.updateProfile
    })
    const uploadAvatarMutate = useMutation({
        mutationFn: userApi.uploadAvatar
    })
    const profile = profileData?.data.data

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
        watch,
        setError
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
    const avatar = watch('avatar')

    const onSubmit = () => {
        setIsConfirm(true)
    }

    const handleUpdate = async () => {
        const parsedDate = dayjs(getValues('date_of_birth'), 'DD/MM/YYYY')
        const formattedDate = parsedDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ')

        try {
            if (file) {
                const fromData = new FormData()
                fromData.append('image', file)
                const uploadResponse = await uploadAvatarMutate.mutateAsync(fromData)
                const avatarName = uploadResponse.data.data
                setValue('avatar', avatarName)
            }
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
        } catch (error) {
            if (isAxiosErrorUnprocessableEntity<ErrorResponseApi<FormDataError>>(error)) {
                const formError = error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof Omit<FormData, 'confirmPassword'>, {
                            message: formError[key as keyof Omit<FormData, 'confirmPassword'>],
                            type: 'Server'
                        })
                    })
                }
            }
        } finally {
            setIsConfirm(false)
        }
    }

    const handleClick = () => refUpload.current?.click()

    const handleOnchangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileFromLocal = event.target.files?.[0]
        setFile(fileFromLocal)
    }

    return (
        <>
            <Card className='relative rounded-md border border-@dark-80  bg-@dark-100 p-8'>
                <Typography className='mb-8 text-xl'>My Account</Typography>
                <Row>
                    <Col span={24} sm={8}>
                        <Space direction='vertical' className='flex flex-col items-center justify-center' size={8}>
                            <div className='relative'>
                                <Avatar
                                    src={previewImage || getAvatarURL(avatar)}
                                    size={80}
                                    icon={<UserIcon />}
                                    style={{ backgroundColor: '#5d5f6d64' }}
                                />
                                <div className='absolute bottom-0 right-0 cursor-pointer' onClick={handleClick}>
                                    <input
                                        type='file'
                                        accept={EXTENSION_FILE_UPLOAD.map((item) => `.${item}`).join(',')}
                                        onChange={handleOnchangeFile}
                                        ref={refUpload}
                                        className='hidden'
                                    />
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
            <Modal
                centered
                title='Update Profile'
                open={isConfirm}
                onOk={handleUpdate}
                onCancel={() => (isLoading ? undefined : setIsConfirm(false))}
                footer={[
                    <Button key='cancel' onClick={() => (isLoading ? undefined : setIsConfirm(false))}>
                        Cancel
                    </Button>,
                    <Button key='submit' type='primary' disabled={isLoading} loading={isLoading} onClick={handleUpdate}>
                        Ok
                    </Button>
                ]}
            >
                <Typography>Do you want to change this information?</Typography>
            </Modal>
        </>
    )
}

export default UserProfile
