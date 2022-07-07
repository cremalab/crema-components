import { useEffect } from "react"

/**
 * useKeyPress
 * @param keyCodes - Array of key codes to listen for
 * @param handler - Callback function to be executed when the event occurs
 */

export function useKeyPress(
  keyCodes: string[],
  handler: (event: KeyboardEvent) => void,
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (keyCodes.includes(event.code)) {
        handler(event)
      }
    }

    document.addEventListener("keydown", listener)
    document.addEventListener("keyup", listener)

    return () => {
      document.removeEventListener("keydown", listener)
      document.removeEventListener("keyup", listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}