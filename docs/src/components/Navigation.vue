<script setup lang="ts">
import routes from '~pages'
import { kebab } from '@docs/common/utils'
import { sections } from '@docs/common/contentdata.json'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'

const currentRoute = useRoute()

const activeColor = computed(() => {
  const color = currentRoute.meta?.section
  return color ?? 'foreground'
})

interface RouteSection {
  section: string
  title: string
  routes: RouteRecordRaw[]
}

const navItems = computed(() => {
  const items: RouteSection[] = []
  for (const [section, title] of Object.entries(sections)) {
    const routesInSection = routes.filter(
      (route) => route.meta?.section === section
    )
    items.push({
      section,
      title,
      routes: routesInSection
    })
  }
  return items
})

function iconName(route: RouteRecordRaw) {
  const type = route.meta?.section ?? 'fallback'
  const name = route.name?.toString() ?? 'generic'
  return `${type}-${kebab(name)}`
}
</script>

<template>
  <nav :class="['main-nav', `holo-variable-color-${activeColor}`]">
    <router-link to="/">
      <Icon
        name="logo"
        :size="60"
        class="main-nav-logo"
      />
    </router-link>
    <List
      v-for="section in navItems"
      :key="section.section"
      :label="section.title"
      class="nav-list"
    >
      <ListItem
        v-for="route in section.routes"
        :key="route.name"
        :to="route.path"
        :color="route.meta?.section ?? 'foreground'"
        class="nav-list-item"
      >
        <template #symbol>
          <Icon
            :name="iconName(route)"
            class="nav-list-icon"
          />
        </template>
        {{ route.name }}
      </ListItem>
    </List>
  </nav>
</template>

<style>
.main-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 1em 1.5em;
  padding-inline-end: 0;
  margin: 0;
  border-inline-end: 0.25em solid hsl(var(--variable-color));
}

.nav-list {
  width: 100%;
}

.nav-list-icon {
  height: 1.5em;
  margin-block: 0.1em;
  margin-inline-end: 0.25em;
}
</style>