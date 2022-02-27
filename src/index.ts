import Button from './components/button'
import { Slider, Checkbox, Radio } from './components/inputs'
import Sheet from './components/sheet'

import './styles/index.css'
import { App } from 'vue'

const components = {
  Button,
  Slider,
  Checkbox,
  Radio,
  Sheet
}

function install(Vue: App): void {
  for (const component in components) {
    // @ts-expect-error implicit any
    Vue.component(components[component].name, components[component])
  }
}

export default { install }

export * from './components/inputs'
export { default as Button } from './components/button'
export { default as Sheet } from './components/sheet'
