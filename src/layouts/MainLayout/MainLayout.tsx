import { Layout } from 'antd'
import React, { FC, memo, useCallback, useEffect, useRef } from 'react'
import Header from 'src/components/Header'
import ModalConfirm from 'src/components/ModalLogin/ModalLogin'
import Sidebar from 'src/components/Sidebar'
import SidebarUser from 'src/components/SidebarUser'
import useAppContext from 'src/hooks/useAppContext'
import { useModalLoginSlice } from 'src/store/store'
import { Handle } from 'src/types/modal-confirm.type'

interface Props {
    children: React.ReactNode
    typeNav?: 'nav-user' | 'nav-main'
}

const MainLayoutInner: FC<Props> = ({ children, typeNav = 'nav-main' }) => {
    const { isAuthenticated } = useAppContext()
    const modalLoginRef = useRef<Handle | null>(null)

    const { isOpenModalLogin, setIsOpenModalLogin } = useModalLoginSlice((state) => state)

    useEffect(() => {
        if (isOpenModalLogin && !isAuthenticated) {
            modalLoginRef.current?.confirm({
                title: 'Đăng Nhập Ngay! Điều Bí Ẩn Trong Tôi Đang Chờ Bạn Khám Phá 🙈',
                action: () => {
                    setIsOpenModalLogin(false)
                }
            })
        } else {
            modalLoginRef.current?.handleClose()
        }
    }, [isOpenModalLogin, isAuthenticated, setIsOpenModalLogin])

    const renderSideBar = useCallback(() => {
        switch (typeNav) {
            case 'nav-main':
                return <Sidebar />
            case 'nav-user':
                return <SidebarUser />
            default:
                return <Sidebar />
        }
    }, [typeNav])
    return (
        <Layout className='min-h-screen w-screen  bg-@dark-90'>
            {renderSideBar()}
            <Layout className='h-screen overflow-auto bg-@dark-90'>
                <Header />
                <div className='mx-8 mt-6 '>{children}</div>
            </Layout>
            <ModalConfirm ref={modalLoginRef} centered />
        </Layout>
    )
}

const MainLayout = memo(MainLayoutInner)
export default MainLayout
