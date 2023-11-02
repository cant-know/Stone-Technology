import { createApp } from 'vue'
import App from './App.vue'
import './styles/reset.scss'
import router from './router'
import pinia from './store/index.ts'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './permission.ts'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Antd)

pinia.use(piniaPluginPersistedState)

app.mount('#app')