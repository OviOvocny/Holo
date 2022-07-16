import { readFile } from 'fs/promises'
import { LoadResult } from 'rollup'
import * as path from 'path'

// reduce indent to push most outdedented code to the start of the line
function trimIndent(code: string) {
  const firstLine = code.split('\n').find((line) => line.length > 0)
  const indent = firstLine.match(/^\s*/)[0]
  return code.replace(new RegExp(`^${indent}`, 'gm'), '')
}

// extract code from the specified SFC tag
function extractTagContent(tag: string, code: string) {
  const regex = new RegExp(`<${tag}.*?>(.*)</${tag}>`, 'gs')
  const match = regex.exec(code)
  return match ? trimIndent(match[1]).trim() : ''
}

export default function codeLoader() {
  return {
    name: 'vite-plugin-holo-examples',
    async load(id: string): Promise<LoadResult> {
      const isCode = id.endsWith('.code')
      if (isCode) {
        const file = id.replace('.code', '.vue')
        const filepath = path.resolve(file.slice(1))
        const buf = await readFile(filepath)
        const code = buf.toString()
        return `export default {
          script: ${JSON.stringify(extractTagContent('script', code))},
          template: ${JSON.stringify(extractTagContent('template', code))},
          style: ${JSON.stringify(extractTagContent('style', code))}
        }`
      } else {
        return null
      }
    }
  }
}
