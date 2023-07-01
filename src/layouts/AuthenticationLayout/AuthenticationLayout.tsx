import { Row } from 'antd'
import React, { FC, memo } from 'react'
import LeftContent from './LeftContent'

type Props = {
    children?: React.ReactNode
}

const AuthenticationLayoutInner: FC<Props> = ({ children }): JSX.Element => {
    return (
        <Row style={{ minHeight: '100vh' }} className=' bg-black '>
            <LeftContent />
            {children}
        </Row>
    )
}
const AuthenticationLayout = memo(AuthenticationLayoutInner)

export default AuthenticationLayout
