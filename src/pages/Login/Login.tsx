import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
    .object({
        email: yup.string().required('The email field not blank!'),
        password: yup
            .string()
            .required('The password field not blank')
            .min(6, 'Password must be 8-10 characters and contain both numbers and letters.')
    })
    .required()
type FormData = yup.InferType<typeof schema>

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema)
    })

    console.log(errors)
    const onSubmit = (values: any) => {
        console.log({ values })
    }
    return (
        <Col lg={12} span={24}>
            <Row className='h-full ' align='middle' justify='center'>
                <Col xxl={11} xl={15} lg={20} md={20} sm={24} className='px-2 pt-6 pb-6'>
                    <h1 className='text-5xl font-semibold text-white'>Login</h1>
                    <p className='my-6 mb-5 text-@dark-40'>Welcome back, please login to your account.</p>

                    <Form
                        layout='vertical'
                        name='basic'
                        // initialValues={{ remember: true, email: '' }}
                        className=' mt-6 xl:mt-12'
                        autoComplete='off'
                        onFinish={handleSubmit((data) => {
                            console.log(data)
                        })}
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
                            <Button className='h-full w-full border-transparent py-3' type='primary' htmlType='submit'>
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
