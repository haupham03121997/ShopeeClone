// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [react(), visualizer()] as any,
    plugins: [react({ fastRefresh: false }) as any],
    worker: {
        plugins: [react() as any]
    },
    server: {
        port: 3000
    },
    test: {
        environment: 'jsdom' // or 'jsdom', 'node'
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
    base: '/dev/clone',
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
            // '@': resolve(__dirname, './src'),
            // 'tailwind.config.cjs': path.resolve(__dirname, 'tailwind.config.cjs')
        }
    },
    define: {
        'process.env': process.env ?? {}
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
            }
        }
    }
})
