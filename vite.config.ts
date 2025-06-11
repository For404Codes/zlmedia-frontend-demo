import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0', // ✅ 允许局域网访问
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 🟡 你的后端 IP 和端口
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'), // 保留 /api
      },
    },
  },
})
