import { FC } from 'react'
import { Avatar, Divider, Dropdown, Space, Switch, Tooltip, Typography } from 'antd'
import useAppContext from 'src/hooks/useAppContext'

import imageLogo from 'src/assets/images/memoji/memoji-1.png'
import { Filter, Logout, Password, ShieldDone, User } from 'react-iconly'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from 'src/apis/auth.api'
import { removeCurrentUser } from 'src/utils/auth'
import { useNavigate } from 'react-router-dom'
import { PATH } from 'src/constants/path'

interface Props {
    showRole?: boolean
    hiddenEmail?: boolean
    showTooltip?: boolean
}

const CurrentUser: FC<Props> = ({ showRole, hiddenEmail, showTooltip }): JSX.Element => {
    const navigate = useNavigate()
    const { currentUser, setIsAuthenticated, setCurrentUser } = useAppContext()

    const { mutate } = useMutation({
        mutationFn: () => logoutAccount()
    })

    const handleLogout = async () => {
        await mutate()
        removeCurrentUser()
        setIsAuthenticated(false)
        setCurrentUser(null)
    }

    const handleViewProfile = () => {
        navigate(PATH.USER_PROFILE)
    }

    return (
        <Tooltip
            title={showTooltip ? currentUser && currentUser.email : ''}
            className='text-sm'
            overlayInnerStyle={{ fontSize: 12 }}
        >
            <Dropdown
                arrow
                dropdownRender={() => (
                    <div className='dropdown-render'>
                        <Typography className='mb-2 font-mono text-lg dark:text-gray-500'>Profile settings</Typography>
                        <div className='flex items-center justify-between'>
                            <Space className='w-full' size={8}>
                                <div
                                    style={{ width: 25, height: 25 }}
                                    className=' border-3 0 flex items-center justify-center rounded-full border-solid border-blue-800 p-0'
                                >
                                    <Avatar
                                        src={imageLogo}
                                        alt={currentUser ? currentUser.email : 'avatar'}
                                        size={20}
                                    />
                                </div>
                                <Space direction='vertical' size={0}>
                                    <Typography.Paragraph
                                        ellipsis={{
                                            rows: 1,
                                            expandable: false
                                        }}
                                        className='!mb-0   pr-3 text-sm font-medium dark:text-gray-300'
                                    >
                                        {currentUser && currentUser.email}
                                    </Typography.Paragraph>
                                    <Typography className='text-xs font-medium dark:text-gray-500'>
                                        {currentUser && currentUser.roles[0]}
                                    </Typography>
                                </Space>
                            </Space>
                            <div className='pl-10'>
                                <ShieldDone primaryColor='green' size={20} />
                            </div>
                        </div>
                        <Divider className='my-6 h-[1px]  bg-@dark-80' />
                        <Space direction='vertical' size={12} className='w-full'>
                            <Space size={6} className=' hover-react-iconly cursor-pointer'>
                                <User set='light' primaryColor='#d1d5db' size={16} />
                                <Typography
                                    onClick={handleViewProfile}
                                    className='cursor-pointer pb-1 text-sm transition-all duration-100 dark:text-gray-300 hover:dark:text-blue-700'
                                >
                                    View Profile
                                </Typography>
                            </Space>
                            <Space size={6} className=' hover-react-iconly cursor-pointer'>
                                <Password set='light' primaryColor='#d1d5db' size={16} />
                                <Typography className='cursor-pointer pb-1 text-sm transition-all duration-100 dark:text-gray-300 hover:dark:text-blue-700'>
                                    Change Password
                                </Typography>
                            </Space>
                            <div className='flex items-center justify-between'>
                                <Space size={6} className=' hover-react-iconly cursor-pointer'>
                                    <Filter set='light' primaryColor='#d1d5db' size={16} />
                                    <Typography className='cursor-pointer pb-1 text-sm transition-all duration-100 dark:text-gray-300 hover:dark:text-blue-700'>
                                        Dark Mode
                                    </Typography>
                                </Space>
                                <Switch size='small' />
                            </div>
                        </Space>
                        <Divider className='my-6 h-[1px]  bg-@dark-80' />
                        <Space size={6} className=' hover-react-iconly cursor-pointer' onClick={handleLogout}>
                            <Logout set='light' primaryColor='#d1d5db' size={16} />
                            <Typography className=' pb-2 text-sm transition-all duration-100 dark:text-gray-300 hover:dark:text-blue-700'>
                                Log out
                            </Typography>
                        </Space>
                    </div>
                )}
            >
                <Space size={8} className='cursor-pointer'>
                    <Avatar src={imageLogo} alt={currentUser ? currentUser.email : 'avatar'} size={40} />

                    <Space direction='vertical' size={4}>
                        {!hiddenEmail && (
                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 1,
                                    expandable: false
                                }}
                                className='!mb-0 w-3/4 pr-3 text-sm font-medium dark:text-gray-300'
                            >
                                {currentUser && currentUser.email}
                            </Typography.Paragraph>
                        )}
                        {showRole && (
                            <Typography className='text-xs font-medium dark:text-gray-500'>
                                {currentUser && currentUser.roles[0]}
                            </Typography>
                        )}
                    </Space>
                </Space>
            </Dropdown>
        </Tooltip>
    )
}

export default CurrentUser
