import { Form, Input, InputRef } from 'antd'
import React, { forwardRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export type Ref = InputRef
interface Props {
    onTriggerSearch: () => void
    defaultValue?: string
}
const HeaderSearch = forwardRef<Ref, Props>((props, ref) => {
    const { onTriggerSearch, defaultValue } = props
    return (
        <div>
            <Form onFinish={onTriggerSearch}>
                <Input
                    ref={ref}
                    placeholder='Search...'
                    prefix={
                        <RiSearchLine className='site-form-item-icon hp-text-color-black-80 hp-text-color-dark-20' />
                    }
                    defaultValue={defaultValue}
                />
            </Form>
        </div>
    )
})

HeaderSearch.displayName = 'HeaderSearch'
export default HeaderSearch
