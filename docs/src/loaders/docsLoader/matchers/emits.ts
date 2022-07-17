import { ComponentEvent } from '@docs/types/ComponentDocumentation'

export default function matchEmits(code: string): ComponentEvent[] {
  const regex = /\/\*\*(.*?)\*\/\s*\(\w:\s*'(\w+)',\s*\w+:\s*(\w+)\)/gs
  // split code at "defineEmits" and return latter part
  const codeAfterDefineEmits = code.split('defineEmits')[1]
  if (!codeAfterDefineEmits) {
    return []
  }
  // match all emits and return array of ComponentEvent
  return Array.from(codeAfterDefineEmits.matchAll(regex)).map((match) => {
    const [, description, name, payload] = match
    return {
      name,
      payload,
      description: description.replaceAll(/\s*\*\s*/g, ' ').trim()
    }
  })
}
