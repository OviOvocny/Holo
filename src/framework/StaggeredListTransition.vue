<script lang="ts">
export default {
  name: 'StaggeredListTransition'
}
</script>

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, onMounted, VNode } from 'vue'
import useDeepestSlot from '@/hooks/useDeepestSlot'

const props = withDefaults(
  defineProps<{
    stagger?: number
  }>(),
  {
    stagger: 50
  }
)

function addKeys(vnodes: VNode[]) {
  const self = getCurrentInstance()
  if (self) {
    const key = String(self.vnode.key ?? self.uid)
    vnodes.forEach((item, index) => {
      item.key = item.key ?? `stagger-list-${key}-item-${index}`
    })
  }
}

function setupStagger(vnodes: VNode[]) {
  vnodes.forEach((item, index) => {
    item.el?.style.setProperty(
      '--stagger-transition-delay',
      `${index * props.stagger + props.stagger * Math.random()}ms`
    )
  })
}

const getSlot = useDeepestSlot()

function setDelays() {
  const slot = getSlot()
  if (slot) {
    setupStagger(slot)
  }
}

function setKeys() {
  const slot = getSlot()
  if (slot) {
    addKeys(slot)
  }
}

onBeforeMount(setKeys)
onMounted(setDelays)
</script>

<template>
  <transition-group
    name="tg-list"
    appear
  >
    <slot />
  </transition-group>
</template>

<style>
.tg-list-enter-active,
.tg-list-leave-active {
  transition: all 0.15s var(--stagger-transition-delay) var(--ease-blink);
}

.tg-list-enter-from,
.tg-list-leave-to {
  opacity: 0;
}
</style>
