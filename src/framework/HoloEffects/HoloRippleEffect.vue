<script setup lang="ts">
import { watch } from 'vue'
import LtHoloRenderer from 'holocore'
import { Ripple } from 'holocore'
import type { RippleOptions } from 'holocore/src/EffectDrivers/Ripple'

const props = defineProps<{
  renderer?: LtHoloRenderer
  options?: Partial<RippleOptions>
  origin: [number, number]
}>()

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
</script>
