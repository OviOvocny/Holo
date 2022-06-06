import { App } from 'vue'
import AGrid from './AGrid.vue'

AGrid.install = (Vue: App) => {
  Vue.component(AGrid.name, AGrid)
}

export default AGrid
