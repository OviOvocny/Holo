<script lang="ts">
export default {
  name: 'HAGrid'
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    element?: string
    template?: string
  }>(),
  {
    element: 'div',
    template: 'none'
  }
)
</script>

<template>
  <component
    :is="element"
    class="holo-auto-grid"
  >
    <slot />
  </component>
</template>

<style scoped>
.holo-auto-grid {
  display: grid;
  grid-template: v-bind("props.template");
}
</style>
