export default function matchName(code: string): string {
  const match = code.match(/export\sdefault\s?{\s*name:\s?['"`](.*)['"`]/)
  if (match) {
    return match[1]
  }
  return ''
}
