import { ComponentProp } from '@docs/types/ComponentDocumentation'

export default function matchProps(code: string): ComponentProp[] {
  const hasDefaults = code.includes('withDefaults')
  const regex = /\/\*\*(.*?)\*\/\s*(\w+)(\??):\s*([\w(?: | )[\]<>]+)/gs
  // split code at "defineProps" and return latter part
  const codeAfterDefineProps = code.split('defineProps')[1]
  // match all props and return array of ComponentProp
  const props = Array.from(codeAfterDefineProps.matchAll(regex)).map(
    (match) => {
      const [, description, name, optional, type] = match
      return {
        name,
        type,
        optional: optional === '?',
        description: description.replaceAll(/\s*\*\s*/g, ' ').trim()
      }
    }
  )
  // if code has "withDefaults" add corresponding default values to props
  if (hasDefaults) {
    const defaultsBlock = code
      .match(/withDefaults\(\s*defineProps<{.*?}>\(\),\s*{(.*?)}/s)[1]
      .trim()
    // split defaultsBlock at "," and return object of default values
    const defaults = Object.fromEntries(
      defaultsBlock.split(',').map((defaultValue) => defaultValue.split(':'))
    )
    props.forEach((prop: ComponentProp) => {
      // if prop has default value add it to props
      if (defaults[prop.name]) {
        prop.default = defaults[prop.name].trim()
      }
    })
  }
  return props
}
