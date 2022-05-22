import { App } from 'vue'
import Notification from './Notification.vue'

Notification.install = (Vue: App) => {
  Vue.component(Notification.name, Notification)
}

export default Notification
