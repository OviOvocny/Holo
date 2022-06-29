<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Holo UI Docs',
  // meta: [
  //   { name: 'description', content: 'Opinionated Vite Starter Template' },
  //   {
  //     name: 'theme-color',
  //     content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
  //   },
  // ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ]
})
</script>

<template>
  <Root uses-system-appearance>
    <AGrid
      class="main-grid"
      template="
      '  nav                  content' auto
       / minmax(auto, 350px)  1fr"
    >
      <Area area="nav">
        <Navigation />
      </Area>
      <Area area="content">
        <RouterView />
      </Area>
    </AGrid>
  </Root>
</template>

<style>
.holo-root[data-holo-theme="holographic-dark"] {
  --component: 21deg 85% 60%;
  --theme: 151deg 70% 60%;

  /* hdoc colors */
  --hdoc-prop: #81f5c1;
  --hdoc-prop-bg: #19744b;
  --hdoc-emit: #f2cf5b;
  --hdoc-emit-bg: #a88104;
  --hdoc-slot: #c4aaf6;
  --hdoc-slot-bg: #6843ac;
}

.holo-root[data-holo-theme="holographic-light"] {
  --component: 21deg 85% 60%;
  --theme: 151deg 70% 40%;

  /* hdoc colors */
  --hdoc-prop: #19744b;
  --hdoc-prop-bg: #81f5c1;
  --hdoc-emit: #a88104;
  --hdoc-emit-bg: #f2cf5b;
  --hdoc-slot: #6843ac;
  --hdoc-slot-bg: #c4aaf6;
}

.holo-variable-color-component {
  --variable-color: var(--component);
  --readable-color: var(--foreground);
}

.holo-variable-color-theme {
  --variable-color: var(--theme);
  --readable-color: var(--background);
}

.foreground-muted {
  color: hsl(var(--foreground) / 80%);
}

.main-grid {
  min-height: 100vh;
}

/* common hdoc styles */
.hdoc {
  margin-block: 0.75em 1em;
}

.hdoc-prefix {
  display: inline-flex;
  font-weight: normal;
  font-size: 0.9em;
  width: 1.25em;
  height: 1.25em;
  border-radius: 0.25em;
  align-items: center;
  justify-content: center;
  margin-inline-end: 0.5ch;
}
</style>