import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from "unplugin-auto-import/vite"

import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'


import vueJsx from '@vitejs/plugin-vue-jsx'

import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
        '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue({
      reactivityTransform: true
    }), 
    vueJsx(),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/packages'],
      // ui库解析器，也可以自定义
      resolvers: [
        ElementPlusResolver(),
      ],
      extensions: ['tsx','vue'],
      // 配置文件生成位置
      dts: 'src/types/components.d.ts'
    }),
    Unocss({
    presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()],
    }),
    AutoImport ({
      imports: ["vue"], // 自动导入vue和vue-router相关函数
      dts: "src/types/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
    })
  ],
  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080
    },
    // 设置 https 代理
    proxy: {
      '/api': {
          target: 'your https address',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
