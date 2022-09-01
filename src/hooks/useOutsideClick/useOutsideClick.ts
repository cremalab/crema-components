import { RefObject, useEffect } from "react"

/**
 * useOutsideClick
 * @param ref - Reference of the element
 * @param handler - Callback function to be executed when the event occurs
 */

type Event = MouseEvent | TouchEvent

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current
      if (!el || el.contains(event?.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
