<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Holo from 'holocore'
import type { LtHoloOptions } from 'holocore/src/Holo'
import getColor from '@/helpers/getColor'

const props = withDefaults(
  defineProps<{
    options?: Partial<LtHoloOptions>
    color?: string
    disabled?: boolean
  }>(),
  {
    options: () => ({}),
    color: 'foreground'
  }
)

const self = ref<HTMLElement>()
let holo = ref<Holo>()

function createOptions(
  options: Partial<LtHoloOptions>,
  color: string
): Partial<LtHoloOptions> {
  const rgb = getColor(color)
  options.color = { rgb }
  return options
}

onMounted(() => {
  if (self.value) {
    holo.value = new Holo(self.value, createOptions(props.options, props.color))
    if (props.disabled) {
      holo.value.t.pause()
    }
  }
})

onUnmounted(() => {
  holo.value?.destroy()
})

watch(
  () => props.options,
  (options) => {
    holo.value?.reconfigure(createOptions(options ?? {}, props.color))
  }
)

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      holo.value?.t.pause()
    } else {
      holo.value?.t.play()
    }
  }
)
</script>

<template>
  <slot
    name="effects"
    :renderer="holo"
  />
  <div :class="['holo-wrapper', $attrs.class]">
    <div
      ref="self"
      class="holo-render"
    />
    <div class="holo-slot">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.holo-wrapper {
  position: relative;
  display: inline-block;
}

.holo-render {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.holo-wrapper.muted .holo-render {
  opacity: 0.5;
}

.holo-slot {
  display: flex;
}
</style>
