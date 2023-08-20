import { Button, Col } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'

interface Props {
    value: string
    text: string
    defaultValue?: string
    isActive?: boolean
    handleClick?: () => void
}

const SortProductItem: FC<Props> = ({ text, handleClick, isActive }): JSX.Element => {
    return (
        <Col className='flex items-center justify-center'>
            <Button
                onClick={handleClick}
                type='primary'
                size='large'
                className={classNames('border border-@dark-80 py-2', {
                    'bg-transparent': !isActive,
                    'bg-@primary-1': isActive
                })}
            >
                {text}
            </Button>
        </Col>
    )
}

export default SortProductItem
