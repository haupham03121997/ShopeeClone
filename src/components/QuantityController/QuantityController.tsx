import { InputNumber, InputNumberProps } from 'antd'
import { valueType } from 'antd/es/statistic/utils'
import React, { FC, useEffect, useState } from 'react'
import useDebounce from 'src/hooks/useDebounce'

type TypeValue = number | string | null
interface Props extends InputNumberProps {
    onChangeValue: (value: TypeValue) => void
}

const QuantityController: FC<Props> = ({ onChangeValue, ...props }): JSX.Element => {
    const [value, setValue] = useState<number | string | null>(0)
    const handleOnchange = (value: TypeValue) => {
        if (value && Number(value) >= 0) {
            setValue(value)
        }
    }
    const valueDebounce = useDebounce<TypeValue>(value, 500)

    useEffect(() => {
        onChangeValue(valueDebounce)
    }, [valueDebounce])

    return <InputNumber {...props} className='py-1' onChange={handleOnchange} />
}

export default QuantityController
