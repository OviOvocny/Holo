<script lang="ts">
export default {
  name: 'HButton'
}
</script>

<script setup lang="ts">
import HoloWrapper from '@/framework/HoloWrapper.vue'
import HoloTriggerEffect from '@/framework/HoloEffects/HoloTriggerEffect'
import HoloRippleEffect from '@/framework/HoloEffects/HoloRippleEffect'
import usePointerEffects from '@/hooks/usePointerEffects'

const props = withDefaults(
  defineProps<{
    color?: string
    disabled?: boolean
    hollow?: boolean
    borderless?: boolean
  }>(),
  {
    color: 'foreground'
  }
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { hoverLocation, clickLocation, setHoverFromEvent, setClickFromEvent } =
  usePointerEffects()

function updateHover(e: MouseEvent) {
  if (props.disabled) return
  setHoverFromEvent(e)
}

function passClick(e: MouseEvent) {
  if (props.disabled) return
  emit('click', e)
  setClickFromEvent(e)
}
</script>

<template>
  <HoloWrapper
    :options="{ rows: 1 }"
    :color="color"
    :disabled="disabled"
    :class="['holo-button-wrap', { muted: hollow }]"
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
    <button
      v-bind="$attrs"
      class="holo-button"
      :class="
        [`holo-variable-color-${color}`, 
         { 
           'holo-button-hollow': hollow, 
           'holo-button-borderless': borderless
         }]"
      :disabled="disabled"
      @mousemove="updateHover"
      @click="passClick"
    >
      <slot />
    </button>
  </HoloWrapper>
</template>

<style>
.holo-button-wrap {
  margin: 0.15em 0.35em;
}

.holo-button {
  background: hsl(var(--variable-color) / 70%);
  color: hsl(var(--readable-color));
  font-family: var(--text-font, var(--system-fonts-fallback));
  font-weight: 600;
  font-size: 0.875em;
  border: 1.5px solid hsl(var(--variable-color));
  margin: 0;
  padding: 0.5em 1em;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.1s, filter 0.7s var(--ease-out-expo);
  touch-action: manipulation;
}

.holo-button:active {
  --frame-outset: -0.4em;
  --border-width: 1px;

  border-color: hsl(var(--foreground));
  transform: scale(1.05);
}

.holo-button:disabled {
  background: hsl(var(--variable-color) / 50%);
  color: hsl(var(--readable-color) / 80%);
  border-style: dashed;
  cursor: not-allowed;
  filter: saturate(0.7);
}

.holo-button:disabled:hover {
  --wiggle-size: 1%;

  animation: wiggle 0.5s;
  filter: saturate(0);
}

.holo-button:disabled:active {
  transform: none;
}

.holo-button-hollow {
  background: transparent;
  color: hsl(var(--variable-color));
}

.holo-button-borderless {
  border-color: transparent;
}

.holo-button-borderless:focus::before {
  border-color: hsl(var(--variable-color));
}

.holo-button-borderless:disabled {
  color: hsl(var(--foreground) / 70%);
  background: hsl(var(--variable-color) / 40%);
}

.holo-button-hollow:disabled {
  background: transparent;
  color: hsl(var(--variable-color) / 50%);
}
</style>
