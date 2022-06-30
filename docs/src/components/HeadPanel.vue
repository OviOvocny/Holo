<script setup lang="ts">
import { HoloWrapper, HoloRainEffect } from '@/framework'
import { kebab } from '@docs/common/utils'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    name: string
    type?: string | undefined
    color?: string | undefined
    icon?: string | undefined
  }>(),
  {
    type: undefined,
    color: undefined,
    icon: undefined
  }
)

const route = useRoute()
// set dtype to current route meta section if type prop is undefined
const dtype = computed(() => props.type ?? route.meta?.section ?? 'fallback')
const dcolor = computed(() => props.color ?? dtype.value)
const typeC = computed(() => dtype.value === 'component')

const kebabName = computed(() => kebab(props.name))
</script>

<template>
  <HoloWrapper
    block
    :options="{
      rows: 1,
      duration: {
        rise: 1.7,
        fall: 2
      },
      color: {
        peakAlpha: 0.25
      }
    }"
    :color="dcolor"
  >
    <template #effects="{ renderer }">
      <client-only>
        <HoloRainEffect
          :renderer="renderer"
          :options="{ propagate: false, interval: 1 }"
        />
      </client-only>
    </template>
    <!-- Docs Header -->
    <header
      class="hdoc-head-panel"
      :class="[`holo-variable-color-${dcolor}`]"
    >
      <Icon
        :name="icon ?? `${dtype}-${kebabName}`"
        :color="dcolor"
        class="hdoc-head-icon"
      />
      <h1 class="hdoc-head-title mono-font">
        <slot name="title">
          <span v-show="typeC">&lt;H</span>{{ name }}<span v-show="typeC">&gt;</span>
        </slot>
      </h1>
      <p class="hdoc-head-description">
        <slot />
      </p>
    </header>
  </HoloWrapper>
</template>

<style>
.hdoc-head-panel {
  width: 100%;
  padding: 1em 1.5em;
  background-color: hsl(var(--variable-color) / 30%);
}

.hdoc-head-icon {
  height: 4em;
}

h1.hdoc-head-title {
  text-transform: none;
  margin-block: 0 0.25em;
}

.hdoc-head-title span {
  color: hsl(var(--variable-color) / 90%);
}

.hdoc-head-description {
  max-width: 40em;
  margin-block-end: 0;
}
</style>