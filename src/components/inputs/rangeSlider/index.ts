import { App } from 'vue'
import RangeSlider from './RangeSlider.vue'

RangeSlider.install = (Vue: App) => {
  Vue.component(RangeSlider.name, RangeSlider)
}

export default RangeSlider
