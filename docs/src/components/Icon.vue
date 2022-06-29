<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    prefix?: string
    name: string
    color?: string
    size?: number | undefined
  }>(),
  {
    prefix: 'icon',
    color: 'inherit',
    size: undefined
  }
)

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const inheritColor = computed(() => props.color === 'inherit')
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    :height="size ? size : undefined"
  >
    <use
      :href="symbolId"
      :class="`holo-variable-color-${color}`"
      :style="{
        color: inheritColor ? 'inherit' : 'hsl(var(--variable-color))'
      }"
    />
  </svg>
</template>