import { Button, Col } from 'antd'
import React, { FC } from 'react'
import { Notification } from 'react-iconly'

const HeaderNotifications: FC = (): JSX.Element => {
    return (
        <Col className='ml-4 flex items-center justify-center'>
            <Button className='btn-icon' type='text' icon={<Notification set='curved' primaryColor='#b2bec3' />} />
        </Col>
    )
}

export default HeaderNotifications
