import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <Col lg={12} span={24}>
            <Row className='h-full ' align='middle' justify='center'>
                <Col xxl={11} xl={15} lg={20} md={20} sm={24} className='px-2 pt-6 pb-6'>
                    <h1 className='text-5xl font-semibold text-white'>Login</h1>
                    <p className='my-6 mb-5 text-@dark-40'>Welcome back, please login to your account.</p>

                    <Form
                        layout='vertical'
                        name='basic'
                        initialValues={{ remember: true, email: '' }}
                        className=' mt-6 xl:mt-12'
                        autoComplete='off'
                    >
                        <span className=' block pb-2  text-white dark:text-@dark-10'>Email :</span>
                        <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input
                                name='email'
                                id='error'
                                className=' bg-transparent py-3 text-white shadow-lg dark:text-@dark-10'
                            />
                        </Form.Item>
                        <span className='block pb-2  text-white dark:text-@dark-10'>Password :</span>
                        <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input.Password id='warning2' type='password' className=' bg-transparent py-3' />
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
                            <Button className='h-full w-full py-3' type='primary' htmlType='submit'>
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
