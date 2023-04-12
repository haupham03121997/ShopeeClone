import { Layout } from 'antd'
import React, { FC } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Sidebar from 'src/components/Sidebar'

interface Props {
    children: React.ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
    return (
        <Layout className='min-h-screen w-screen  bg-@dark-90'>
            <Sidebar />
            <Layout className='bg-@dark-90'>
                <Header />
                <div className='mx-8 mt-6'>{children}</div>
            </Layout>
        </Layout>
    )
}

export default MainLayout
