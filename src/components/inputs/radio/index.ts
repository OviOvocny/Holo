import { App } from 'vue'
import Radio from './Radio.vue'

Radio.install = (Vue: App) => {
  Vue.component(Radio.name, Radio)
}

export default Radio
