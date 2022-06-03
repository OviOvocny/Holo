import { App } from 'vue'
import Alert from './Alert.vue'

Alert.install = (Vue: App) => {
  Vue.component(Alert.name, Alert)
}

export default Alert
