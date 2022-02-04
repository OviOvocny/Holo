import { createApp } from 'vue'
import App from './App.vue'
import Holo from './index'

const app = createApp(App)

app.use(Holo)
app.mount('#app')
