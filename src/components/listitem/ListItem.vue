<script lang="ts">
export default {
  name: 'HListItem'
}
</script>

<script setup lang="ts">
import { computed, inject, onMounted, onUpdated, ref, useAttrs } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: string
    disabled?: boolean
    href?: string | object
    to?: string | object
  }>(),
  {
    color: 'foreground',
    href: undefined,
    to: undefined
  }
)

const isInteractive = computed(() => {
  const attrs = useAttrs()
  const clickable = Object.keys(attrs).includes('onClick')
  const linking = props.href || props.to
  return clickable || linking
})

const elementType = computed(() => {
  if (props.href) {
    return 'a'
  } else if (props.to) {
    return 'router-link'
  } else {
    return 'div'
  }
})

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
    :class="[`holo-variable-color-${color}`]"
  >
    <component
      :is="elementType"
      :to="to"
      :href="href"
      class="holo-list-item-main"
      :class="{ 'holo-list-item-interactive': isInteractive }"
    >
      <div
        v-if="$slots.symbol"
        class="holo-list-item-symbol"
      >
        <slot name="symbol" />
      </div>
      <div class="holo-list-item-content">
        <slot />
      </div>
    </component>
    <div class="holo-list-item-decoration">
      <slot name="decoration" />
    </div>
  </li>
</template>

<style>
.holo-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: 0.15em;

  /* reveal animation */
  opacity: 0;
  animation: reveal 0.15s var(--stagger-transition-delay) var(--ease-blink);
  animation-fill-mode: forwards;
}

.holo-list-item-main {
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  padding: 0.15em 0.5em;
  color: hsl(var(--foreground));
  text-decoration: none;
  transition: background-color 0.1s;
}

.holo-list-item-interactive { cursor: pointer; }
.holo-list-item-interactive:disabled { cursor: not-allowed; }

.holo-list-item-interactive:hover {
  background-color: hsl(var(--variable-color) / 40%);
}

.holo-list-item-symbol {
  margin-inline-end: 0.25em;
}

@keyframes reveal {
  to {
    opacity: 1;
  }
}

/* Nest indent */
.holo-list-item-content .holo-list,
.holo-list-item-content .holo-list-item-header {
  margin-inline-start: 1em;
}
</style>
