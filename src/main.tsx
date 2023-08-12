import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App'
import { AppProvider } from './context/app.context'

import './index.css'
import './i18n/index'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <App />
                <Toaster position='top-center' />
            </AppProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </BrowserRouter>
)
