<script setup lang="ts">
import docs from '@/components/badge/Badge?docs'
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
      <Badge v-bind="config">
        42
      </Badge>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Badge
meta:
  section: component
</route>
