import type { RGB } from 'holocore'
import { colord } from 'colord'

export default function getColor(nameOrValue: string): RGB {
  let variable = ''
  // try to find root and get the color value
  const root = document.querySelector('.holo-root')
  if (root) {
    variable = window
      .getComputedStyle(root)
      .getPropertyValue(`--${nameOrValue}`)
  }
  // check format match and convert
  const colorRegex = /(\d+)deg (\d+)% (\d+)%/
  const match = variable.match(colorRegex)
  if (match) {
    const hsl = match.slice(1).map((x) => parseInt(x, 10))
    const conv = colord({ h: hsl[0], s: hsl[1], l: hsl[2] })
    return Object.values(conv.toRgb()).slice(0, 3) as RGB
  } else {
    const conv = colord(nameOrValue)
    return Object.values(conv.toRgb()).slice(0, 3) as RGB
  }
}
