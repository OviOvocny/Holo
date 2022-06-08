import Root from './components/root'
import { AGrid, Area } from './components/grid'
import List from './components/list'
import ListItem from './components/listitem'
import Button from './components/button'
import {
  Slider,
  Checkbox,
  Radio,
  RadioGroup,
  InputField,
  TextArea,
  File
} from './components/inputs'
import Notification from './components/notification'
import Alert from './components/alert'

import './styles/index.css'
import { App } from 'vue'

const components = {
  Root,
  AGrid,
  Area,
  List,
  ListItem,
  Button,
  Slider,
  Checkbox,
  Radio,
  RadioGroup,
  InputField,
  TextArea,
  File,
  Notification,
  Alert
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
