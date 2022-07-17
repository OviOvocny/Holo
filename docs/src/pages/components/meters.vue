<script setup lang="ts">
import docs from '@/components/meter/Meter?docs'
</script>

<template>
  <ComponentDoc
    :name="String($route.name)"
    :docs="docs"
    self-closing
  >
    <template #description>
      ...
    </template>
    <template #configDisplay="{ config }">
      <Meter
        v-bind="config"
      />
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Meter
meta:
  section: component
</route>
