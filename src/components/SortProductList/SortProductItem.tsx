import { Button, Col } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'

interface Props {
    value: string
    text: string
    defaultValue: string
    handleClick?: () => void
}

const SortProductItem: FC<Props> = ({ text, handleClick, value, defaultValue }): JSX.Element => {
    return (
        <Col className='flex items-center justify-center'>
            <Button
                onClick={handleClick}
                type='primary'
                size='large'
                className={classNames('border border-@dark-80 py-2', {
                    'bg-transparent': value !== defaultValue,
                    'bg-@primary-1': value === defaultValue
                })}
            >
                {text}
            </Button>
        </Col>
    )
}

export default SortProductItem
