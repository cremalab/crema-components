import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useKeyPress } from "../../hooks/useKeyPress"
import styles from "./Toast.module.css"

export type ToastType = "success" | "info" | "error" | "warning"

export type VerticalPosition = "top" | "center" | "bottom"

export type HorizontalPostion = "left" | "center" | "right"

interface ToastProps {
  showToast: boolean
  type?: ToastType
  verticalPosition?: VerticalPosition
  horizontalPosition?: HorizontalPostion
  handleClose: () => void
  duration?: number
  autoDismiss?: boolean
  message: string
  action?: ReactNode
}

export function Toast({
  action,
  autoDismiss = true,
  showToast,
  message,
  verticalPosition = "bottom",
  horizontalPosition = "center",
  type = "success",
  handleClose,
  duration = 5000,
}: ToastProps) {
  const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden")
  const timer = useRef<NodeJS.Timeout>()

  useKeyPress(["Escape"], handleClose)

  useEffect(() => {
    if (showToast) {
      setVisibility("visible")
    }
    return () => {
      setVisibility("hidden")
    }
  }, [showToast])

  useEffect(() => {
    if (autoDismiss) {
      timer.current = setTimeout(() => {
        setVisibility("hidden")
      }, duration)
    }
    return () => {
      clearTimeout(timer.current)
    }
  }, [autoDismiss, duration, showToast])

  const onTransitionEnd = () => {
    if (visibility === "hidden") {
      handleClose()
    }
  }

  const containerClasses = [styles.toastOverlay, styles[visibility]].join(" ")

  return showToast
    ? createPortal(
        <div
          role="alert"
          aria-live={type === "error" ? "assertive" : "polite"}
          onTransitionEnd={onTransitionEnd}
          className={containerClasses}
        >
          <div className={styles.toastContainer}>
            <div
              data-type={type}
              data-x-position={horizontalPosition}
              data-y-position={verticalPosition}
              className={styles.toast}
            >
              <div className={styles.toastContent}>
                <div>{message}</div>
                {action ? (
                  <div className={styles.toastActionContainer}>{action}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null
}
