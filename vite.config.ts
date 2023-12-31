import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy:{
      '/api': {
        target: "http://localhost:1112/", // 需要代理的域名
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求							的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
   
  },
  }
})
