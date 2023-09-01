import React, { Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './constants/path'
import useAppContext from './hooks/useAppContext'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import MainLayout from './layouts/MainLayout'
import UserLayout from './layouts/UserLayout'
// import Login from './pages/Login'
const Login = React.lazy(() => import('./pages/Login'))
const ProductList = React.lazy(() => import('./pages/ProductList'))
const UserProfile = React.lazy(() => import('./pages/UserProfile'))
const Register = React.lazy(() => import('./pages/Register'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const SearchProducts = React.lazy(() => import('./pages/SearchProducts'))
const Cart = React.lazy(() => import('./pages/Cart'))
const AddressInformation = React.lazy(() => import('./pages/AddressInformation'))
const PaymentOptions = React.lazy(() => import('./pages/PaymentOptions'))
const ChangePassword = React.lazy(() => import('./pages/ChangePassword'))
const UserAddress = React.lazy(() => import('./pages/UserAddress'))

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
            path: '/dev/clone',
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
                                    <Suspense>
                                        <Cart />
                                    </Suspense>
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
                                    <Suspense>
                                        <AddressInformation />
                                    </Suspense>
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
                                    <Suspense>
                                        <PaymentOptions />
                                    </Suspense>
                                </MainLayout>
                            )
                        }
                    ]
                },
                {
                    path: PATH.USER,
                    element: (
                        <MainLayout typeNav='nav-user'>
                            <Suspense>
                                {' '}
                                <UserLayout />
                            </Suspense>
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
                            <Suspense>
                                <Login />
                            </Suspense>
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
                    <Suspense>
                        {' '}
                        <ProductList />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: PATH.PRODUCT_DETAIL + '/:id',
            index: true,
            element: (
                <MainLayout>
                    <Suspense>
                        <ProductDetail />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: PATH.SEARCH_PRODUCT,
            index: true,
            element: (
                <MainLayout>
                    <Suspense>
                        <SearchProducts />
                    </Suspense>
                </MainLayout>
            )
        }
    ])
    return routeElements
}
