import { App } from 'vue'
import File from './File.vue'

File.install = (Vue: App) => {
  Vue.component(File.name, File)
}

export default File
