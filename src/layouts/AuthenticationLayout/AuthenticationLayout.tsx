import { Row } from 'antd'
import React, { FC } from 'react'
import LeftContent from './LeftContent'

type Props = {
    children?: React.ReactNode
}

const AuthenticationLayout: FC<Props> = ({ children }): JSX.Element => {
    return (
        <Row style={{ minHeight: '100vh' }} className=' bg-black '>
            <LeftContent />
            {children}
        </Row>
    )
}

export default AuthenticationLayout
