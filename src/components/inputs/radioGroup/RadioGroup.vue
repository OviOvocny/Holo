<script lang="ts">
import { watch, ref } from 'vue'

export default {
  name: 'HRadioGroup'
}
</script>

<script setup lang="ts">
import HRadio from '../radio'
import { RadioGroupOptions } from './types'

withDefaults(
  defineProps<{
    modelValue: string | number
    name?: string
    disabled?: boolean
    color?: string
    loading?: boolean
    /**
     * A collection of selectable options for the button group.
     * Each option is an object entry in the form of value: label.
     */
    options?: RadioGroupOptions
  }>(),
  {
    name: undefined,
    color: 'foreground',
    options: () => ({})
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: string | number): void
}>()

function updateInput(val: string | number) {
  emit('update:modelValue', val)
}

const selectedValue = ref<string | number>('')
watch(selectedValue, updateInput)
</script>

<template>
  <HRadio
    v-for="(label, value) in options"
    :key="value"
    v-model="selectedValue"
    :value="value"
    :loading="loading && value === selectedValue"
    :color="color"
    :disabled="disabled"
  >
    {{ label }}
  </HRadio>
</template>
