import { useSlots, VNode } from 'vue'

export default function useDeepestSlot() {
  return function () {
    const slots = useSlots()
    if (slots.default) {
      let slot = slots.default()
      let foundSlot = false
      do {
        foundSlot = false
        for (const child of slot) {
          if (child.el == null && child.key && child.key === '_default') {
            slot = child.children as VNode[]
            foundSlot = true
            break
          }
        }
      } while (foundSlot)
      return slot
    }
  }
}
