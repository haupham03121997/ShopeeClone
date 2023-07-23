import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import React, { Ref, useImperativeHandle, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, Modal, ModalProps, Row } from 'antd'

import useOpen from 'src/hooks/useOpen'
import { PayloadData } from 'src/types/modal-confirm.type'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import useAppContext from 'src/hooks/useAppContext'
import { Link } from 'react-router-dom'
import { useModalLoginSlice } from 'src/store/store'

interface Props extends ModalProps {}

const schema = yup
    .object({
        email: yup.string().required('The email field not blank!'),
        password: yup
            .string()
            .required('The password field not blank')
            .min(6, 'Password must be 8-10 characters and contain both numbers and letters.')
    })
    .required()
    .shape({
        remember: yup.boolean()
    })
type FormData = yup.InferType<typeof schema>

const ModalLogin = React.forwardRef((props: Props, ref) => {
    const { open, handleClose, handleOpen } = useOpen()

    const [data, setData] = useState<PayloadData | null>(null)
    const { setIsAuthenticated, setCurrentUser } = useAppContext()
    const { setIsOpenModalLogin } = useModalLoginSlice((state) => state)

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            remember: false
        },
        resolver: yupResolver(schema)
    })

    const loginAccountMutate = useMutation({
        mutationFn: (body: Omit<FormData, 'confirmPassword'>) => loginAccount(body)
    })

    const onSubmit = handleSubmit(async (data) => {
        const body = data
        await loginAccountMutate.mutate(body, {
            onSuccess: (data) => {
                setIsAuthenticated(true)
                setCurrentUser(data.data.data.user)
                setIsOpenModalLogin(false)
            },
            onError: (errors) => {
                if (isAxiosErrorUnprocessableEntity<ErrorResponseApi<FormData>>(errors)) {
                    const formError = errors.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirmPassword'>, {
                                message: formError[key as keyof Omit<FormData, 'confirmPassword'>] as
                                    | string
                                    | undefined,
                                type: 'Server'
                            })
                        })
                    }
                }
            }
        })
    })

    const confirm = (data: PayloadData) => {
        setData(data)
        handleOpen()
    }

    useImperativeHandle(
        ref,
        () => ({
            confirm,
            handleClose
        }),
        []
    )

    return (
        <Modal {...props} open={open} title={data?.title} style={{ top: 20, background: 'black' }} footer={false}>
            <Form
                action='http://localhost:3000/authentication/login'
                method='POST'
                layout='vertical'
                className=' mt-6 xl:mt-12'
                autoComplete='off'
                onFinish={onSubmit}
            >
                <span className=' block pb-2  text-white dark:text-@dark-10'>Email :</span>
                <Form.Item name='email'>
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
                                        type='text'
                                        autoComplete='off'
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
                </Form.Item>

                <span className='block pb-2  text-white dark:text-@dark-10'>Password :</span>
                <Form.Item>
                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) => {
                            return (
                                <>
                                    <Input.Password
                                        {...field}
                                        id='warning2'
                                        type='password'
                                        className='bg-transparent py-3'
                                    />
                                    {errors.password?.message && (
                                        <span className='block pt-2 text-sm text-rose-500'>
                                            {errors.password?.message}
                                        </span>
                                    )}
                                </>
                            )
                        }}
                    />
                </Form.Item>
                <Row align='middle' justify='space-between'>
                    <Form.Item className='mb-0'>
                        <Checkbox name='remember' className='  text-white dark:text-@dark-10'>
                            Remember me
                        </Checkbox>
                    </Form.Item>

                    <Link
                        className='text-sm text-@dark-40 hover:text-@dark-40'
                        to='/pages/authentication/recover-password'
                    >
                        Forgot Password?
                    </Link>
                </Row>
                <Form.Item className='mt-6'>
                    <Button
                        loading={loginAccountMutate.isLoading}
                        disabled={loginAccountMutate.isLoading}
                        className='h-full w-full border-transparent py-3'
                        type='primary'
                        htmlType='submit'
                    >
                        Login
                    </Button>
                </Form.Item>
                <Col className='hp-form-info'>
                    <span className='text-sm text-@dark-40 hover:text-@dark-40'>Don’t you have an account?</span>

                    <Link className='pl-2 text-sm text-@primary-2' to='/authentication/register'>
                        Create an account
                    </Link>
                </Col>
            </Form>
        </Modal>
    )
})
export default ModalLogin
