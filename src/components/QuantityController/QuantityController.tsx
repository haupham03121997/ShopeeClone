import { InputNumber } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import useDebounce from 'src/hooks/useDebounce'

interface Props {
    onChangeValue: (value: number | null) => void
}

const QuantityController: FC<Props> = ({ onChangeValue }): JSX.Element => {
    const [value, setValue] = useState<number | null>(0)
    const handleOnchange = (value: number | null) => {
        setValue(value)
    }
    const valueDebounce = useDebounce<number | null>(value, 500)

    useEffect(() => {
        onChangeValue(valueDebounce)
    }, [valueDebounce])

    return <InputNumber className='py-1' onChange={handleOnchange} />
}

export default QuantityController
