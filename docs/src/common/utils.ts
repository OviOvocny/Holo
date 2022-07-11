import { descriptions } from '@docs/common/contentdata.json'
import routes from '~pages'

interface Descriptions {
  [key: string]: string
}

export interface LinkerSegment {
  text: string
  type: 'router-link' | 'span'
  path?: string
}

export function kebab(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function interpolateContent(content: string): string {
  return content.replaceAll(/\[\[(.*)\]\]/g, (match, key: string) => {
    return (descriptions as Descriptions)[key] ?? match
  })
}

export function splitBracketLinks(content: string): LinkerSegment[] {
  if (!content) {
    return []
  }
  return content
    .split(/[[\]]/)
    .map((part, index) => {
      if (index % 2 === 1) {
        const route = routes.find((route) => route.name === part)
        if (route) {
          return {
            text: String(route.name),
            path: route.path,
            type: 'router-link'
          }
        } else {
          return {
            text: `[${part}]`,
            type: 'span'
          }
        }
      } else {
        return {
          text: part,
          type: 'span'
        }
      }
    })
    .filter((part) => part.text.length > 0) as LinkerSegment[]
}
