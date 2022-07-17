<script setup lang="ts">
import docs from '@/components/inputs/rangeSlider/RangeSlider?docs'
import { ref } from 'vue'

const rangeValue = ref([25, 75])
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
      <RangeSlider
        v-bind="config"
        v-model="rangeValue"
      />
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: RangeSlider
meta:
  section: component
</route>
