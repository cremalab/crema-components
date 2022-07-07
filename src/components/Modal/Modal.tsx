import { HTMLProps, ReactNode, useRef } from "react"
import { createPortal } from "react-dom"
import { useKeyPress } from "../../hooks/useKeyPress"
import { useOutsideClick } from "../../hooks/useOutsideClick"
import styles from "./Modal.module.css"

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  description?: string
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

  if (!open) return null

  return createPortal(
    <div className={styles.modalOverlay} data-testid="modal-overlay">
      <div className={styles.modalWindow} ref={modalRef}>
        <p>{title}</p>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
