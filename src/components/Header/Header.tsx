import { Button, Col, InputRef, Row } from 'antd'
import React, { FC, useRef, useState } from 'react'
import { RiCloseLine, RiMenuFill } from 'react-icons/ri'
import HeaderText from './HeaderText'
import { CloseSquare, Search } from 'react-iconly'
import HeaderCard from './HeaderCard'
import HeaderNotifications from './HeaderNotifications'
import HeaderUser from './HeaderUser'
import HeaderSearch from './HeaderSearch'
import classes from 'src/styles/header-search.module.css'

const Header: FC = (): JSX.Element => {
    const [searchHeader, setSearchHeader] = useState<boolean>(false)
    const [searchActive, setSearchActive] = useState<boolean>(false)

    const inputFocusRef = useRef<InputRef | null>(null)

    const searchClick = () => {
        setSearchHeader(!searchHeader)
        setTimeout(() => {
            inputFocusRef.current?.focus({
                cursor: 'start'
            })
        }, 200)
    }

    // Search Active
    setTimeout(() => setSearchActive(searchHeader), 100)

    return (
        <div className='mx-8 mt-6 '>
            <Row className=' rounded-lg bg-black p-6' justify='space-between'>
                <Col
                    flex='1'
                    style={{ display: !searchHeader ? 'none' : 'block' }}
                    className={`mr-8 ${classes.headerSearch} ${searchActive && classes.headerSearchActive}`}
                >
                    <HeaderSearch ref={inputFocusRef} />
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
