<div align="center">
<img alt="A bunch of triangles calling themselves a logo" src="docs/public/favicon.svg">
</div>

# Holo
![npm](https://img.shields.io/npm/v/holo-vue?color=ff7a33&logo=npm&style=for-the-badge)&nbsp;
![Netlify](https://img.shields.io/netlify/b2049230-88cb-43b6-a2fe-60b9e4015e56?color=81f5c1&label=docs&logo=netlify&style=for-the-badge)

Holo is a component library for Vue 3. Inspired by over-the-top hologhraphic user interfaces in sci-fi, it tries to strike a balance between usability, flexibility of customization, and crazy cool eye candy. Some call it form over function, but Holo tries to not skimp on the functoin. That said, by virtue of this design goal, it will not be suitable for every project.

> NOTE! Holo is still in development. __It won't be ready for a while__, so take the rest of this readme and the docs with a grain of triangular salt.

## Features
- Intentionally open for extension and tinkering – not a comprehensive framework
- Wide range of customizable UI components
- Simple grid abstraction powered by CSS
- Theming with CSS custom properties
- Support for reactive color scheme preference
- Embracing modern web standards and ES features
- Fully written in typescript under the hood
- Cool sci-fi triangles
- And stuff...

## Docs
Read the bespoke documentation online at [holo.ovi.moe](https://holo.ovi.moe). It includes guides on installing, using, and customizing Holo. Reference for every component includes API documentation and examples.

To learn more about how the docs get made or contribute, see [the docs readme](docs/README.md).

## Get started now
Quick start for speedrunners. For us mortals, read the docs.
> This guide uses npm. Adapt to whatever you use accordingly.

### Step 0: Requirements
Holo requires Vue version 3.2 and up. It also likes to run in modern browsers.

### Step 1: Install
`npm install holo-vue` in your Vue project

### Step 2 ver.α: Use as a plugin
In your `main.ts` entrypoint file:
```ts
import { createApp } from 'vue'
import Holo from 'holo-vue' // Import the plugin (the default export)
import App from './App.vue'

const app = createApp(App)
app.use(Holo) // Register it
app.mount('#app')
```

### Step 2 ver.δ: Import only specific components
> This isn't ready yet...

### Step 3: Triangles everywhere
Speedrun is over, now read the docs anyway. Make a Root. Build the rest of the owl— er, app.

## Contributing
I'll get to it. :)