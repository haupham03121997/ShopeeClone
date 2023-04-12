import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'antd'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

import ControlTextInput from 'src/components/ControlTextInput'
import { SchemaRegister, schemaRegister } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { FC, useState } from 'react'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import useAppContext from 'src/hooks/useAppContext'
import { PATH } from 'src/constants/path'

type FormData = SchemaRegister

const Register: FC = (): JSX.Element => {
    const navigate = useNavigate()
    const { setIsAuthenticated, setCurrentUser } = useAppContext()
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schemaRegister)
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const registerAccountMutate = useMutation({
        mutationFn: (body: Omit<FormData, 'confirmPassword'>) => registerAccount(body)
    })

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const body = omit(data, ['confirmPassword'])

        await registerAccountMutate.mutate(body, {
            onSuccess: (data) => {
                setIsAuthenticated(true)
                setCurrentUser(data.data.data.user)
                navigate(PATH.HOME)
            },
            onError: (errors) => {
                if (isAxiosErrorUnprocessableEntity<ErrorResponseApi<Omit<FormData, 'confirmPassword'>>>(errors)) {
                    const formError = errors.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirmPassword'>, {
                                message: formError[key as keyof Omit<FormData, 'confirmPassword'>],
                                type: 'Server'
                            })
                        })
                    }
                }
            }
        })
        setIsLoading(false)
    })

    return (
        <Col lg={12} span={24} className='p-6'>
            <Row className='h-full ' align='middle' justify='center'>
                <Col xxl={11} xl={15} lg={20} md={20} sm={24} className='px-2 pt-6 pb-6'>
                    <h1 className='text-5xl font-semibold text-white'>Create Account</h1>
                    <p className='my-6 mb-5 text-@dark-40'>
                        Please sign up to your personal account if you want to use all our premium products.
                    </p>
                    <Form onFinish={onSubmit} layout='vertical' name='register' className=' mt-6 xl:mt-12'>
                        <Form.Item>
                            <ControlTextInput name='email' errors={errors.email} label='Email :' control={control} />
                        </Form.Item>
                        <Form.Item>
                            <ControlTextInput
                                name='password'
                                errors={errors.password}
                                label='Password :'
                                control={control}
                                type='password'
                            />
                        </Form.Item>
                        <Form.Item>
                            <ControlTextInput
                                name='confirmPassword'
                                errors={errors.confirmPassword}
                                label='Confirm Password :'
                                control={control}
                                type='password'
                            />
                        </Form.Item>

                        <Form.Item className='mt-6'>
                            <Button loading={isLoading} className='h-full w-full py-3' type='primary' htmlType='submit'>
                                Sign up
                            </Button>
                        </Form.Item>
                        <Col className='hp-form-info'>
                            <span className='text-sm text-@dark-40 hover:text-@dark-40'>Already have an account?</span>

                            <Link className='pl-2 text-sm text-@primary-2' to='/authentication/login'>
                                Login
                            </Link>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Col>
    )
}

export default Register
