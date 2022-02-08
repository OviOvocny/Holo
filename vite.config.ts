import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const config: UserConfig = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Holo'
    },
    rollupOptions: {
      external: ['vue', 'holocore'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          holocore: 'HoloCore'
        }
      }
    }
  }
}

export default config
