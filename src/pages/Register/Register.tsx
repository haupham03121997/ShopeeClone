import { Button, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'

const schema = yup.object({
    email: yup.string().required('The email field not blank!'),
    password: yup
        .string()
        .required('The password field not blank')
        .min(6, 'Password must be 8-10 characters and contain both numbers and letters.'),
    confirmPassword: yup
        .string()
        .required('The confirm password field not blank')
        .oneOf([yup.ref('password')], "Passwords don't match.")
})

type FormData = yup.InferType<typeof schema>

const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(schema)
    })
    return (
        <Col lg={12} span={24} className='p-6'>
            <Row className='h-full ' align='middle' justify='center'>
                <Col xxl={11} xl={15} lg={20} md={20} sm={24} className='px-2 pt-6 pb-6'>
                    <h1 className='text-5xl font-semibold text-white'>Create Account</h1>
                    <p className='my-6 mb-5 text-@dark-40'>
                        Please sign up to your personal account if you want to use all our premium products.
                    </p>
                    <Form
                        onFinish={handleSubmit((data) => {
                            console.log(data)
                        })}
                        layout='vertical'
                        name='basic'
                        className=' mt-6 xl:mt-12'
                    >
                        <Form.Item>
                            <span className='block pb-2  text-white dark:text-@dark-10'>Email :</span>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => (
                                    <>
                                        <Input
                                            {...field}
                                            id='error'
                                            className='focus:border-color-@primary-2 border-@dark-80 bg-transparent py-3 text-white shadow-lg focus:shadow-@shadow-input dark:text-@dark-10'
                                        />
                                        {errors.email?.message && (
                                            <span className='block pt-2 text-sm text-rose-500'>
                                                {errors.email?.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </Form.Item>
                        <Form.Item>
                            <span className='block pb-2  text-white dark:text-@dark-10'>Password :</span>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field }) => (
                                    <>
                                        <Input
                                            type='password'
                                            className='border-@dark-80 bg-transparent py-3 text-white dark:text-@dark-10'
                                        />
                                        {errors.password?.message && (
                                            <span className='block pt-2 text-sm text-rose-500'>
                                                {errors.password?.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </Form.Item>
                        <Form.Item>
                            <span className='block pb-2  text-white dark:text-@dark-10'>Confirm Password :</span>
                            <Controller
                                control={control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <>
                                        <Input
                                            {...field}
                                            type='password'
                                            className='border-@dark-80 bg-transparent py-3 text-white dark:text-@dark-10'
                                        />
                                        {errors.confirmPassword?.message && (
                                            <span className='block pt-2 text-sm text-rose-500'>
                                                {errors.confirmPassword?.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </Form.Item>

                        <Form.Item className='mt-6'>
                            <Button className='h-full w-full py-3' type='primary' htmlType='submit'>
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
