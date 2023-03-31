import { Button, Col, Form, Input, Row } from 'antd'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <Col lg={12} span={24} className='p-6'>
            <Row className='h-full ' align='middle' justify='center'>
                <Col xxl={11} xl={15} lg={20} md={20} sm={24} className='px-2 pt-6 pb-6'>
                    <h1 className='text-5xl font-semibold text-white'>Create Account</h1>
                    <p className='my-6 mb-5 text-@dark-40'>
                        Please sign up to your personal account if you want to use all our premium products.
                    </p>
                    <Form layout='vertical' name='basic' initialValues={{ remember: true }} className=' mt-6 xl:mt-12'>
                        <Form.Item>
                            <span className='block pb-2  text-white dark:text-@dark-10'>Email :</span>
                            <Input
                                id='error'
                                className='focus:border-color-@primary-2 border-@dark-80 bg-transparent py-3 text-white shadow-lg focus:shadow-@shadow-input dark:text-@dark-10'
                            />
                        </Form.Item>
                        <Form.Item>
                            <span className='block pb-2  text-white dark:text-@dark-10'>Password :</span>
                            <Input
                                id='warning2'
                                type='password'
                                className='border-@dark-80 bg-transparent py-3 text-white dark:text-@dark-10'
                            />
                        </Form.Item>
                        <Form.Item>
                            <span className='block pb-2  text-white dark:text-@dark-10'>Confirm Password :</span>
                            <Input
                                id='warning2'
                                type='password'
                                className='border-@dark-80 bg-transparent py-3 text-white dark:text-@dark-10'
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
