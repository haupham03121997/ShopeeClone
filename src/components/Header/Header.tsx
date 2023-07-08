import { Button, Col, InputRef, Row } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { RiCloseLine, RiMenuFill } from 'react-icons/ri'
import HeaderText from './HeaderText'
import { CloseSquare, Search } from 'react-iconly'
import HeaderCard from './HeaderCard'
import HeaderNotifications from './HeaderNotifications'
import HeaderUser from './HeaderUser'
import HeaderSearch from './HeaderSearch'
import classes from 'src/styles/header-search.module.css'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PATH } from 'src/constants/path'
import { omit } from 'lodash'

const Header: FC = (): JSX.Element => {
    const navigate = useNavigate()
    const [searchHeader, setSearchHeader] = useState<boolean>(false)
    const [searchActive, setSearchActive] = useState<boolean>(false)

    const inputFocusRef = useRef<InputRef | null>(null)

    const { queryConfig } = useQueryConfig()

    const searchClick = () => {
        if (!searchHeader) {
            setSearchHeader(!searchHeader)
            setTimeout(() => {
                inputFocusRef.current?.focus({
                    cursor: 'end'
                })
            }, 200)
        } else {
            setSearchHeader(false)
            navigate(PATH.HOME)
        }
    }

    // Search Active
    setTimeout(() => setSearchActive(searchHeader), 100)

    const onTriggerSearch = () => {
        const valueInput = inputFocusRef.current?.input?.value
        const config = queryConfig?.order
            ? omit({ ...queryConfig, name: valueInput }, ['order', 'sort_by'])
            : {
                  ...queryConfig,
                  name: valueInput
              }
        if (valueInput) {
            navigate({
                pathname: PATH.SEARCH_PRODUCT,
                search: createSearchParams(omit({ ...queryConfig, name: valueInput }, ['order', 'sort_by'])).toString()
            })
        }
    }

    useEffect(() => {
        if (queryConfig.name) {
            setSearchHeader(true)
            setTimeout(() => {
                inputFocusRef.current?.focus({
                    cursor: 'end'
                })
            }, 200)
        }
    }, [queryConfig])

    return (
        <div className='mx-8 mt-6 '>
            <Row className=' rounded-lg bg-black p-6' justify='space-between'>
                <Col
                    flex='1'
                    style={{ display: !searchHeader ? 'none' : 'block' }}
                    className={`mr-8 ${classes.headerSearch} ${searchActive && classes.headerSearchActive}`}
                >
                    <HeaderSearch
                        defaultValue={queryConfig.name || ''}
                        ref={inputFocusRef}
                        onTriggerSearch={onTriggerSearch}
                    />
                </Col>
                {!searchHeader && <HeaderText />}

                <Col>
                    <Row className='flex items-center'>
                        <Button
                            onClick={searchClick}
                            type='text'
                            className='btn-icon'
                            icon={
                                searchHeader ? (
                                    <CloseSquare set='light' primaryColor='#b2bec3' />
                                ) : (
                                    <Search set='curved' primaryColor='#b2bec3' />
                                )
                            }
                        />
                        <HeaderCard />
                        <HeaderNotifications />
                        <HeaderUser />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Header
