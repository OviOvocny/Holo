<script lang="ts">
export default {
  name: 'HListItem'
}
</script>

<script setup lang="ts">
import { inject, onMounted, onUpdated, ref } from 'vue'

withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {}
)

const stagger = inject<number>('stagger') ?? 0

function addIndex() {
  const el = self.value
  if (el) {
    const index =
      Array.prototype.indexOf.call(el.parentNode?.childNodes, el) - 1
    el.dataset['index'] = String(index)
    el.style.setProperty(
      '--stagger-transition-delay',
      `${index * stagger - stagger * Math.random()}ms`
    )
    return index
  }
}

const self = ref<HTMLElement | null>(null)
onMounted(addIndex)
onUpdated(addIndex)
</script>

<template>
  <li
    ref="self"
    class="holo-list-item"
  >
    <div class="holo-list-main">
      <div
        v-if="$slots.symbol"
        class="holo-list-symbol"
      >
        <slot name="symbol" />
      </div>
      <div class="holo-list-content">
        <slot />
      </div>
    </div>
    <div class="holo-list-decoration">
      <slot name="decoration" />
    </div>
  </li>
</template>

<style>
.holo-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 0.15em;

  /* reveal animation */
  opacity: 0;
  animation: reveal 0.15s var(--stagger-transition-delay) var(--ease-blink);
  animation-fill-mode: forwards;
}

.holo-list-main {
  display: flex;
  align-items: flex-start;
}

.holo-list-symbol {
  margin-inline-end: 0.25em;
}

@keyframes reveal {
  to {
    opacity: 1;
  }
}

/* Nest indent */
.holo-list-content .holo-list,
.holo-list-content .holo-list-header {
  margin-inline-start: 1em;
}
</style>
