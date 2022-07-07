import { HTMLProps, ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useKeyPress } from "../../hooks/useKeyPress"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import styles from "./Modal.module.css"

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  onClose?: () => void
}

export function Modal({ children, open, onClose, title }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick(modalRef, () => {
    onClose?.()
  })

  useKeyPress(["Escape"], () => {
    onClose?.()
  })

  useEffect(() => {
    if (open) {
      // disable page scrolling
      document.body.style.overflow = "hidden"
    } else {
      // enable page scrolling
      document.body.style.overflow = "auto"
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className={styles.modalOverlay} data-testid="modal-overlay">
      <div
        className={styles.modalWindow}
        ref={modalRef}
        aria-modal
        aria-labelledby={title}
        role="dialog"
      >
        <p>{title}</p>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
