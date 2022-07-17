<script setup lang="ts">
import { ComponentProp } from '@docs/types/ComponentDocumentation'
import { computed, reactive } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  name: string
  properties: ComponentProp[]
  selfClosing: boolean
}>()

type Config = Record<string, string | number | boolean | object>

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

function isDefined(value: string) {
  return value !== 'undefined'
}

function sanitize(value: string) {
  // strip single quotes and trim
  return value.replace(/'/g, '').trim()
}

const excludedProps = ['modelValue', 'name']
const configurableProps = props.properties.filter(
  (prop) => !excludedProps.includes(prop.name)
)

const defaultProps: Config = configurableProps.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]:
      cur.default && isDefined(cur.default)
        ? sanitize(cur.default)
        : fallback(cur.type)
  }),
  {}
)

const config = reactive<Config>({
  ...defaultProps
})

const outputTag = computed(() => {
  const { name, properties } = props
  const configProps = Object.entries(config)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => {
      const prop = properties.find((prop) => prop.name === name)
      if (!prop) {
        return null
      }
      const { type } = prop
      const defaultValue = defaultProps[name] as string
      if (defaultValue === value) {
        return null
      }
      switch (type) {
        case 'boolean':
          if (defaultValue === 'true') {
            return value ? null : `:${name}=${value}`
          } else {
            return value ? name : null
          }
        case 'number':
          return `:${name}="${value}"`
        case 'string':
          return `${name}="${value}"`
        case 'object':
        case 'array':
          return `:${name}="${JSON.stringify(value)}"`
        default:
          return null
      }
    })
    .join(' ')
    .trim()
  const openingTag = `${name} ${configProps}`.trim()
  if (props.selfClosing) {
    return `<${openingTag} />`
  } else {
    return `<${openingTag}></${name}>`
  }
})

const { copy, isSupported: clipboardSupported } = useClipboard({
  source: outputTag
})
</script>

<template>
  <AGrid
    class="config-container"
    template="
    '  display                   controls' auto
    '  output                    output  ' max-content
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
          v-for="prop in configurableProps"
          :key="prop.name"
        >
          <Checkbox
            v-if="prop.type === 'boolean'"
            v-model="config[prop.name]"
          >
            {{ prop.name }}
          </Checkbox>
          <InputField
            v-if="prop.type.includes('string') || prop.type.includes('number')"
            v-model="config[prop.name]"
            class="config-input"
            :type="prop.type.includes('number') ? 'number' : 'text'"
            :label="prop.name"
          />
        </ListItem>
      </List>
    </Area>
    <Area area="output">
      <div class="config-output-tag">
        <code class="mono-font">{{ outputTag }}</code>
        <Button
          v-show="clipboardSupported"
          color="accent"
          hollow
          borderless
          symmetrical
          @click="copy()"
        >
          <Icon name="ui-clipboard" />
        </Button>
      </div>
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

.config-output-tag {
  background-color: hsl(var(--background));
  padding-block: 0.25em;
  padding-inline-start: 1em;
  margin-block-start: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>