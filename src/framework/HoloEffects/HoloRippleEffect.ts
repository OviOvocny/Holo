import { defineComponent, PropType, watch } from 'vue'
import LtHoloRenderer, { Ripple } from 'holocore'
import type { RippleOptions } from 'holocore'

export default defineComponent({
  name: 'HoloRippleEfect',
  props: {
    renderer: LtHoloRenderer,
    options: {
      type: Object as PropType<Partial<RippleOptions>>,
      default: () => ({})
    },
    origin: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [0, 0]
    }
  },
  setup(props) {
    let ripple: Ripple | null = null

    watch(
      () => props.renderer,
      (holo) => {
        if (holo) {
          ripple = new Ripple(holo, props.options)
        }
      }
    )

    watch(
      () => props.origin,
      ([x, y]) => {
        ripple?.overrideOrigin(x, y)
        ripple?.trigger()
      }
    )

    return () => null
  }
})
