import Button from './components/button'
import { Slider, Checkbox } from './components/inputs'
import Sheet from './components/sheet'

import './styles/index.css'
import { App } from 'vue'

const components = {
  Button,
  Slider,
  Checkbox,
  Sheet
}

function install(Vue: App): void {
  for (const component in components) {
    // @ts-expect-error implicit any
    Vue.component(components[component].name, components[component])
  }
}

export default { install }

export { default as Button } from './components/button'
export { default as Slider } from './components/inputs/slider'
export { default as Sheet } from './components/sheet'
