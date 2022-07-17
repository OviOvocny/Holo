<script setup lang="ts">
import docs from '@/components/inputs/textArea/TextArea?docs'
import { ref } from 'vue'

const inputValue = ref('This is a text area\nwith multiple lines')
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
      <TextArea
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
name: TextArea
meta:
  section: component
</route>
