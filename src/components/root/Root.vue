<script lang="ts">
export default {
  name: 'HRoot'
}
</script>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Name of the light theme. */
    themeLight?: string
    /** Name of the dark theme. */
    themeDark?: string
    /** Sets whether dark theme is active. */
    darkAppearance?: boolean
    /**
     * Automatically switches theme
     * based on the OS. This overrides
     * the darkAppearance prop.
     */
    usesSystemAppearance?: boolean
    /** Globally disables hologram effects. */
    noHolograms?: boolean
  }>(),
  {
    themeLight: 'holographic-light',
    themeDark: 'holographic-dark'
  }
)

let systemDark = ref(false)
let mql = { matches: false } as MediaQueryList
if (typeof window !== 'undefined') {
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark = ref(mql.matches)
  mql.addEventListener('change', (e: MediaQueryListEvent) => {
    systemDark.value = e.matches
  })
}

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

const disableHolograms = computed(() => props.noHolograms)

provide('themeName', themeName)
provide('disableHolograms', disableHolograms)
</script>

<template>
  <div
    class="holo-root"
    :data-holo-theme="themeName"
  >
    <!--+ Main content slot -->
    <slot />
    <!-- Teleport targets -->
    <div class="holo-notification-root" />
  </div>
</template>

<style scoped>
.holo-root {
  position: relative;
  z-index: 0;
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
