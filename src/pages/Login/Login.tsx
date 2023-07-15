import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import useAppContext from 'src/hooks/useAppContext'
import { PATH } from 'src/constants/path'

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

const Login = () => {
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
                navigate(PATH.HOME)
                setCurrentUser(data.data.data.user)
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
    return (
        <Col lg={12} span={24}>
            <Row className='h-full ' align='middle' justify='center'>
                <Col xxl={11} xl={15} lg={20} md={20} sm={24} className='px-2 pt-6 pb-6'>
                    <h1 className='text-5xl font-semibold text-white'>Login</h1>
                    <p className='my-6 mb-5 text-@dark-40'>Welcome back, please login to your account.</p>

                    <Form
                        layout='vertical'
                        name='login'
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
                            <span className='text-sm text-@dark-40 hover:text-@dark-40'>
                                Don’t you have an account?
                            </span>

                            <Link className='pl-2 text-sm text-@primary-2' to='/authentication/register'>
                                Create an account
                            </Link>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Col>
    )
}

export default Login
