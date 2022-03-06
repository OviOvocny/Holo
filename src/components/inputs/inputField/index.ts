import { App } from 'vue'
import InputField from './InputField.vue'

InputField.install = (Vue: App) => {
  Vue.component(InputField.name, InputField)
}

export default InputField
