import { App } from 'vue'
import Sheet from './HoloSheet.vue'

Sheet.install = (Vue: App) => {
  Vue.component(Sheet.name, Sheet)
}

export default Sheet
