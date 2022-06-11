<script lang="ts">
export default {
  name: 'HList'
}
</script>

<script setup lang="ts">
import { provide } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    collapsed?: boolean
    stagger?: number
  }>(),
  {
    label: undefined,
    stagger: 50
  }
)

provide<number>('stagger', props.stagger)
</script>

<template>
  <div
    v-if="label || $slots.shortcuts"
    class="holo-list-header"
  >
    <slot name="label">
      <p
        v-if="label"
        class="holo-list-label"
      >
        {{ label }}
      </p>
    </slot>
    <div class="holo-list-shortcuts">
      <slot name="shortcuts" />
    </div>
  </div>
  <ul
    v-show="!collapsed"
    class="holo-list"
  >
    <slot />
  </ul>
</template>

<style scoped>
.holo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.holo-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.holo-list-label {
  font-weight: bold;
  margin: 0;
  margin-block-end: 0.25em;
  padding-block: 0.15em;
}

.holo-list-shortcuts {
  display: flex;
  flex-wrap: nowrap;
}
</style>

