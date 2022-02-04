<script lang="ts">
export default {
  name: 'HSheet'
}
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Holo, { Rain, Ripple, Trigger } from 'holocore'
import { normalizeCoordinates } from 'holocore/src/utils/normalizeCoordinates'

defineProps<{
  color?: Array<number>
  visible?: boolean
}>()

const self = ref<HTMLElement>()
let holo: Holo | null = null
let rain: Rain | null = null
let ripple: Ripple | null = null
let trigger: Trigger | null = null

onMounted(() => {
  if (self.value) {
    holo = new Holo(self.value, {
      color: {
        baseAlpha: 0,
        peakAlpha: 0.8
      },
      duration: {
        rise: 0.1,
        fall: 0.15
      }
    })

    ripple = new Ripple(holo)
    ripple.trigger()

    rain = new Rain(holo, { interval: [1, 5] })
    rain.play()

    trigger = new Trigger(holo)
  }
})

onUnmounted(() => {
  rain?.stop()
  holo?.destroy()
})

function hover(e: MouseEvent) {
  if (e.target instanceof HTMLElement) {
    const normalized = normalizeCoordinates(
      [e.offsetX, e.offsetY],
      [e.target.offsetWidth, e.target.offsetHeight]
    )
    trigger?.trigger(...normalized)
  }
}

function replay(e: MouseEvent) {
  if (e.target instanceof HTMLElement) {
    const normalized = normalizeCoordinates(
      [e.offsetX, e.offsetY],
      [e.target.offsetWidth, e.target.offsetHeight]
    )
    ripple?.overrideOrigin(...normalized)
  }
  ripple?.trigger()
}
</script>

<template>
  <div
    ref="self"
    class="sheet"
  >
    <div
      class="inner"
      @mousemove="hover"
      @click="replay"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sheet {
  position: relative;
}

.inner {
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  opacity: 0;
  animation: blink 0.4s 0.2s forwards;
}

@keyframes blink {
  from {
    opacity: 0;
  }

  45%,
  65% {
    opacity: 0.65;
  }

  75% {
    opacity: 0.6;
  }

  to {
    opacity: 0.9;
  }
}
</style>
