import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        math: "always",
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://irlin.cn/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
