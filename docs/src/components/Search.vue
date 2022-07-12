<script setup lang="ts">
import routes from '~pages'
import { RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'

const isMac = /\(\s*Macintosh\s*;/.test(navigator.userAgent)
const mod = isMac ? '⌘' : 'Ctrl+'
</script>

<template>
  <Button
    disabled
    class="nav-search-button"
    hollow
    color="component"
  >
    Search&nbsp;
    <Badge
      class="nav-search-shortcut"
      color="inherit"
    >
      {{ mod }}K
    </Badge>
  </Button>
</template>

<style>
.nav-search-button {
  white-space: nowrap;
}

.nav-search-shortcut {
  padding-block: 0;
  font-size: 0.8em;
  vertical-align: 7.5%;
}
</style>