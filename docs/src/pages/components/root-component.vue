<script setup lang="ts">
import docs from '@/components/root/Root?docs'
</script>

<template>
  <ComponentDoc
    :name="String($route.name)"
    :docs="docs"
  >
    <template #description>
      ...
    </template>
    <template #configDisplay="{ config }">
      <Root v-bind="config">
        <Alert style="margin: 1em;">
          This alert is inside a root.
        </Alert>
      </Root>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Root
meta:
  section: component
</route>
