<script lang="ts">
export default {
  name: 'HButton'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import HoloWrapper from '@/framework/HoloWrapper.vue'
import HoloTriggerEffect from '@/framework/HoloEffects/HoloTriggerEffect.vue'
import HoloRippleEffect from '@/framework/HoloEffects/HoloRippleEffect.vue'
import { normalizeCoordinates } from 'holocore/src/utils/normalizeCoordinates'

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const hoverLocation = ref<[number, number]>([0, 0])
const clickLocation = ref<[number, number]>([0, 0])

function updateHover(e: MouseEvent) {
  if (e.target instanceof HTMLElement) {
    hoverLocation.value = normalizeCoordinates(
      [e.offsetX, e.offsetY],
      [e.target.offsetWidth, e.target.offsetHeight]
    )
  }
}

function passClick(e: MouseEvent) {
  emit('click', e)
  if (e.target instanceof HTMLElement) {
    clickLocation.value = normalizeCoordinates(
      [e.offsetX, e.offsetY],
      [e.target.offsetWidth, e.target.offsetHeight]
    )
  }
}
</script>

<template>
  <HoloWrapper :options="{ rows: 1 }">
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
      class="lt-holo-button"
      @mousemove="updateHover"
      @click="passClick"
    >
      <slot />
    </button>
  </HoloWrapper>
</template>

<style scoped>
@import "@/styles/variables.css";

.lt-holo-button {
  background: hsl(0deg 0% 100% / 70%);
  border: 1.5px solid var(--holo-base-light);
  margin: 0;
  padding: 0.5em 1em;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s;
}

.lt-holo-button:active {
  transform: scale(1.1);
}
</style>
