import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        devSourcemap: true
    },
    optimizeDeps: {
        include: ['tailwind.config.js']
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            'tailwind.config.cjs': path.resolve(__dirname, 'tailwind.config.cjs')
        }
    }
})
