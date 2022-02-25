import { App } from 'vue'
import Checkbox from './Checkbox.vue'

Checkbox.install = (Vue: App) => {
  Vue.component(Checkbox.name, Checkbox)
}

export default Checkbox
