import { readFile } from 'fs/promises'
import { LoadResult } from 'rollup'

import matchName from './matchers/name'
import matchProps from './matchers/props'
import matchEmits from './matchers/emits'
import matchSlots from './matchers/slots'

export default function docsLoader() {
  return {
    name: 'vite-plugin-holo-docs',
    async load(id: string): Promise<LoadResult> {
      const isDoc = id.endsWith('?docs')
      if (isDoc) {
        const file = id.replace('?docs', '.vue')
        const buf = await readFile(file)
        const code = buf.toString()
        return `export default {
          name: '${matchName(code)}',
          props: ${JSON.stringify(matchProps(code))},
          emits: ${JSON.stringify(matchEmits(code))},
          slots: ${JSON.stringify(matchSlots(code))},
        }`
      } else {
        return null
      }
    }
  }
}
