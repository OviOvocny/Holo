import { App } from 'vue'
import TextArea from './TextArea.vue'

TextArea.install = (Vue: App) => {
  Vue.component(TextArea.name, TextArea)
}

export default TextArea
