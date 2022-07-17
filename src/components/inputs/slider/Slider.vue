<script lang="ts">
import { computed } from 'vue'

export default {
  name: 'HSlider'
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** [[v-model]] */
    modelValue: number
    /** Lower bound of the slider. */
    min?: number | string
    /** Upper bound of the slider. */
    max?: number | string
    /** [[color]] */
    color?: string
    /**
     * Removes the track color fill behind the thumb.
     */
    noFill?: boolean
    /**
     * Renders the track thin, making the thumb more prominent.
     */
    thin?: boolean
  }>(),
  {
    color: 'foreground',
    min: 0,
    max: 100
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: number): void
}>()

function updateInput(e: Event) {
  const target = e.currentTarget as HTMLInputElement
  const val = parseFloat(target.value)
  emit('update:modelValue', val)
}

const gstop = computed(() => {
  const min = typeof props.min === 'string' ? parseFloat(props.min) : props.min
  const max = typeof props.max === 'string' ? parseFloat(props.max) : props.max
  const percentage = ((props.modelValue - min) / (max - min)) * 100
  const thumbAdjustment = 3 / 2
  const adjusted =
    (percentage / 100) * (100 - thumbAdjustment - thumbAdjustment) +
    thumbAdjustment
  return `${adjusted}%`
})
</script>

<template>
  <input
    type="range"
    :class="[
      'holo-slider', 
      `holo-variable-color-${color}`,
      {
        'holo-slider-no-fill': noFill,
        'holo-slider-thin': thin
      }
    ]"
    :value="modelValue"
    :min="min"
    :max="max"
    v-bind="$attrs"
    @input="updateInput"
  >
</template>

<style>
.holo-slider {
  --clip: polygon(0.5em 0%, 0% 50%, 0.5em 100%, calc(100% - 0.5em) 100%, 100% 50%, calc(100% - 0.5em) 0%);
  --frame-outset: 0.15em;
  --corner-size: 0.4em;
  --wiggle-size: 0.15em;

  position: relative;
  box-sizing: border-box;
  background: transparent;
  border-color: hsl(var(--variable-color));
  appearance: none;
  width: 100%;
  font-size: 0.875rem;
  height: 1em;
}

.holo-slider::track {
  height: 100%;
  background:
    linear-gradient(
      to right,
      hsl(var(--variable-color)) v-bind(gstop),
      hsl(var(--foreground) / 20%) v-bind(gstop),
      hsl(var(--foreground) / 50%)
    );
  clip-path: var(--clip);
  transition: all 0.3s;
}

.holo-slider-no-fill::track {
  background: hsl(var(--foreground) / 50%);
}

.holo-slider-thin::track {
  height: 20%;
  clip-path: none;
}

.holo-slider::thumb {
  min-width: 1.5em;
  width: 3%;
  height: 100%;
  border-radius: 0;
  border: 0;
  background-color: hsl(var(--variable-color));
  transition: all 0.3s;
  clip-path: var(--clip);
}

.holo-slider-thin::thumb {
  height: 1em;
  margin-top: -0.4em;
}

.holo-slider:active::thumb,
.holo-slider:focus::thumb {
  transition-timing-function: var(--ease-blink);
  background-color: hsl(var(--foreground));
}

.holo-slider:disabled {
  cursor: not-allowed;
}

.holo-slider:disabled::track {
  background:
    linear-gradient(
      to right,
      hsl(var(--variable-color) / 50%) v-bind(gstop),
      hsl(var(--foreground) / 5%) v-bind(gstop),
      hsl(var(--foreground) / 30%)
    );
}

.holo-slider:disabled::thumb {
  filter: saturate(0);
  clip-path: polygon(20% 0%, calc(20% + 0.5em) 50%, 20% 100%, 80% 100%, calc(80% - 0.5em) 50%, 80% 0%);
}

.holo-slider:hover:disabled::thumb {
  animation: wiggle 0.5s;
}

.holo-slider:active:disabled::thumb {
  background-color: hsl(var(--variable-color));
}
</style>
