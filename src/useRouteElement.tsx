import React from 'react'
import { useRoutes } from 'react-router-dom'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'

export default function useRouteElement() {
    const routeElements = useRoutes([
        {
            path: '/',
            element: <ProductList />
        },
        {
            path: '/authentication/login',
            element: (
                <AuthenticationLayout>
                    <Login />
                </AuthenticationLayout>
            )
        },
        {
            path: '/authentication/register',
            element: (
                <AuthenticationLayout>
                    <Register />
                </AuthenticationLayout>
            )
        }
    ])
    return routeElements
}
