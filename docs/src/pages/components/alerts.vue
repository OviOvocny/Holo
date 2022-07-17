<script setup lang="ts">
import docs from '@/components/alert/Alert?docs'
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
      <Alert v-bind="config">
        This is an alert.
      </Alert>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Alert
meta:
  section: component
</route>
