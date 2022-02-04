<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Holo from 'holocore'
import type LtHoloOptions from 'holocore'

const props = defineProps<{
  options?: Partial<LtHoloOptions>
}>()

const self = ref<HTMLElement>()
let holo = ref<Holo>()

onMounted(() => {
  if (self.value) {
    holo.value = new Holo(self.value, props.options)
  }
})

onUnmounted(() => {
  holo.value?.destroy()
})

watch(
  () => props.options,
  (options) => {
    holo.value?.reconfigure(options ?? {})
  }
)
</script>

<template>
  <slot
    name="effects"
    :renderer="holo"
  />
  <div class="lt-holo-wrapper">
    <div
      ref="self"
      class="lt-holo-render"
    />
    <div class="lt-holo-slot">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lt-holo-wrapper {
  position: relative;
  display: inline-block;
}

.lt-holo-render {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.lt-holo-slot {
  display: flex;
}
</style>
