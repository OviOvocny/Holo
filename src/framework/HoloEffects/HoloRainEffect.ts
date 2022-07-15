import { defineComponent, PropType, watch } from 'vue'
import LtHoloRenderer, { Rain } from 'holocore'
import type { RainOptions } from 'holocore'

export default defineComponent({
  name: 'HoloRainEfect',
  props: {
    renderer: LtHoloRenderer,
    options: {
      type: Object as PropType<Partial<RainOptions>>,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    let rain: Rain | null = null

    watch(
      () => props.renderer,
      (holo) => {
        if (holo) {
          rain = new Rain(holo, props.options)
          if (props.active) rain.play()
        }
      }
    )

    watch(
      () => props.active,
      (isActive) => {
        if (isActive) {
          rain?.play()
        } else {
          rain?.stop()
        }
      }
    )

    return () => null
  }
})
