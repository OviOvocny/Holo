<script lang="ts">
export default {
  name: 'HBadge'
}
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string
    hollow?: boolean
  }>(),
  {
    color: 'highlight'
  }
)
</script>

<template>
  <div 
    class="holo-badge"
    :class="
      [`holo-variable-color-${color}`, 
       { 
         'holo-badge-hollow': hollow
       }]"
  >
    <slot />
  </div>
</template>

<style>
.holo-badge {
  font-size: 0.85em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15em 0.5em;
  min-width: 1.65em;
  min-height: 1.65em;
  border-radius: 2em;
  background-color: hsl(var(--variable-color) / 70%);
  color: hsl(var(--readable-color));
}

.holo-badge-hollow {
  background-color: transparent;
  padding: calc(0.15em - 2px) calc(0.5em - 2px);
  border: 2px solid hsl(var(--variable-color));
  color: hsl(var(--variable-color));
}
</style>
