import { App } from 'vue'
import List from './List.vue'

List.install = (Vue: App) => {
  Vue.component(List.name, List)
}

export default List
