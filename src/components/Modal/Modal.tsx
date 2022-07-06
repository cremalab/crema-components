import { HTMLProps, ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  description?: string
  onClose?: () => void
}

export function Modal({ children, open, onClose, title }: Props) {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].indexOf(e.code) >= 0) {
        onClose && onClose()
      }
    }

    if (open) {
      window?.addEventListener("keydown", keyHandler)
    }
    return () => {
      window?.removeEventListener("keydown", keyHandler)
    }
  }, [open, onClose])

  return createPortal(
    open ? (
      <div className={styles.modalOverlay}>
        <div className={styles.modalWindow}>
          <p>{title}</p>
          <div>{children}</div>
        </div>
      </div>
    ) : null,
    document.body,
  )
}
