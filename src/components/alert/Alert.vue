<script lang="ts">
export default {
  name: 'HAlert'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import HoloWrapper from '@/framework/HoloWrapper.vue'
import HoloRainEffect from '@/framework/HoloEffects/HoloRainEffect'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    color?: string
    hologram?: boolean
  }>(),
  {
    color: 'foreground',
    hologram: true
  }
)
</script>

<template>
  <HoloWrapper
    :options="{
      rows: 1,
      duration: {
        rise: 0.7,
        fall: 1
      }
    }"
    :color="color"
    :class="['holo-alert-wrap']"
  >
    <!-- Effect slots -->
    <template #effects="{ renderer }">
      <HoloRainEffect
        :renderer="renderer"
        :active="hologram"
        :options="{ propagate: false, interval: 0.5 }"
      />
    </template>
    <!-- Component structure -->
    <div 
      class="holo-alert"
      :class="[`holo-variable-color-${color}`]"
    >
      <slot />
    </div>
  </HoloWrapper>
</template>

<style scoped>
.holo-alert {
  border-inline-start: 3px solid hsl(var(--variable-color));
  padding: 0.5em 1em;
  background: hsl(var(--variable-color) / 70%);
  color: hsl(var(--readable-color));
  font-family: var(--text-font, var(--system-fonts-fallback));
}
</style>
