<script lang="ts">
export default {
  name: 'HNotification'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Boolean binding to determine
     * if the notification is visible.
     * Gets reset after timeout.
     */
    modelValue: boolean
    /** [[color]] */
    color?: string
    /**
     * Sets the duration of the notification
     * in milliseconds.
     */
    timeout?: number
  }>(),
  {
    color: 'foreground',
    timeout: 2000
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', event: boolean): void
}>()

function hide() {
  emit('update:modelValue', false)
}

let _timeout = -1
function start() {
  window.clearTimeout(_timeout)
  if (!props.modelValue || props.timeout <= 0) {
    return
  }
  _timeout = window.setTimeout(hide, props.timeout)
}

function cancel() {
  window.clearTimeout(_timeout)
}

watch(() => props.modelValue, start)
watch(() => props.timeout, start)

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <Teleport
    v-if="mounted"
    to=".holo-notification-root"
  >
    <div
      v-show="modelValue"
      class="holo-notification"
      :class="[
        `holo-variable-color-${color}`
      ]"
      @pointerenter="cancel"
      @pointerleave="start"
    >
      <div class="holo-notification-side">
        <!--+ Inline start slot for icons etc. -->
        <slot name="aside" />
      </div>
      <div class="holo-notification-content">
        <div class="holo-notification-title">
          <!--+ Notification title -->
          <slot name="title" />
        </div>
        <!--+ Notification content -->
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.holo-notification {
  display: flex;
  background: hsl(var(--variable-color));
  color: hsl(var(--readable-color));
  min-width: 300px;
  padding: 1em;
  margin-block-start: 1em;
}

.holo-notification-title {
  font-weight: bold;
}
</style>
