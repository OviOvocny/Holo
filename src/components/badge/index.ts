import { App } from 'vue'
import Badge from './Badge.vue'

Badge.install = (Vue: App) => {
  Vue.component(Badge.name, Badge)
}

export default Badge
