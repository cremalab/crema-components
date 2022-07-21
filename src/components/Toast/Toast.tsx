import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
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
  duration = 1500,
}: ToastProps) {
  const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden")

  useEffect(() => {
    if (autoDismiss && showToast) {
      setVisibility("visible")
      const timer = setTimeout(() => {
        setVisibility("hidden")
      }, duration)
      return () => {
        clearTimeout(timer)
      }
    } else {
      return
    }
  }, [autoDismiss, showToast, duration])

  return showToast
    ? createPortal(
        <div
          onTransitionEnd={() => visibility === "hidden" && handleClose()}
          className={[styles.toastOverlay, styles[visibility]].join(" ")}
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
                <div className={styles.toastActionContainer}>{action}</div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null
}
