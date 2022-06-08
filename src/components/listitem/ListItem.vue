<script lang="ts">
export default {
  name: 'HListItem'
}
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {}
)
</script>

<template>
  <li
    class="holo-list-item"
  >
    <slot />
  </li>
</template>
