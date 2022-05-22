<script lang="ts">
import { ref, watch } from 'vue'
import { useInterval } from '@vueuse/core'

export default {
  name: 'HCheckbox'
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    name?: string
    disabled?: boolean
    color?: string
    loading?: boolean
  }>(),
  {
    modelValue: undefined,
    name: undefined,
    color: 'foreground'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: boolean): void
}>()

function updateInput(e: Event) {
  const target = e.currentTarget as HTMLInputElement
  const val = target.checked
  emit('update:modelValue', val)
}

const offsetMin = 0
const offsetMax = 20
const cornerOffset = ref(-1)
const focused = ref(false)

function enterVisual() {
  if (focused.value || props.disabled) return
  cornerOffset.value = offsetMax
}
function leaveVisual() {
  if (focused.value) return
  cornerOffset.value = offsetMin
}

const {
  counter: pulse,
  pause,
  resume
} = useInterval(500, { controls: true, immediate: false })

function focus() {
  focused.value = true
  cornerOffset.value = offsetMax
  resume()
}

function blur() {
  focused.value = false
  pause()
  cornerOffset.value = offsetMin
}

watch(
  () => pulse.value,
  (val) => {
    cornerOffset.value = val % 2 == 0 ? offsetMax : offsetMax / 2
  }
)
</script>

<template>
  <label
    :for="name"
    class="holo-checkbox"
    :class="[
      `holo-variable-color-${color}`,
      { 'holo-loading': loading }
    ]"
    @mouseenter="enterVisual"
    @mouseleave="leaveVisual"
  >
    <input
      type="checkbox"
      class="holo-checkbox-element"
      :value="modelValue"
      :disabled="disabled"
      :checked="modelValue"
      v-bind="$attrs"
      @change="updateInput"
      @focus="focus"
      @blur="blur"
    >
    <span class="holo-checkbox-visual">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      ><g :stroke-width="30 - cornerOffset / 2">
        <path
          class="hck-corner hck-tl"
          :d="`M0 ${50 - cornerOffset}V0h${50 - cornerOffset}`"
        />
        <path
          class="hck-corner hck-bl"
          :d="`M0 ${50 + cornerOffset}v${50 - cornerOffset}h${50 - cornerOffset}`"
        />
        <path
          class="hck-corner hck-tr"
          :d="`M100 ${50 - cornerOffset}V0H${50 + cornerOffset}`"
        />
        <path
          class="hck-corner hck-br"
          :d="`M100 ${50 + cornerOffset}v${50 - cornerOffset}H${50 + cornerOffset}`"
        />
        <path
          class="hck-tick"
          d="M100 10 50 60 0 10"
          stroke-width="15"
          stroke-dasharray="85 140"
          stroke-linecap="square"
        />
      </g>
      </svg>
    </span>
    <span class="holo-checkbox-label">
      <slot />
    </span>
  </label>
</template>

<style>
.holo-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-inline-end: 0.875em;
}

.holo-checkbox-element {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.holo-checkbox-visual {
  height: 1em;
  display: inline-block;
}

.holo-checkbox-visual svg {
  stroke: hsl(var(--variable-color));
  height: 100%;
}

.hck-corner {
  transition: d 0.5s var(--ease-out-expo);
}

.holo-checkbox-label {
  padding-left: 0.75ch;
}

.holo-checkbox.holo-loading .hck-corner {
  animation-name: fading;
  animation-duration: 1200ms;
  animation-iteration-count: infinite;
  animation-timing-function: var(--ease-blink);
}

.hck-tl { animation-delay: 0ms; }
.hck-tr { animation-delay: 100ms; }
.hck-br { animation-delay: 200ms; }
.hck-bl { animation-delay: 300ms; }

@keyframes fading {
  100% {
    opacity: 0;
  }
}

.hck-tick {
  transition: stroke-dashoffset 0.7s var(--ease-out-expo), opacity 0.1s;
  stroke-dashoffset: -140;
  opacity: 0;
}

.holo-checkbox-element:disabled + .holo-checkbox-visual {
  cursor: not-allowed;
}

.holo-checkbox-element:checked + .holo-checkbox-visual .hck-tick {
  stroke-dashoffset: -5;
  opacity: 1;
}

.holo-checkbox-element:focus + .holo-checkbox-visual .hck-corner {
  stroke: hsl(var(--foreground));
}

.holo-checkbox-element:disabled + .holo-checkbox-visual .hck-tl { opacity: 0.5; }
.holo-checkbox-element:disabled + .holo-checkbox-visual .hck-tr { opacity: 0.4; }
.holo-checkbox-element:disabled + .holo-checkbox-visual .hck-bl { opacity: 0.3; }
.holo-checkbox-element:disabled + .holo-checkbox-visual .hck-br { opacity: 0.2; }

</style>
