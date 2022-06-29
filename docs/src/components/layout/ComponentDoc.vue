<script setup lang="ts">
import { ComponentDocumentation } from '@docs/types/ComponentDocumentation'
import { useHead } from '@vueuse/head'

const props = defineProps<{
  name: string
  docs: ComponentDocumentation
}>()

useHead({
  title: `${props.name} Component – Holo UI Docs`
})
</script>

<template>
  <div class="component-docs">
    <HeadPanel 
      type="component"
      :name="name"
    >
      <template #title>
        <slot name="titleOverride" />
      </template>
      <slot name="description" />
    </HeadPanel>
    <main>
      <div class="api-docs">
        <h2>API</h2>
        <h3
          v-show="docs.props"
          class="api-doc-section api-doc-props"
        >
          Properties
        </h3>
        <PropDoc
          v-for="prop in docs.props"
          :key="prop.name"
          :data="prop"
        />
        <h3
          v-show="docs.emits"
          class="api-doc-section api-doc-events"
        >
          Events
        </h3>
        <EmitDoc
          v-for="emit in docs.emits"
          :key="emit.name"
          :data="emit"
        />
        <h3
          v-show="docs.slots"
          class="api-doc-section api-doc-slots"
        >
          Slots
        </h3>
        <SlotDoc
          v-for="slot in docs.slots"
          :key="slot.name"
          :data="slot"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 1em 1.5em;
}

.api-doc-section {
  margin-block-end: 0;
}

.api-doc-props {
  color: var(--hdoc-prop);
}

.api-doc-events {
  color: var(--hdoc-emit);
}

.api-doc-slots {
  color: var(--hdoc-slot);
}
</style>