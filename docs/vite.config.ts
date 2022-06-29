import * as path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import generateSitemap from 'vite-ssg-sitemap'
import docsLoader from './src/docsLoader'

export default defineConfig(({ mode }) => {
  const alias =
    mode === 'production'
      ? {
          '@docs': path.resolve(__dirname, './src'),
          '@': path.resolve(__dirname, '../src'),
          'vue': path.resolve('./node_modules/vue')
        }
      : {
          '@docs': path.resolve(__dirname, './src'),
          '@': path.resolve(__dirname, '../src')
        }
  return {
    resolve: {
      preserveSymlinks: true,
      alias
    },
    plugins: [
      docsLoader(),
      Vue(),
      Components({
        dirs: [
          path.resolve(__dirname, './src/components'),
          path.resolve(__dirname, '../src/components')
        ]
      }),
      Pages(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, './src/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      VitePluginFonts({
        google: {
          families: [
            {
              name: 'IBM Plex Mono'
            },
            {
              name: 'IBM Plex Sans',
              styles: 'wght@400;600'
            },
            {
              name: 'Josefin Sans',
              styles: 'wght@400..700'
            }
          ]
        }
      })
    ],
    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      onFinished() {
        generateSitemap()
      }
    }
  }
})
