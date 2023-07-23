import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './constants/path'
import useAppContext from './hooks/useAppContext'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import SearchProducts from './pages/SearchProducts'
import Cart from './pages/Cart'

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
                    path: PATH.PROFILE,
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
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
        },
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
        }
    ])
    return routeElements
}
