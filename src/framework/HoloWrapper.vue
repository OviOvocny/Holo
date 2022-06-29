<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  inject,
  ComputedRef,
  nextTick
} from 'vue'
import Holo from 'holocore'
import type { LtHoloOptions } from 'holocore/src/Holo'
import getColor from '@/helpers/getColor'

const theme = inject<ComputedRef<string>>('themeName')
const disabledGlobally = inject('disableHolograms') as ComputedRef<boolean>

const props = withDefaults(
  defineProps<{
    options?: Partial<LtHoloOptions>
    color?: string
    disabled?: boolean
    block?: boolean
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
  options.color = { rgb, ...options.color }
  return options
}

async function createHolo() {
  if (disabledGlobally.value) return
  await nextTick()
  destroyHolo()
  if (self.value) {
    holo.value = new Holo(self.value, createOptions(props.options, props.color))
    if (props.disabled) {
      holo.value.t.pause()
    }
  }
}

function destroyHolo() {
  holo.value?.destroy()
  if (self.value) {
    self.value.innerHTML = '' // fugly
  }
}

onMounted(createHolo)
onUnmounted(destroyHolo)

watch(
  () => props.options,
  (options) => {
    holo.value?.reconfigure(createOptions(options ?? {}, props.color))
  }
)

watch([() => props.color, theme], createHolo)

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

watch(disabledGlobally, (disabled) => {
  if (disabled) {
    destroyHolo()
  } else {
    createHolo()
  }
})
</script>

<template>
  <slot
    name="effects"
    :renderer="holo"
  />
  <div :class="['holo-wrapper', $attrs.class, { 'holo-wrapper-block': block }]">
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
  z-index: 0;
}

.holo-wrapper-block {
  display: block;
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
