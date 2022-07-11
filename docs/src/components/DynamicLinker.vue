<script setup lang="ts">
import { splitBracketLinks } from '@docs/common/utils'

defineProps<{
  content: string
}>()
</script>

<template>
  <component
    :is="part.type"
    v-for="(part, index) in splitBracketLinks(content)"
    :key="index"
    :to="part.path"
  >
    {{ part.text }}
  </component>
</template>