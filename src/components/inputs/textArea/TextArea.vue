<script lang="ts">
export default {
  name: 'HTextArea'
}
</script>

<script setup lang="ts">
import HoloWrapper from '@/framework/HoloWrapper.vue'
import HoloTriggerEffect from '@/framework/HoloEffects/HoloTriggerEffect'
import HoloRippleEffect from '@/framework/HoloEffects/HoloRippleEffect'
import useInputValue from '@/hooks/useInputValue'
import usePointerEffects from '@/hooks/usePointerEffects'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    name?: string
    label?: string
    rows?: number
    color?: string
    disabled?: boolean
    hollow?: boolean
    borderless?: boolean
  }>(),
  {
    modelValue: undefined,
    name: undefined,
    label: undefined,
    rows: 2,
    type: 'text',
    color: 'foreground'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: string | number): void
}>()

const val = useInputValue(emit, props)

function updateInput(e: Event) {
  const target = e.currentTarget as HTMLInputElement
  val.value = target.value
}

const { hoverLocation, clickLocation, setHoverFromEvent, setClickFromEvent } =
  usePointerEffects()

function updateHover(e: MouseEvent) {
  if (props.disabled) return
  setHoverFromEvent(e)
}

function passClick(e: MouseEvent) {
  if (props.disabled) return
  setClickFromEvent(e)
}

function focusEffect() {
  clickLocation.value = [Math.random(), 0.5]
}
</script>

<template>
  <div
    class="holo-text-area-shell"
    :class="[
      `holo-variable-color-${color}`, 
      {'holo-text-area-labelled': label}
    ]"
  >
    <label
      v-if="label"
      for="name"
      class="holo-text-area-label"
    >
      {{ label }}
    </label>
    <HoloWrapper
      :options="{ rows: rows }"
      :color="color"
      :disabled="disabled"
      :class="['holo-text-area-wrap', { muted: hollow }]"
    >
      <!-- Effect slots -->
      <template #effects="{ renderer }">
        <HoloTriggerEffect
          :renderer="renderer"
          :origin="hoverLocation"
          :options="{ propagate: false }"
        />
        <HoloRippleEffect
          :renderer="renderer"
          :origin="clickLocation"
          :options="{ noise: 5 }"
        />
      </template>
      <!-- Component structure -->
      <textarea
        :name="name"
        :value="val"
        :rows="rows"
        v-bind="$attrs"
        class="holo-text-area"
        :class="
          {
            'holo-text-area-hollow': hollow,
            'holo-text-area-borderless': borderless
          }"
        :disabled="disabled"
        @input="updateInput"
        @mousemove="updateHover"
        @click="passClick"
        @focus="focusEffect"
      />
    </HoloWrapper>
  </div>
</template>

<style>
.holo-text-area-shell {
  position: relative;
  margin: 0.15em 0.35em;
}

.holo-text-area-shell.holo-text-area-labelled {
  padding-block-start: 1em;
}

.holo-text-area {
  display: inline-block;
  background: hsl(var(--variable-color) / 80%);
  color: hsl(var(--readable-color));
  font-family: var(--text-font, var(--system-fonts-fallback));
  border: none;
  border-bottom: 1.5px solid hsl(var(--foreground));
  margin: 0;
  padding: 0.5em;
  padding-block: 0.4em;
  width: 100%;
  height: 100%;
  transition: color 0.1s, background 0.5s, filter 0.7s var(--ease-out-expo);
}

.holo-text-area:focus {
  color: hsl(var(--background));
  background: hsl(var(--foreground));
  transition-delay: 0.2s;
}

.holo-text-area:disabled {
  background: hsl(var(--variable-color) / 50%);
  color: hsl(var(--readable-color));
  border-style: dashed;
  cursor: not-allowed;
  filter: saturate(0.7);
}

.holo-text-area:disabled:hover {
  --wiggle-size: 1%;

  animation: wiggle 0.5s;
  filter: saturate(0);
}

.holo-text-area-hollow {
  background: transparent;
  color: hsl(var(--variable-color));
}

.holo-text-area-borderless {
  border-color: transparent;
}

.holo-text-area-borderless:focus::before {
  border-color: hsl(var(--variable-color));
}

.holo-text-area-borderless:disabled {
  color: hsl(var(--foreground) / 70%);
  background: hsl(var(--variable-color) / 40%);
}

.holo-text-area-hollow:disabled {
  background: transparent;
  color: hsl(var(--variable-color) / 50%);
}

/* Label */

.holo-text-area-label {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  height: 1.45em;
  font-size: 0.7em;
  font-weight: 700;
  background-color: hsl(var(--foreground));
  color: hsl(var(--background));
  padding: 0.05em;
  padding-inline-start: 1ch;
  padding-inline-end: 2ch;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  clip-path: polygon(0 0, calc(100% - 1.25ch) 0, 100% 100%, 0 100%);
}
</style>
