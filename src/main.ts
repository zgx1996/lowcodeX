import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'uno.css'
import { createPinia } from 'pinia'

import contextmenu from './directive/contextmenu'

const pinia = createPinia()
const app =createApp(App)
app.directive('contextmenu',contextmenu)
app.use(pinia).use(ElementPlus).mount('#app')
