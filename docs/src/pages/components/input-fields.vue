<script setup lang="ts">
import docs from '@/components/inputs/inputField/InputField?docs'
import { ref } from 'vue'

const inputValue = ref('This is an input')
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
      <InputField
        v-bind="config"
        v-model="inputValue"
      />
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: InputField
meta:
  section: component
</route>
