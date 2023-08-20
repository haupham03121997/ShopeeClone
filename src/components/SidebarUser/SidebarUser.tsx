import { Graph, User, Buy } from 'react-iconly'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Col, Divider, Layout, Row, Space } from 'antd'
import classnames from 'classnames'

import { PATH } from 'src/constants/path'
import useAppContext from 'src/hooks/useAppContext'
import CurrentUser from '../CurrentUser'

const { Sider } = Layout

const items = [
    {
        key: PATH.USER_PROFILE,
        name: 'Profile'
    },
    {
        key: PATH.CHANGE_PASSWORD,
        name: 'Change password'
    },
    {
        key: PATH.USER_ADDRESS,
        name: 'Address'
    }
]

const SidebarUser = (): JSX.Element => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { isAuthenticated } = useAppContext()

    return (
        <Sider trigger={null} collapsible collapsed={false} width={256} className='bg-black'>
            <div className='mx-8 flex flex-col'>
                <Row align='bottom' className='mt-8 '>
                    <Graph set='bold' size={30} primaryColor='#ffff' />
                    <Link to={PATH.HOME}>
                        <span className='mx-2 text-xl font-semibold text-gray-50'>{`Shop's Pe`}</span>
                    </Link>
                </Row>
                <div className='sidebar-content my-6 pt-20'>
                    <Row>
                        <Col span={24} className='mb-3'>
                            <div className='mb-8 flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <User set='curved' size={20} primaryColor='#6b7280' />
                                    <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                                        User Profile
                                    </span>
                                </div>
                            </div>
                            <Space direction='vertical' size={18}>
                                {items.map((item) => {
                                    return (
                                        <div
                                            key={item.key}
                                            className='flex cursor-pointer items-center gap-4'
                                            onClick={() => navigate(item.key)}
                                        >
                                            <div
                                                className={classnames(
                                                    ' border-1 h-4 w-4 rounded-full border-solid border-slate-400',
                                                    {
                                                        'bg-slate-400': pathname === item.key
                                                    }
                                                )}
                                            />
                                            <span className='text-gray-400'>{item.name}</span>
                                        </div>
                                    )
                                })}
                            </Space>
                        </Col>
                        <Col span={24}>
                            <div className='my-8 flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <Buy set='curved' size={20} primaryColor='#6b7280' />
                                    <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                                        History Purchase
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Divider className='my-6 h-[1px]  bg-@dark-80' />
                <Row>
                    {isAuthenticated ? (
                        <CurrentUser showRole />
                    ) : (
                        <Link to={`${PATH.LOGIN}`} className='w-full'>
                            <Button size='large' className='w-full py-5' type='primary'>
                                Sign in
                            </Button>
                        </Link>
                    )}
                </Row>
            </div>
        </Sider>
    )
}

export default SidebarUser
