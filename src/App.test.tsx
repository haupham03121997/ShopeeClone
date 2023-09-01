import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

expect?.extend(matchers)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})
describe('App', () => {
    test('App render', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                {/* <AppProvider> */}
                <App />
                {/* </AppProvider> */}
            </QueryClientProvider>,
            {}
        )
    })
})
