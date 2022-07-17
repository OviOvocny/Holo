<script setup lang="ts">
import docs from '@/components/inputs/slider/Slider?docs'
import { ref } from 'vue'

const sliderValue = ref(50)
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
      <client-only>
        <Slider
          v-bind="config"
          v-model="sliderValue"
        />
      </client-only>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Slider
meta:
  section: component
</route>
