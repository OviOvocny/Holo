<script lang="ts">
export default {
  name: 'HInputField'
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
    /** [[v-model]] */
    modelValue?: string | number
    /**
     * Defines the input type.
     * Use HTML textual input field types,
     * like text, number, password, etc.
     */
    type?: string
    /** [[forms-name]] */
    name?: string
    /**
     * Label of the input field.
     * Shown above it in a little flag.
     */
    label?: string
    /** [[color]] */
    color?: string
    /** [[disabled]] */
    disabled?: boolean
    /**
     * Removes background color.
     */
    hollow?: boolean
    /**
     * Removes border.
     */
    borderless?: boolean
  }>(),
  {
    modelValue: undefined,
    name: undefined,
    label: undefined,
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
  <span 
    class="holo-input-field-shell"
    :class="[
      `holo-variable-color-${color}`, 
      {'holo-input-field-labelled': label}
    ]"
  >
    <label
      v-if="label"
      for="name"
      class="holo-input-field-label"
    >
      {{ label }}
    </label>
    <HoloWrapper
      :options="{ rows: 1 }"
      :color="color"
      :disabled="disabled"
      :class="['holo-input-field-wrap', { muted: hollow }]"
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
      <input
        :name="name"
        :type="type"
        :value="val"
        v-bind="$attrs"
        class="holo-input-field"
        :class="
          {
            'holo-input-field-hollow': hollow,
            'holo-input-field-borderless': borderless
          }"
        :disabled="disabled"
        @input="updateInput"
        @mousemove="updateHover"
        @click="passClick"
        @focus="focusEffect"
      >
    </HoloWrapper>
  </span>
</template>

<style>
.holo-input-field-shell {
  position: relative;
  display: inline-block;
  margin: 0.15em 0.35em;
}

.holo-input-field-shell.holo-input-field-labelled {
  padding-block-start: 1em;
}

.holo-input-field {
  display: inline-block;
  background: hsl(var(--variable-color) / 80%);
  color: hsl(var(--readable-color));
  font-family: var(--text-font, var(--system-fonts-fallback));
  font-size: 0.9em;
  border: none;
  border-bottom: 1.5px solid hsl(var(--foreground));
  margin: 0;
  padding: 0.5em;
  padding-block: 0.4em;
  width: 100%;
  height: 100%;
  transition: color 0.1s, background 0.5s, filter 0.7s var(--ease-out-expo);
}

.holo-input-field:focus {
  color: hsl(var(--background));
  background: hsl(var(--foreground));
  transition-delay: 0.2s;
}

.holo-input-field:disabled {
  background: hsl(var(--variable-color) / 50%);
  color: hsl(var(--readable-color));
  border-bottom-style: dashed;
  cursor: not-allowed;
  filter: saturate(0.7);
}

.holo-input-field:disabled:hover {
  --wiggle-size: 1%;

  animation: wiggle 0.5s;
  filter: saturate(0);
}

.holo-input-field-hollow {
  background: transparent;
  color: hsl(var(--variable-color));
}

.holo-input-field-borderless {
  border-color: transparent;
}

.holo-input-field-borderless:focus::before {
  border-color: hsl(var(--variable-color));
}

.holo-input-field-borderless:disabled {
  color: hsl(var(--foreground) / 70%);
  background: hsl(var(--variable-color) / 40%);
}

.holo-input-field-hollow:disabled {
  background: transparent;
  color: hsl(var(--variable-color) / 50%);
}

/* Label */

.holo-input-field-label {
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
