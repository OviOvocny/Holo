<script setup lang="ts">
import { ComponentProp } from '@docs/types/ComponentDocumentation'
import { reactive } from 'vue'

const props = defineProps<{
  properties: ComponentProp[]
}>()

interface Config {
  [name: string]: any
}

function fallback(propType: string) {
  switch (propType) {
    case 'boolean':
      return false
    case 'number':
      return 0
    case 'string':
      return ''
    case 'object':
      return {}
    case 'array':
      return []
    default:
      return null
  }
}

function sanitize(value: string) {
  // strip single quotes and trim
  return value.replace(/'/g, '').trim()
}

const defaultProps: Config = props.properties.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: cur.default ? sanitize(cur.default) : fallback(cur.type)
  }),
  {}
)

const config = reactive<Config>({
  ...defaultProps
})
</script>

<template>
  <AGrid
    class="config-container"
    template="
    '  display controls' auto
      / minmax(max-content, 1fr) auto"
  >
    <Area area="display">
      <div class="config-display">
        <slot :config="config" />
      </div>
    </Area>
    <Area area="controls">
      <List>
        <ListItem
          v-for="prop in properties"
          :key="prop.name"
        >
          <Checkbox
            v-if="prop.type === 'boolean'"
            v-model="config[prop.name]"
          >
            {{ prop.name }}
          </Checkbox>
          <InputField
            v-if="prop.type === 'string' || prop.type === 'number'"
            v-model="config[prop.name]"
            class="config-input"
            :type="prop.type === 'number' ? 'number' : 'text'"
            :label="prop.name"
          />
        </ListItem>
      </List>
    </Area>
  </AGrid>
</template>

<style>
.config-container {
  background: hsl(var(--foreground) / 10%);
  padding: 1em;
}

.config-display {
  --stripe-size: 0.25em;

  height: 100%;
  margin-inline-end: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image:
    repeating-linear-gradient(
      45deg,
      hsl(var(--background) / 50%),
      hsl(var(--background) / 50%) var(--stripe-size),
      transparent var(--stripe-size),
      transparent calc(var(--stripe-size) * 2)
    );
}

.config-input {
  margin: 0;
}
</style>