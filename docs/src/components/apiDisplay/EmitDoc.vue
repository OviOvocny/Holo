<script setup lang="ts">
import { ComponentEvent } from '@docs/types/ComponentDocumentation'
import { interpolateContent } from '@docs/common/utils'

defineProps<{
  data: ComponentEvent
}>()
</script>

<template>
  <div class="hdoc hdoc-emit">
    <div class="hdoc-emit-data mono-font">
      <span class="name">
        <span class="hdoc-prefix">@</span>{{ data.name }}
      </span>
      <span class="payload foreground-muted">&nbsp;(e:&thinsp;<span class="payload-type">{{ data.payload }}</span>)</span>
    </div>
    <div class="hdoc-emit-description">
      <DynamicLinker :content="interpolateContent(data.description)" />
    </div>
  </div>
</template>

<style>
.hdoc-emit .hdoc-prefix {
  background-color: var(--hdoc-emit-bg);
}

.hdoc-emit-data {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.hdoc-emit-data .name {
  font-weight: bold;
}

[data-holo-theme="holographic-dark"] .hdoc-emit-data .payload-type {
  color: #ffe760;
}

[data-holo-theme="holographic-light"] .hdoc-emit-data .payload-type {
  color: #c9af17;
}
</style>