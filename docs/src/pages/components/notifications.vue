<script setup lang="ts">
import docs from '@/components/notification/Notification?docs'
import { ref } from 'vue'

const notificationVisible = ref(false)
</script>

<template>
  <ComponentDoc
    :name="String($route.name)"
    :docs="docs"
  >
    <template #description>
      ...
    </template>
    <template #configDisplay="{ config }">
      <Notification
        v-bind="config"
        v-model="notificationVisible"
      >
        This is a notification.
      </Notification>
      <Button @click="notificationVisible = true">
        Trigger the notification
      </Button>
    </template>
    <!-- <template #examples>
      ...
    </template> -->
  </ComponentDoc>
</template>

<route lang="yaml">
name: Notification
meta:
  section: component
</route>
