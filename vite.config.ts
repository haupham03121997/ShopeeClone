import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000
    },
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
            src: path.resolve(__dirname, './src')
            // '@': resolve(__dirname, './src'),
            // 'tailwind.config.cjs': path.resolve(__dirname, 'tailwind.config.cjs')
        }
    },
    define: {
        'process.env': process.env ?? {}
    }
})
