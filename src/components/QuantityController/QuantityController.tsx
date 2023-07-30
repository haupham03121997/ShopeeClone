import { FC } from 'react'
import { debounce } from 'lodash'
import { InputNumber, InputNumberProps } from 'antd'

type TypeValue = number | string | null
interface Props extends InputNumberProps {
    onChangeValue: (value: TypeValue) => void
}

const QuantityController: FC<Props> = ({ onChangeValue, ...props }): JSX.Element => {
    const debouncedOnChange = debounce((value: TypeValue) => {
        if (value && Number(value) >= 0) {
            onChangeValue(value)
        }
    }, 500)

    return <InputNumber min={0} max={99} {...props} className='py-1' onChange={debouncedOnChange} />
}

export default QuantityController
