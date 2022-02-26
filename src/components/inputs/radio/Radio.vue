<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'HRadio'
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number
    value: string | number
    name?: string
    color?: string
    loading?: boolean
  }>(),
  {
    name: undefined,
    color: 'foreground'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: string | number): void
}>()

function updateInput() {
  emit('update:modelValue', props.value)
}

const checked = computed(() => props.modelValue === props.value)
</script>

<template>
  <label
    :for="name"
    class="holo-radio"
    :class="[
      `holo-variable-color-${color}`,
      { 'holo-loading': loading }
    ]"
  >
    <input
      type="radio"
      class="holo-radio-element"
      :checked="checked"
      :value="modelValue"
      v-bind="$attrs"
      @change="updateInput"
    >
    <span class="holo-radio-visual">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          class="hrb-ring"
          clip-path="circle()"
        >
          <path
            class="hrb-rs1"
            d="M93 25A50 50 0 0 0 50 0"
          />
          <path
            class="hrb-rs2"
            d="M93 75A50 50 0 0 0 93 25"
          />
          <path
            class="hrb-rs3"
            d="M50 100A50 50 0 0 0 93 75"
          />
          <path
            class="hrb-rs4"
            d="M7 75A50 50 0 0 0 50 100"
          />
          <path
            class="hrb-rs5"
            d="M7 25A50 50 0 0 0 7 75"
          />
          <path
            class="hrb-rs6"
            d="M50 0A50 50 0 0 0 7 25"
          />
        </g>
        <circle
          class="hrb-tick"
          cx="50"
          cy="50"
          r="20"
        />
      </svg>
    </span>
    <span class="holo-radio-label">
      <slot />
    </span>
  </label>
</template>

<style>
.holo-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.holo-radio-element {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.holo-radio-visual {
  height: 1em;
  display: inline-block;
}

.holo-radio-visual svg {
  stroke: hsl(var(--variable-color));
  height: 100%;
}

.hrb-ring {
  stroke-width: 30;
  transform-origin: center;
  transition: stroke-width 0.2s;
}

.hrb-ring * {
  stroke-dasharray: 100% 100%;
  transition: stroke-dashoffset 0.2s;
}

.holo-radio-label {
  padding-left: 0.75ch;
}

.holo-radio:hover .hrb-ring {
  stroke-width: 15;
}

.holo-radio.holo-loading .hrb-ring * {
  animation-name: fading;
  animation-duration: 1200ms;
  animation-iteration-count: infinite;
  animation-timing-function: var(--ease-blink);
}

.hrb-rs1 { animation-delay: 0ms; }
.hrb-rs2 { animation-delay: 100ms; }
.hrb-rs3 { animation-delay: 200ms; }
.hrb-rs4 { animation-delay: 300ms; }
.hrb-rs5 { animation-delay: 400ms; }
.hrb-rs6 { animation-delay: 500ms; }

@keyframes fading {
  100% {
    opacity: 0;
  }
}

.hrb-tick {
  fill: hsl(var(--variable-color));
  transition: transform 0.7s var(--ease-out-expo), opacity 0.2s;
  transform-origin: center;
  transform: scale(0);
  opacity: 0;
}

.holo-radio-element:checked + .holo-radio-visual .hrb-tick {
  opacity: 1;
  transform: scale(1);
}

.holo-radio-element:focus + .holo-radio-visual .hrb-ring {
  stroke: hsl(var(--foreground));
  animation: spin 3s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.holo-radio:hover .hrb-ring *:nth-child(even),
.holo-radio:not(.holo-loading) .holo-radio-element:focus + .holo-radio-visual .hrb-ring *:nth-child(even) {
  stroke-dashoffset: 100%;
}

</style>
