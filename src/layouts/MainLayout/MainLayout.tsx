import { Layout } from 'antd'
import React, { FC, memo } from 'react'
import Header from 'src/components/Header'
import Sidebar from 'src/components/Sidebar'

interface Props {
    children: React.ReactNode
}

const MainLayoutInner: FC<Props> = ({ children }) => {
    console.log('Rerender MainLayoutInner')
    return (
        <Layout className='min-h-screen w-screen  bg-@dark-90'>
            <Sidebar />
            <Layout className='h-screen overflow-auto bg-@dark-90'>
                <Header />
                <div className='mx-8 mt-6 '>{children}</div>
            </Layout>
        </Layout>
    )
}

const MainLayout = memo(MainLayoutInner)
export default MainLayout
