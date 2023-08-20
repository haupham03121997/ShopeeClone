import { Graph } from 'react-iconly'
import { Link } from 'react-router-dom'
import { Button, Divider, Layout, Row } from 'antd'

import { PATH } from 'src/constants/path'
import AsideFilter from '../AsideFilter'
import useAppContext from 'src/hooks/useAppContext'
import CurrentUser from '../CurrentUser'

const { Sider } = Layout

const Sidebar = (): JSX.Element => {
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
                <Row className='sidebar-content flex-1 '>
                    <AsideFilter />
                </Row>
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

export default Sidebar
