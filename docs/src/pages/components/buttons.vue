<script setup lang="ts">
import docs from '@/components/button/Button?docs'
</script>

<template>
  <ComponentDoc
    :name="String($route.name)"
    :docs="docs"
  >
    <template #description>
      Universal button component. Semantic equivalent of HTML buttons.
      Supports theming, hologram effects, multiple variations.
    </template>
    <template #configDisplay="{ config }">
      <Button v-bind="config">
        This is a button
      </Button>
    </template>
    <!-- <template #examples>
      <ExamplePanel
        set="buttons"
        name="basic"
        title="Basic"
      />
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Button
meta:
  section: component
</route>
