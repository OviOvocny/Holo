import Root from './components/root'
import { AGrid, Area } from './components/grid'
import List from './components/list'
import ListItem from './components/listitem'
import Button from './components/button'
import {
  Slider,
  RangeSlider,
  Checkbox,
  Radio,
  RadioGroup,
  InputField,
  TextArea,
  File
} from './components/inputs'
import Notification from './components/notification'
import Alert from './components/alert'
import Badge from './components/badge'
import Meter from './components/meter'

import './styles/index.css'
import { App, Plugin } from 'vue'

const components = {
  Root,
  AGrid,
  Area,
  List,
  ListItem,
  Button,
  Slider,
  RangeSlider,
  Checkbox,
  Radio,
  RadioGroup,
  InputField,
  TextArea,
  File,
  Notification,
  Alert,
  Badge,
  Meter
}

const plugin: Plugin = {
  install: (Vue: App): void => {
    for (const component in components) {
      // @ts-expect-error implicit any
      Vue.component(components[component].name, components[component])
    }
  }
}

export default plugin

// @TODO export individual components
// export * from './components/inputs'
// export { default as Button } from './components/button'
