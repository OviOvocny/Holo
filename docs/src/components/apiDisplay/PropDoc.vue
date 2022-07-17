<script setup lang="ts">
import { ComponentProp } from '@docs/types/ComponentDocumentation'
import { interpolateContent } from '@docs/common/utils'
import { computed } from 'vue'

const props = defineProps<{
  data: ComponentProp
}>()

const prefix = computed(() => {
  const { name } = props.data
  if (name === 'modelValue') {
    return 'M'
  }
  return ':'
})

const name = computed(() => {
  const { name } = props.data
  if (name === 'modelValue') {
    return 'v-model'
  }
  return name
})

const types = computed(() => {
  return props.data.type.split(' | ')
})

const sanitizedDefault = computed(() => {
  const { default: defaultValue } = props.data
  // do not show undefined defaults
  if (defaultValue === 'undefined') {
    return undefined
  }
  // do not show functions used to define default objects
  const fn = defaultValue?.match(/\(.*?\) => \((.*)\)/)
  if (fn) {
    return fn[1]
  }
  return defaultValue
})
</script>

<template>
  <div class="hdoc hdoc-prop">
    <div class="hdoc-prop-data mono-font">
      <span class="name">
        <span class="hdoc-prefix">{{ prefix }}</span>{{ name }}<span class="foreground-muted">:</span>
      </span>
      <span class="types">
        <template
          v-for="(type, i) in types"
          :key="type"
        >
          <span
            class="type"
            :data-prop-type="type"
          >{{ type }}</span>
          <span v-if="i + 1 < types.length">&thinsp;|&thinsp;</span>
        </template>
      </span>
      <span
        v-if="!data.optional"
        class="required"
      >required</span>
      <span
        v-if="sanitizedDefault"
        class="default"
      ><span class="foreground-muted">&thinsp;=&nbsp;</span>{{ sanitizedDefault }}</span>
    </div>
    <div class="hdoc-prop-description">
      <DynamicLinker :content="interpolateContent(data.description)" />
    </div>
  </div>
</template>

<style>
/* type colors */

[data-prop-type*="string"] {
  color: #5fc5ff;
}

[data-prop-type*="number"] {
  color: #5edea0;
}

[data-prop-type*="boolean"] {
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

.hdoc-prop-data .types {
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