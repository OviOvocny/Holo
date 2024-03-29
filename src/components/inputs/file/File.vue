<script lang="ts">
export default {
  name: 'HFile'
}
</script>

<script setup lang="ts">
import useInputValue from '@/hooks/useInputValue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    name?: string
    label?: string
    color?: string
    disabled?: boolean
    hollow?: boolean
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
</script>

<template>
  <span
    class="holo-file-shell"
    :class="[
      `holo-variable-color-${color}`,
      {'holo-file-labelled': label}
    ]"
  >
    <label
      v-if="label"
      for="name"
      class="holo-file-label"
    >
      {{ label }}
    </label>
    <input
      type="file"
      :name="name"
      :value="val"
      v-bind="$attrs"
      class="holo-file"
      :class="
        {
          'holo-file-hollow': hollow,
          'holo-file-borderless': borderless
        }"
      :disabled="disabled"
      @input="updateInput"
    >
  </span>
</template>

<style>
.holo-file-shell {
  position: relative;
  display: inline-block;
  margin: 0.15em 0.35em;
}

.holo-file-shell.holo-file-labelled {
  padding-block-start: 1em;
}

.holo-file {
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

.holo-file:focus {
  color: hsl(var(--background));
  background: hsl(var(--foreground));
  transition-delay: 0.2s;
}

.holo-file:disabled {
  background: hsl(var(--variable-color) / 50%);
  color: hsl(var(--readable-color));
  border-style: dashed;
  cursor: not-allowed;
  filter: saturate(0.7);
}

.holo-file:disabled:hover {
  --wiggle-size: 1%;

  animation: wiggle 0.5s;
  filter: saturate(0);
}

.holo-file-hollow {
  background: transparent;
  color: hsl(var(--variable-color));
}

.holo-file-borderless {
  border-color: transparent;
}

.holo-file-borderless:focus::before {
  border-color: hsl(var(--variable-color));
}

.holo-file-borderless:disabled {
  color: hsl(var(--foreground) / 70%);
  background: hsl(var(--variable-color) / 40%);
}

.holo-file-hollow:disabled {
  background: transparent;
  color: hsl(var(--variable-color) / 50%);
}

/* Label */

.holo-file-label {
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
