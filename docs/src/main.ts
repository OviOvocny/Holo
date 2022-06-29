import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from '~pages'

import 'normalize.css'
import '@/styles/index.css' // Holo stylesheet
import 'virtual:svg-icons-register'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, {
  routes,
  base: import.meta.env.BASE_URL
})
