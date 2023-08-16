import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './constants/path'
import useAppContext from './hooks/useAppContext'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import UserProfile from './pages/UserProfile'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import SearchProducts from './pages/SearchProducts'
import Cart from './pages/Cart'
import AddressInformation from './pages/AddressInformation'
import PaymentOptions from './pages/PaymentOptions'
import UserLayout from './layouts/UserLayout'
import ChangePassword from './pages/ChagePassword'
import UserAddress from './pages/UserAddress'

function ProtectedRoute() {
    const { isAuthenticated } = useAppContext()
    return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

function RejectedRoute() {
    const { isAuthenticated } = useAppContext()
    return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOME} />
}

export default function useRouteElement() {
    const routeElements = useRoutes([
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: PATH.CART,
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: PATH.CART,
                            element: (
                                <MainLayout>
                                    <Cart />
                                </MainLayout>
                            )
                        }
                    ]
                },
                {
                    path: PATH.ADDRESS_INFORMATION,
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: PATH.ADDRESS_INFORMATION,
                            element: (
                                <MainLayout>
                                    <AddressInformation />
                                </MainLayout>
                            )
                        }
                    ]
                },
                {
                    path: PATH.PAYMENT_OPTIONS,
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: PATH.PAYMENT_OPTIONS,
                            element: (
                                <MainLayout>
                                    <PaymentOptions />
                                </MainLayout>
                            )
                        }
                    ]
                },
                {
                    path: PATH.USER,
                    element: (
                        <MainLayout typeNav='nav-user'>
                            <UserLayout />
                        </MainLayout>
                    ),
                    children: [
                        {
                            path: PATH.USER_PROFILE,
                            element: <UserProfile />
                        },
                        {
                            path: PATH.CHANGE_PASSWORD,
                            element: <ChangePassword />
                        },
                        {
                            path: PATH.USER_ADDRESS,
                            element: <UserAddress />
                        }
                    ]
                }
            ]
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: PATH.LOGIN,
                    element: (
                        <AuthenticationLayout>
                            <Login />
                        </AuthenticationLayout>
                    )
                },
                {
                    path: PATH.REGISTER,
                    element: (
                        <AuthenticationLayout>
                            <Register />
                        </AuthenticationLayout>
                    )
                }
            ]
        },
        {
            path: PATH.HOME,
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            )
        },
        {
            path: PATH.PRODUCT_DETAIL + '/:id',
            index: true,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },
        {
            path: PATH.SEARCH_PRODUCT,
            index: true,
            element: (
                <MainLayout>
                    <SearchProducts />
                </MainLayout>
            )
        }
    ])
    return routeElements
}
