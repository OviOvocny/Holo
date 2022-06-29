import { Plugin } from 'vue'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import Holo from '@/index'
import routes from '~pages'
import 'normalize.css'

export const createApp = ViteSSG(
  App,
  { routes }
  // ({ app }) => {
  //   app.use(Holo as Plugin)
  // }
)
