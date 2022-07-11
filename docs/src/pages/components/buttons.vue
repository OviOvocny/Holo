<script setup lang="ts">
import docs from '@/components/button/Button?docs'
</script>

<template>
  <ComponentDoc
    name="Button"
    :docs="docs"
  >
    <template #description>
      Universal button component. Semantic equivalent of HTML buttons.
      Supports theming, hologram effects, multiple variations.
    </template>
  </ComponentDoc>
</template>

<route lang="yaml">
name: Button
meta:
  section: component
</route>
