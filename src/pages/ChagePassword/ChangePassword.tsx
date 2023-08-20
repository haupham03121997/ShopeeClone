import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Form, Modal, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import userApi from 'src/apis/user.api'
import ControlTextInput from 'src/components/ControlTextInput'
import { ErrorResponseApi } from 'src/types/utils.type'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
    password: string
    new_password: string
    confirm_password: string
}

const ChangePassword: React.FC = (): JSX.Element => {
    const [isConfirm, setIsConfirm] = useState(false)
    const schema = yup.object().shape({
        password: yup
            .string()
            .required('The password field not blank!')
            .min(6, 'Length from 6 - 160 characters')
            .max(160, 'Length from 6 - 160 characters'),
        new_password: yup
            .string()
            .required('The new password field not blank!')
            .min(6, 'Length from 6 - 160 characters')
            .max(160, 'Length from 6 - 160 characters'),
        confirm_password: yup
            .string()
            .required('The confirm new password field not blank!')
            .min(6, 'Length from 6 - 160 characters')
            .max(160, 'Length from 6 - 160 characters')
            .oneOf([yup.ref('new_password')], 'Password does not match. Please try to again!')
    })
    const {
        handleSubmit,
        setError,
        formState: { errors },
        control,
        getValues,
        reset
    } = useForm<FormData>({
        defaultValues: {
            password: '',
            new_password: '',
            confirm_password: ''
        },
        resolver: yupResolver(schema)
    })

    const updateUserMutate = useMutation({
        mutationFn: userApi.updateProfile
    })

    const { data: profileData } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile
    })

    const onSubmit = () => {
        setIsConfirm(true)
    }

    useEffect(() => {
        if (!updateUserMutate.isLoading && updateUserMutate.error) {
            if (
                isAxiosErrorUnprocessableEntity<ErrorResponseApi<{ password: string; new_password: string }>>(
                    updateUserMutate.error
                )
            ) {
                const formError = updateUserMutate.error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof Omit<FormData, 'confirm_password'>, {
                            message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                            type: 'Server'
                        })
                    })
                }
            }
        }
    }, [updateUserMutate, setError])

    const handleChangePassword = async () => {
        try {
            if (profileData?.data.data) {
                const body = {
                    password: getValues('password'),
                    new_password: getValues('new_password')
                }
                const response = await updateUserMutate.mutateAsync(body)
                if (response.data.data) {
                    reset()
                    toast.success('Updated successfully! 🙈')
                }
            }
        } catch (error) {
            if (isAxiosErrorUnprocessableEntity<ErrorResponseApi<{ password: string; new_password: string }>>(error)) {
                const formError = error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof Omit<FormData, 'confirm_password'>, {
                            message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                            type: 'Server'
                        })
                    })
                }
            }
        } finally {
            setIsConfirm(false)
        }
    }

    return (
        <>
            <Card className='relative rounded-md border border-@dark-80  bg-@dark-100 p-8'>
                <Typography className='mb-8 text-xl'>Change Password</Typography>
                <Form onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={[0, 24]} wrap={true}>
                        <Col md={12} xs={24}>
                            <ControlTextInput
                                name='password'
                                errors={errors.password}
                                label='Password :'
                                control={control}
                                type='password'
                            />
                        </Col>
                        <Col span={12} />
                        <Col md={12} xs={24}>
                            <ControlTextInput
                                name='new_password'
                                errors={errors.new_password}
                                label='New password :'
                                control={control}
                                type='password'
                            />
                        </Col>
                        <Col span={12} />
                        <Col md={12} xs={24}>
                            <ControlTextInput
                                name='confirm_password'
                                errors={errors.confirm_password}
                                label='Confirm new password :'
                                control={control}
                                type='password'
                            />
                        </Col>
                        <Col span={12} />
                        <Col md={12} xs={24} className='text-end'>
                            <Button htmlType='submit' size='large' type='primary'>
                                Change
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Modal
                centered
                title='Change Password'
                open={isConfirm}
                onOk={handleChangePassword}
                footer={[
                    <Button key='cancel' onClick={() => (updateUserMutate.isLoading ? undefined : setIsConfirm(false))}>
                        Cancel
                    </Button>,
                    <Button
                        key='submit'
                        type='primary'
                        disabled={updateUserMutate.isLoading}
                        loading={updateUserMutate.isLoading}
                        onClick={handleChangePassword}
                    >
                        Ok
                    </Button>
                ]}
            >
                <Typography>Do you want to change this new password?</Typography>
            </Modal>
        </>
    )
}

export default ChangePassword
