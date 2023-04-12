import { Input, InputRef } from 'antd'
import React, { forwardRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export type Ref = InputRef

const HeaderSearch = forwardRef<Ref>((_, ref) => (
    <div>
        <Input
            ref={ref}
            placeholder='Search...'
            prefix={<RiSearchLine className='site-form-item-icon hp-text-color-black-80 hp-text-color-dark-20' />}
        />
    </div>
))

HeaderSearch.displayName = 'HeaderSearch'
export default HeaderSearch
