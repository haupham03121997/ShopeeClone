import { Avatar, Button, Col, Divider, Dropdown, Space, Tooltip } from 'antd'
import { FC } from 'react'
import useAppContext from 'src/hooks/useAppContext'
import CurrentUser from '../CurrentUser'

const HeaderUser: FC = (): JSX.Element => {
    const { isAuthenticated } = useAppContext()
    return isAuthenticated ? (
        <Col className='ml-4  flex items-center justify-center'>
            <CurrentUser hiddenEmail />
        </Col>
    ) : (
        <div />
    )
}

export default HeaderUser
