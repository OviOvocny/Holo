<script lang="ts">
export default {
  name: 'HArea'
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    element?: string
    area?: string
  }>(),
  {
    element: 'div',
    area: 'none'
  }
)
</script>

<template>
  <component
    :is="element"
    class="holo-grid-area"
  >
    <slot />
  </component>
</template>

<style scoped>
.holo-grid-area {
  grid-area: v-bind("props.area");
}
</style>
