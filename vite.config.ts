import { defineConfig } from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  return {
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      },
    },
    server: {
      host: true,
      port: 8000,
      proxy: {
        '^/api': {
          // target: mode === 'development' ? 'https://www.google.com' : '/',
          target: mode === 'development' ? '/' : '/',
          rewrite: path => path.replace(/^\/api/, ''),
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        '^/images': {
          target: mode === 'development' ? '/' : '/',
          changeOrigin: true,
          secure: false,
        }
      }
    },
  }
})
