import { ComponentSlot } from '@docs/types/ComponentDocumentation'

export default function matchSlots(code: string): ComponentSlot[] {
  const regex =
    /(?:<!--\+(.*?)-->\s*)?<slot(?:\s*name="(.*?)")?(?:\s*\/>|>.*?<\/slot>)/gs
  // match all slots and return array of ComponentSlot
  return Array.from(code.matchAll(regex)).map((match) => {
    const [, description, name] = match
    return {
      name: name ?? 'default',
      description: description?.replaceAll(/\s*\*\s*/g, ' ').trim()
    }
  })
}
