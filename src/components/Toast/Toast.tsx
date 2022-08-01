import { Button } from "../Button"
import styles from "./Toast.module.css"

export type ToastAction = {
  type: "dismiss" | "dismissAll"
  text: string
}

export type ToastStatus = "success" | "info" | "error" | "warning"

export interface ToastProps {
  id: number
  status?: ToastStatus
  message: string
  action?: ToastAction
  onDismiss?: (action: ToastAction["type"], id: number) => void
}

export function Toast({
  message,
  status = "success",
  action,
  id,
  onDismiss,
}: ToastProps) {
  const ActionElement = ({ action }: { action?: ToastAction }) => {
    if (action) {
      return (
        <Button
          ariaLabel={action.text}
          onClick={() => onDismiss?.(action.type, id)}
        >
          {action.text}
        </Button>
      )
    } else {
      return null
    }
  }

  return (
    <div
      data-testid={`toast_${id}`}
      role="alert"
      aria-live={status === "error" ? "assertive" : "polite"}
      aria-label={`a ${status} toast`}
      data-type={status}
      className={styles.toast}
    >
      <div className={styles.toastContent}>
        <div className={styles.toastMessage}>{message}</div>
        <ActionElement action={action} />
      </div>
    </div>
  )
}
