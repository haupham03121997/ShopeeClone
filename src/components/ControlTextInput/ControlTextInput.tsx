import { Input as InputAntd } from 'antd'

import { Controller } from 'react-hook-form'
import type { FieldError, UseControllerProps, FieldValues } from 'react-hook-form'

interface Props<T extends FieldValues> extends UseControllerProps<T> {
    errors: FieldError | undefined
    label?: string
    type?: React.HTMLInputTypeAttribute
}

const ControlTextInput = <T extends FieldValues>({ name, control, errors, label, type = 'text' }: Props<T>) => {
    return (
        <>
            {label && <span className='block pb-2  text-white dark:text-@dark-10'>{label}</span>}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <>
                        {type === 'password' ? (
                            <InputAntd.Password
                                autoComplete='off'
                                {...field}
                                type='password'
                                className='bg-transparent py-3'
                            />
                        ) : (
                            <InputAntd
                                autoComplete='off'
                                {...field}
                                type={type}
                                className='border-@dark-80 bg-transparent py-3 text-white dark:text-@dark-10'
                            />
                        )}

                        {errors?.message && <span className='block pt-2 text-sm text-rose-500'>{errors.message}</span>}
                    </>
                )}
            />
        </>
    )
}

export default ControlTextInput
