<script setup lang="ts">
import { ComponentProp } from '@docs/types/ComponentDocumentation'

defineProps<{
  data: ComponentProp
}>()
</script>

<template>
  <div class="hdoc hdoc-prop">
    <div class="hdoc-prop-data mono-font">
      <span class="name">
        <span class="hdoc-prefix">:</span>{{ data.name }}<span class="foreground-muted">:</span>
      </span>
      <span
        class="type"
        :data-prop-type="data.type"
      >{{ data.type }}</span>
      <span
        v-if="!data.optional"
        class="required"
      >required</span>
      <span
        v-if="data.default"
        class="default"
      ><span class="foreground-muted">&thinsp;=&thinsp;</span>{{ data.default }}</span>
    </div>
    <div class="hdoc-prop-description">
      {{ data.description }}
    </div>
  </div>
</template>

<style>
/* type colors */

[data-prop-type^="string"] {
  color: #5fc5ff;
}

[data-prop-type^="number"] {
  color: #5edea0;
}

[data-prop-type^="boolean"] {
  color: #ff5f98;
}

/* styles */

.hdoc-prop .hdoc-prefix {
  background-color: var(--hdoc-prop-bg);
}

.hdoc-prop-data {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.hdoc-prop-data .name {
  font-weight: bold;
  margin-inline-end: 0.5ch;
}

.hdoc-prop-data .type {
  font-weight: light;
  margin-inline-end: 0.4ch;
}

.hdoc-prop-data .required {
  background-color: hsl(var(--component) / 70%);
  font-size: 0.85em;
  padding: 0.2em 0.5em;
  border-radius: 1em;
  margin-inline-start: 1ch;
}
</style>