import { ref } from 'vue'
import { utils } from 'holocore'

const { normalizeCoordinates } = utils

export default function usePointerEffects() {
  const hoverLocation = ref<[number, number]>([0, 0])
  const clickLocation = ref<[number, number]>([0, 0])

  function setHoverFromEvent(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      hoverLocation.value = normalizeCoordinates(
        [e.offsetX, e.offsetY],
        [e.target.offsetWidth, e.target.offsetHeight]
      )
    }
  }

  function setClickFromEvent(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      clickLocation.value = normalizeCoordinates(
        [e.offsetX, e.offsetY],
        [e.target.offsetWidth, e.target.offsetHeight]
      )
    }
  }

  return {
    hoverLocation,
    clickLocation,
    setHoverFromEvent,
    setClickFromEvent
  }
}
