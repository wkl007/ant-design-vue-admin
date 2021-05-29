import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { setupAntd } from '@/antd'

const app = createApp(App)

setupAntd(app)

app.use(store).use(router).mount('#app')
