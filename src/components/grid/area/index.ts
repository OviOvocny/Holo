import { App } from 'vue'
import Area from './Area.vue'

Area.install = (Vue: App) => {
  Vue.component(Area.name, Area)
}

export default Area
