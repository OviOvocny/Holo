import { App } from 'vue'
import Meter from './Meter.vue'

Meter.install = (Vue: App) => {
  Vue.component(Meter.name, Meter)
}

export default Meter
