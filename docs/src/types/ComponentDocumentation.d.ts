export interface ComponentDocumentation {
  name: string
  description: string
  props?: ComponentProp[]
  emits?: ComponentEvent[]
  slots?: ComponentSlot[]
}

export interface ComponentProp {
  name: string
  type: string
  optional: boolean
  default?: string
  description: string
}

export interface ComponentEvent {
  name: string
  payload?: string
  description: string
}

export interface ComponentSlot {
  name?: string
  description?: string
}
