import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
const UserLayoutInner: React.FC = (): JSX.Element => {
    return <Outlet />
}

const UserLayout = memo(UserLayoutInner)
export default UserLayout
