<script setup lang="ts">
import docs from '@/components/inputs/checkbox/Checkbox?docs'
import { ref } from 'vue'

const checkboxValue = ref(false)
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
      <Checkbox
        v-bind="config"
        v-model="checkboxValue"
      >
        This is {{ checkboxValue }}
      </Checkbox>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Checkbox
meta:
  section: component
</route>
