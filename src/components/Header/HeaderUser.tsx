import { Avatar, Col } from 'antd'
import { FC } from 'react'
import imageLogo from 'src/assets/images/memoji/memoji-1.png'
import useAppContext from 'src/hooks/useAppContext'

const HeaderUser: FC = (): JSX.Element => {
    const { isAuthenticated } = useAppContext()
    return isAuthenticated ? (
        <Col className='ml-4  flex items-center justify-center'>
            <Avatar src={imageLogo} size={40} className='cursor-pointer' />
        </Col>
    ) : (
        <div />
    )
}

export default HeaderUser
