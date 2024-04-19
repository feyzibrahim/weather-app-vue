import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiCloudSun, BiInfoCircleFill, BiPlus, BiTrash } from 'oh-vue-icons/icons'

const app = createApp(App)

addIcons(BiCloudSun, BiInfoCircleFill, BiPlus, BiTrash)

app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
