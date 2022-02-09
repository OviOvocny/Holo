import { defineComponent, PropType, watch } from 'vue'
import LtHoloRenderer, { Trigger } from 'holocore'
import type { TriggerOptions } from 'holocore/src/EffectDrivers/Trigger'

export default defineComponent({
  name: 'HoloRippleEfect',
  props: {
    renderer: LtHoloRenderer,
    options: {
      type: Object as PropType<Partial<TriggerOptions>>,
      default: () => ({})
    },
    origin: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [0, 0]
    }
  },
  setup(props) {
    let trigger: Trigger | null = null

    watch(
      () => props.renderer,
      (holo) => {
        if (holo) {
          trigger = new Trigger(holo, props.options)
        }
      }
    )

    watch(
      () => props.origin,
      ([x, y]) => {
        trigger?.trigger(x, y)
      }
    )

    return () => null
  }
})
