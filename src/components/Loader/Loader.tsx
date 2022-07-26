import { ReactNode, useEffect, useState } from "react"
import { DefaultSpinner } from "./DefaultSpinner"

export interface LoaderProps {
  ariaLabel?: string
  timeout?: number
  children?: ReactNode
}

export function Loader({
  // this is the text that will be read to the screen reader since most loaders are visual in nature
  ariaLabel = "Loading now please wait",
  timeout = 200,
  children = <DefaultSpinner />,
}: LoaderProps) {
  // If the timeout is 0 we short circuit the logic and immediately show the loader to reduce re-renders
  const [showLoader, setShowLoader] = useState(timeout === 0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    // if the timeout is not 0 we need to call setTimeout with that value to re-render and show the loader
    if (timeout !== 0) {
      timeoutId = setTimeout(() => {
        setShowLoader(true)
      }, timeout)
    }

    return () => {
      if (timeoutId) {
        // always make sure to clean up timeouts :)
        clearTimeout(timeoutId)
      }
    }
  }, [timeout])

  if (!showLoader) {
    return null
  }

  // these aria attributes should inform the screen reader that this is a progress indicator that is likely to be changing
  return (
    <div
      role="progressbar"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}
