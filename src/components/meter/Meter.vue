<script lang="ts">
export default {
  name: 'HMeter'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    colors?: string | string[]
    steps?: number
    value?: number
  }>(),
  {
    colors: 'foreground',
    steps: 1,
    value: 0
  }
)

function pickColor(index: number): string {
  const { colors, steps } = props
  if (typeof colors === 'string') {
    return colors
  }
  const colorStep = steps / colors.length
  const idx = Math.floor(index / colorStep)
  return colors[idx]
}

const meterParts = computed(() => {
  let parts = []
  for (let step = 0; step < props.steps; step++) {
    const part = {
      color: pickColor(step),
      active: step < props.value,
      index: step
    }
    parts.push(part)
  }
  return parts
})
</script>

<template>
  <div class="holo-meter">
    <div
      v-for="{ color, active, index } in meterParts"
      :key="index"
      class="holo-meter-part"
      :class="
        [`holo-variable-color-${color}`, 
         { 
           'holo-meter-part-active': active
         }]"
    />
  </div>
</template>

<style>
.holo-meter {
  display: flex;
  justify-content: space-evenly;
  margin-block: 0.25em;
}

.holo-meter-part {
  height: 0.25em;
  width: 100%;
  background-color: hsl(var(--foreground) / 30%);
  clip-path: polygon(0.25em 0, 100% 0, calc(100% - 0.25em) 100%, 0 100%);
  transition: background-color 0.5s;
}

.holo-meter-part:first-child {
  clip-path: polygon(0 0, 100% 0, calc(100% - 0.25em) 100%, 0 100%);
}

.holo-meter-part:last-child {
  clip-path: polygon(0.25em 0, 100% 0, 100% 100%, 0 100%);
}

.holo-meter-part-active {
  background-color: hsl(var(--variable-color));
  transition: background-color 0.2s var(--ease-blink);
}
</style>
