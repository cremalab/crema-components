import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useKeyPress } from "../../hooks/useKeyPress"
import styles from "./Toast.module.css"

export type ToastType = "success" | "info" | "error" | "warning"

export type VerticalPosition = "top" | "center" | "bottom"

export type HorizontalPostion = "left" | "center" | "right"

interface ToastProps {
  showToast?: boolean
  type?: ToastType
  verticalPosition?: VerticalPosition
  horizontalPosition?: HorizontalPostion
  handleClose?: () => void
  duration?: number
  autoDismiss?: boolean
  message: string
  action?: ReactNode
}

export function Toast({
  action,
  autoDismiss = true,
  message,
  verticalPosition = "bottom",
  horizontalPosition = "center",
  type = "success",
  handleClose,
  duration = 5000,
}: ToastProps) {
  const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden")
  const [isMounted, setIsMounted] = useState(true)
  const timer = useRef<NodeJS.Timeout>()

  useKeyPress(["Escape"], () => handleClose?.())

  useEffect(() => {
    setVisibility("visible")
  }, [])

  useEffect(() => {
    if (autoDismiss) {
      timer.current = setTimeout(() => {
        setVisibility("hidden")
      }, duration)
    }
    return () => {
      clearTimeout(timer.current)
    }
  }, [autoDismiss, duration])

  const onTransitionEnd = () => {
    if (visibility === "hidden") {
      setIsMounted(false)
      handleClose?.()
    }
  }

  return isMounted
    ? createPortal(
        <div
          role="alert"
          aria-live={type === "error" ? "assertive" : "polite"}
          onTransitionEnd={onTransitionEnd}
          className={styles[visibility]}
        >
          <div className={styles.toastContainer}>
            <div
              aria-label={`a ${type} toast`}
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
