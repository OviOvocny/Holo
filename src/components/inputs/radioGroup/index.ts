import { App } from 'vue'
import RadioGroup from './RadioGroup.vue'

RadioGroup.install = (Vue: App) => {
  Vue.component(RadioGroup.name, RadioGroup)
}

export default RadioGroup
