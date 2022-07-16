<script setup lang="ts">
import { ComponentCode } from '@docs/types/ComponentCode'

const props = defineProps<{
  set: string
  name: string
}>()

const { default: TheExample } = await import(
  `../examples/${props.set}/${props.name}.vue`
)

const codeModule = await import(`../examples/${props.set}/${props.name}.code`)
const code: ComponentCode = codeModule.default
</script>

<template>
  <div>
    <TheExample />
    <pre>
      <code>
        {{ code.script }}
      </code>
    </pre>
    <pre>
<code>
{{ code.template }}
</code>
    </pre>
    <pre>
      <code>
        {{ code.style }}
      </code>
    </pre>
  </div>
</template>