import { ReactNode } from "react"
import { Status } from "../../types/Toast"
import styles from "./Toast.module.css"

interface ToastProps {
  status?: Status
  message: string
  action?: ReactNode
}

export function Toast({ action, message, status = "success" }: ToastProps) {
  return (
    <div role="alert" aria-live={status === "error" ? "assertive" : "polite"}>
      <div
        aria-label={`a ${status} toast`}
        data-type={status}
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
  )
}
