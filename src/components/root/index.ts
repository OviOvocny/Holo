import { App } from 'vue'
import Root from './Root.vue'

Root.install = (Vue: App) => {
  Vue.component(Root.name, Root)
}

export default Root
