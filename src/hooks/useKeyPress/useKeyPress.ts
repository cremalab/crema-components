import { useEffect, useState } from "react"

/**
 * useKeyPress
 * @param keyCodes - Array of key codes to listen for
 * @param handler - Callback function to be executed when the event occurs
 */

export function useKeyPress(
  keyCodes: string[],
  handler: (event: KeyboardEvent) => void,
) {
  const [keyPressed, setKeyPressed] = useState("")

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (keyCodes.includes(event.code)) {
        handler(event)
        setKeyPressed(event.code)
      }
    }

    document.addEventListener("keydown", listener)

    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [handler, keyCodes])

  return { keyPressed }
}
