<script setup lang="ts">
import { ComponentSlot } from '@docs/types/ComponentDocumentation'

defineProps<{
  data: ComponentSlot
}>()
</script>

<template>
  <div class="hdoc hdoc-slot">
    <div class="hdoc-slot-data mono-font">
      <span class="name">
        <span class="hdoc-prefix">#</span>{{ data.name }}
      </span>
    </div>
    <div class="hdoc-slot-description">
      {{ data.description }}
    </div>
  </div>
</template>

<style>
.hdoc-slot-data {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.hdoc-slot .hdoc-prefix {
  background-color: var(--hdoc-slot-bg);
}

.hdoc-slot-data .name {
  font-weight: bold;
}

.hdoc-slot-data .payload-type {
  color: #ffe760;
}
</style>