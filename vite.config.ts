import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
// import Components from 'unplugin-vue-components/vite'
// import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6'
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    port: 1314,
    // 选项写法
    proxy: {
      '/pag': {
        target: 'https://cdn.tmui.design',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  plugins: [
    uni(),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          from: 'uni-mini-router',
          imports: ['createRouter', 'useRouter', 'useRoute']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/store'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true
      }
    })
  ]
})
