<script lang="ts">
export default {
  name: 'HAlert'
}
</script>

<script setup lang="ts">
import HoloWrapper from '@/framework/HoloWrapper.vue'
import HoloRainEffect from '@/framework/HoloEffects/HoloRainEffect'

withDefaults(
  defineProps<{
    /** [[color]] */
    color?: string
    /**
     * Whether the hologram effect is applied.
     */
    hologram?: boolean
  }>(),
  {
    color: 'foreground',
    hologram: true
  }
)
</script>

<template>
  <HoloWrapper
    :options="{
      rows: 1,
      duration: {
        rise: 0.7,
        fall: 1
      }
    }"
    :color="color"
    :class="['holo-alert-wrap', 'clipped-corner']"
  >
    <!-- Effect slots -->
    <template #effects="{ renderer }">
      <HoloRainEffect
        :renderer="renderer"
        :active="hologram"
        :options="{ propagate: false, interval: 0.5 }"
      />
    </template>
    <!-- Component structure -->
    <div
      class="holo-alert"
      :class="[`holo-variable-color-${color}`]"
    >
      <!--+ Content of the alert -->
      <slot />
    </div>
  </HoloWrapper>
</template>

<style>
.holo-alert-wrap {
  margin-block: 0.5em;
}

.holo-alert {
  --corner-clip: 0.5em;
  --border-width: 3px;

  padding: 0.5em 1em;
  background: hsl(var(--variable-color) / 50%);
  background-image: linear-gradient(to top, hsl(var(--background) / 50%), hsl(var(--background) / 50%));
  color: hsl(var(--foreground));
}

.holo-alert::before {
  content: "";
  background: hsl(var(--variable-color));
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  height: 100%;
  width: 0.5em;
  clip-path:
    polygon(
      0 100%,
      var(--border-width) 100%,
      var(--border-width) var(--corner-clip),
      100% var(--border-width),
      100% 0,
      0 0
    );
}
</style>
