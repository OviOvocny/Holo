import { App } from 'vue'
import ListItem from './ListItem.vue'

ListItem.install = (Vue: App) => {
  Vue.component(ListItem.name, ListItem)
}

export default ListItem
