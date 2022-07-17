<script setup lang="ts">
import docs from '@/components/inputs/radio/Radio?docs'
import groupDocs from '@/components/inputs/radioGroup/RadioGroup?docs'
import { ref } from 'vue'

const radioValue = ref('not selected')
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
      <Radio
        v-bind="config"
        v-model="radioValue"
        value="a radio button"
      >
        This is {{ radioValue }}
      </Radio>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
    <template #after>
      <h2>Group Shorthand</h2>
      <PropDoc
        v-for="prop in groupDocs.props"
        :key="prop.name"
        :data="prop"
      />
    </template>
  </ComponentDoc>
</template>

<route lang="yaml">
name: Radio
meta:
  section: component
</route>
