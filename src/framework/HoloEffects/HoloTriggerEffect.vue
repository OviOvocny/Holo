<script setup lang="ts">
import { watch } from 'vue'
import LtHoloRenderer from 'holocore'
import { Trigger } from 'holocore'
import type { TriggerOptions } from 'holocore/src/EffectDrivers/Trigger'

const props = defineProps<{
  renderer?: LtHoloRenderer
  options?: Partial<TriggerOptions>
  origin: [number, number]
}>()

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
</script>
