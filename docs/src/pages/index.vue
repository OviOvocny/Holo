<script setup lang="ts">
import routes from '~pages'
</script>

<template>
  <div>
    <List>
      <ListItem
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
      >
        {{ route.name }}
      </ListItem>
    </List>
  </div>
</template>
