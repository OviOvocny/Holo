<script setup lang="ts">
</script>

<template>
  <HeadPanel 
    :type="$route.meta.section"
    name="Installing Holo"
    icon="start-installation"
  >
    I'll tell you later
  </HeadPanel>
</template>

<route lang="yaml">
name: Installation
meta:
  section: start
  order: -1
</route>
