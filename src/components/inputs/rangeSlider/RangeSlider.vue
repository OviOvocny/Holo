<script lang="ts">
import { ref, computed, reactive, watch } from 'vue'

export default {
  name: 'HRangeSlider'
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: [number, number]
    min?: number | string
    max?: number | string
    color?: string
    noFill?: boolean
    thin?: boolean
  }>(),
  {
    color: 'foreground',
    min: 0,
    max: 100
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: [number, number]): void
}>()

const internalRange = reactive({
  start: props.modelValue[0],
  end: props.modelValue[1]
})

watch(
  () => props.modelValue,
  ([start, end]) => {
    internalRange.start = start // typeof start === 'string' ? parseFloat(start) : start
    internalRange.end = end // typeof end === 'string' ? parseFloat(end) : end
  }
)

const rangeStart = computed({
  get() {
    return internalRange.start
  },
  set(value) {
    const val = typeof value === 'string' ? parseFloat(value) : value
    if (val > internalRange.end) {
      internalRange.end = val
    }
    internalRange.start = val
    emit('update:modelValue', [rangeStart.value, rangeEnd.value])
  }
})

const rangeEnd = computed({
  get() {
    return internalRange.end
  },
  set(value) {
    const val = typeof value === 'string' ? parseFloat(value) : value
    if (val < internalRange.start) {
      internalRange.start = val
    }
    internalRange.end = val
    emit('update:modelValue', [rangeStart.value, rangeEnd.value])
  }
})

function getValueFrac(at: number) {
  const min = typeof props.min === 'string' ? parseFloat(props.min) : props.min
  const max = typeof props.max === 'string' ? parseFloat(props.max) : props.max
  return (props.modelValue[at] - min) / (max - min)
}

function getStop(at: number) {
  const percentage = getValueFrac(at) * 100
  const thumbAdjustment = 3 / 2
  const adjusted =
    (percentage / 100) * (100 - thumbAdjustment - thumbAdjustment) +
    thumbAdjustment
  return `${adjusted}%`
}

const gstop0 = computed(() => {
  return getStop(0)
})

const gstop1 = computed(() => {
  return getStop(1)
})

const noPointerOnTopSlider = ref(false)

function targetCloserThumb(e: PointerEvent) {
  const target = e.currentTarget as HTMLInputElement
  const { left, width } = target.getBoundingClientRect()
  const pointerFrac = (e.clientX - left) / width
  const startDiff = Math.abs(getValueFrac(0) - pointerFrac)
  const endDiff = Math.abs(getValueFrac(1) - pointerFrac)
  noPointerOnTopSlider.value = startDiff < endDiff
}
</script>

<template>
  <div 
    class="holo-range-slider-wrapper"
    @pointermove="targetCloserThumb"
  >
    <input
      v-model="rangeStart"
      type="range"
      :class="[
        'holo-range-slider', 
        `holo-variable-color-${color}`,
        {
          'holo-range-slider-no-fill': noFill,
          'holo-range-slider-thin': thin
        }
      ]"
      :min="min"
      :max="max"
      v-bind="$attrs"
    >
    <input
      v-model="rangeEnd"
      type="range"
      :class="[
        'holo-range-slider',
        'holo-range-slider-top', 
        `holo-variable-color-${color}`,
        {
          'holo-range-slider-no-fill': noFill,
          'holo-range-slider-thin': thin,
          'holo-range-pointer-passthrough': noPointerOnTopSlider
        }
      ]"
      :min="min"
      :max="max"
      v-bind="$attrs"
    >
  </div>
</template>

<style>
.holo-range-slider-wrapper {
  position: relative;
  font-size: 0.875rem;
  height: 1em;
  margin-block: 0.5em;
}

.holo-range-slider {
  --clip: polygon(0.5em 0%, 0% 50%, 0.5em 100%, calc(100% - 0.5em) 100%, 100% 50%, calc(100% - 0.5em) 0%);
  --frame-outset: 0.15em;
  --corner-size: 0.4em;
  --wiggle-size: 0.15em;

  position: absolute;
  inset: 0 0;
  box-sizing: border-box;
  background: transparent;
  border-color: hsl(var(--variable-color));
  appearance: none;
  width: 100%;
  height: 1em;
}

.holo-range-slider::track {
  height: 100%;
  background:
    linear-gradient(
      to right,
      hsl(var(--foreground) / 50%) 0%,
      hsl(var(--foreground) / 20%) v-bind(gstop0),
      hsl(var(--variable-color)) v-bind(gstop0),
      hsl(var(--variable-color)) v-bind(gstop1),
      hsl(var(--foreground) / 20%) v-bind(gstop1),
      hsl(var(--foreground) / 50%)
    );
  clip-path: var(--clip);
  transition: all 0.3s;
}

.holo-range-slider-no-fill::track {
  background: hsl(var(--foreground) / 50%);
}

.holo-range-slider-thin::track {
  height: 20%;
  clip-path: none;
}

.holo-range-slider-top::track {
  background: transparent;
}

.holo-range-slider::thumb {
  z-index: 2;
  position: relative;
  min-width: 1.5em;
  width: 3%;
  height: 100%;
  border-radius: 0;
  border: 0;
  background-color: hsl(var(--variable-color));
  transition: all 0.3s;
  clip-path: var(--clip);
}

.holo-range-slider-thin::thumb {
  height: 1em;
  margin-top: -0.4em;
}

.holo-range-slider:active::thumb,
.holo-range-slider:focus::thumb {
  transition-timing-function: var(--ease-blink);
  background-color: hsl(var(--foreground));
}

.holo-range-slider:disabled {
  cursor: not-allowed;
}

.holo-range-slider:disabled::track {
  background:
    linear-gradient(
      to right,
      hsl(var(--foreground) / 30%) 0%,
      hsl(var(--foreground) / 5%) v-bind(gstop0),
      hsl(var(--variable-color) / 50%) v-bind(gstop0),
      hsl(var(--variable-color) / 50%) v-bind(gstop1),
      hsl(var(--foreground) / 5%) v-bind(gstop1),
      hsl(var(--foreground) / 30%)
    );
}

.holo-range-slider-top:disabled::track {
  background: transparent;
}

.holo-range-slider:disabled::thumb {
  filter: saturate(0);
  clip-path: polygon(20% 0%, calc(20% + 0.5em) 50%, 20% 100%, 80% 100%, calc(80% - 0.5em) 50%, 80% 0%);
}

.holo-range-slider:hover:disabled::thumb {
  animation: wiggle 0.5s;
}

.holo-range-slider:active:disabled::thumb {
  background-color: hsl(var(--variable-color));
}

.holo-range-pointer-passthrough {
  pointer-events: none;
}
</style>
