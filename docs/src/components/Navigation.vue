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
    const routesInSection = routes
      .filter((route) => route.meta?.section === section)
      .sort(
        (a, b) =>
          (a.meta?.order as number) ?? 0 - (b.meta?.order as number) ?? 0
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
    <div class="main-nav-top">
      <router-link to="/">
        <Icon
          name="logo"
          :size="60"
          class="main-nav-logo"
        />
      </router-link>
      <client-only>
        <Search />
      </client-only>
    </div>
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
    <div class="nav-footer">
      <a
        href="https://github.com/oviovocny/holo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="github" />
      </a>
      <a
        href="https://npm.im/holo-vue"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="npm" />
      </a>
    </div>
  </nav>
</template>

<style>
.main-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1em 1.5em;
  padding-inline-end: 0;
  padding-block-end: 2em;
  margin: 0;
  border-inline-end: 0.25em solid hsl(var(--variable-color));
}

.main-nav-top {
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 0;
}

.main-nav-logo {
  margin-block-start: 0.5em;
}

.nav-list {
  width: 100%;
}

.nav-list-item.router-link-active:hover {
  color: hsl(var(--readable-color));
}

.nav-list-icon {
  height: 1.5em;
  margin-block: 0.15em 0;
  margin-inline-end: 0.25em;
}

.nav-footer {
  display: flex;
  align-items: center;
  margin-block: 1em 2em;
}

.nav-footer a {
  font-size: 1.15em;
  margin-inline-end: 0.5em;
}

.nav-footer a,
.nav-footer a:visited {
  color: hsl(var(--foreground));
}

.nav-footer a:hover {
  color: hsl(var(--variable-color));
}
</style>