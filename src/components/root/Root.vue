<script lang="ts">
export default {
  name: 'HRoot'
}
</script>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    themeLight?: string
    themeDark?: string
    darkAppearance?: boolean
    usesSystemAppearance?: boolean
  }>(),
  {
    themeLight: 'holographic-light',
    themeDark: 'holographic-dark'
  }
)

const mql = window.matchMedia('(prefers-color-scheme: dark)')
const systemDark = ref(mql.matches)
mql.addEventListener('change', (e: MediaQueryListEvent) => {
  systemDark.value = e.matches
})

watch(
  () => props.usesSystemAppearance,
  () => {
    systemDark.value = mql.matches
  }
)

const themeName = computed(() => {
  const dark = props.usesSystemAppearance
    ? systemDark.value
    : props.darkAppearance
  return dark ? props.themeDark : props.themeLight
})

provide('themeName', themeName)
</script>

<template>
  <div
    class="holo-root"
    :data-holo-theme="themeName"
  >
    <!-- Main content slot -->
    <slot />
    <!-- Teleport targets -->
    <div class="holo-notification-root" />
  </div>
</template>

<style scoped>
.holo-root {
  position: relative;
  overflow: auto;
  z-index: 0;
  min-height: 100vh;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  transition: background-color 0.7s var(--ease-out-expo);
}

.holo-notification-root {
  position: fixed;
  bottom: 0;
  inset-inline-end: 0;
  display: flex;
  flex-direction: column-reverse;
  padding: 1em;
}
</style>
