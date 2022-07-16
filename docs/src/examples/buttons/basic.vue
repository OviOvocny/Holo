<script setup lang="ts">
import { ref } from 'vue'

const text = ref('LOL')
</script>

<template>
  <Button>
    {{ text }}
  </Button>
</template>

<style>
.blah {
  border: none;
}
</style>