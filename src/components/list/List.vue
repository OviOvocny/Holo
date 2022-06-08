<script lang="ts">
export default {
  name: 'HList'
}
</script>

<script setup lang="ts">
import StaggeredListTransition from '@/framework/StaggeredListTransition.vue'

withDefaults(
  defineProps<{
    label?: string
    stagger?: number
  }>(),
  {
    label: undefined,
    stagger: 50
  }
)
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
  <ul class="holo-list">
    <StaggeredListTransition :stagger="stagger">
      <slot />
    </StaggeredListTransition>
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

